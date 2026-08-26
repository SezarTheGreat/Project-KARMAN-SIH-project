import os
from datetime import datetime
from typing import List, Optional
from fastapi import FastAPI, Form, Request, Response, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import JSONResponse, Response
from pydantic import BaseModel
from dotenv import load_dotenv

from ai_engine import process_beneficiary_query
from pdf_generator import generate_applicant_pdf

load_dotenv()

app = FastAPI(
    title="Project KARMAN Backend API",
    description="WhatsApp AI Voice Bot & PM-AJAY / NSQF RAG Field Officer Hub API",
    version="1.0.0"
)

# CORS Configuration for React Frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

STATIC_DIR = os.path.join(os.path.dirname(__file__), "static")
os.makedirs(STATIC_DIR, exist_ok=True)
app.mount("/static", StaticFiles(directory=STATIC_DIR), name="static")

PUBLIC_BASE_URL = os.getenv("PUBLIC_BASE_URL", "http://localhost:8000")

# In-Memory Applicant Repository (Pre-seeded with rich sample applicants)
APPLICANTS_DB = {}

def init_seed_data():
    seed_queries = [
        ("919876543210", "Sunita Devi", "G.B. Nagar", "Mujhe silai aati hai, machine ke liye loan chahiye."),
        ("919876543211", "Ramesh Kumar", "Varanasi", "Informal two-wheeler mechanic for 5 years, seeks trade certificate."),
        ("919876543212", "Amit Verma", "Lucknow", "Solar panel installation training and bijli equipment assistance.")
    ]
    for phone, name, district, query in seed_queries:
        data = process_beneficiary_query(query, phone_number=phone, name=name, district=district)
        pdf_path = generate_applicant_pdf(data)
        pdf_filename = os.path.basename(pdf_path)
        data["generated_pdf_url"] = f"{PUBLIC_BASE_URL}/static/{pdf_filename}"
        APPLICANTS_DB[phone] = data

init_seed_data()

class IntakeRequest(BaseModel):
    phone: str = "919876543210"
    name: Optional[str] = "Beneficiary"
    district: Optional[str] = "District Command"
    user_query: str = "Mujhe silai aati hai, machine ke liye loan chahiye."

@app.get("/")
def read_root():
    return {
        "status": "online",
        "system": "Project KARMAN Monorepo Core Backend",
        "active_applicants": len(APPLICANTS_DB),
        "docs_url": "/docs"
    }

@app.get("/api/applicants")
def get_all_applicants():
    """Returns list of all beneficiary intakes with full RAG trace & PDF roadmap URLs."""
    applicants_list = list(APPLICANTS_DB.values())
    # Sort newest first
    applicants_list.reverse()
    return applicants_list

@app.get("/api/applicants/{applicant_id}")
def get_applicant_detail(applicant_id: str):
    if applicant_id in APPLICANTS_DB:
        return APPLICANTS_DB[applicant_id]
    raise HTTPException(status_code=404, detail="Applicant ID not found")

@app.post("/api/simulate-intake")
def simulate_intake(req: IntakeRequest):
    """
    Evaluator Simulator Endpoint: Allows manual submission of a beneficiary voice/text query
    to demonstrate live RAG vector search, dynamic PDF generation, and dashboard update.
    """
    phone = req.phone.strip()
    result = process_beneficiary_query(
        user_query=req.user_query,
        phone_number=phone,
        name=req.name,
        district=req.district
    )
    pdf_path = generate_applicant_pdf(result)
    pdf_filename = os.path.basename(pdf_path)
    result["generated_pdf_url"] = f"{PUBLIC_BASE_URL}/static/{pdf_filename}"
    result["timestamp"] = datetime.now().isoformat()

    APPLICANTS_DB[phone] = result
    return result

@app.post("/whatsapp")
async def twilio_whatsapp_webhook(request: Request):
    """
    Twilio Webhook Endpoint for WhatsApp Voice/Text Intake.
    Receives form data from Twilio, invokes RAG Engine, generates PDF, and returns TwiML XML.
    """
    try:
        form_data = await request.form()
        incoming_msg = form_data.get("Body", "").strip()
        from_number = form_data.get("From", "").replace("whatsapp:", "").strip()
        media_url = form_data.get("MediaUrl0", None)

        if not incoming_msg and media_url:
            incoming_msg = "Voice Note Received: Seeking PM-AJAY Skill Development and Equipment Assistance."
        elif not incoming_msg:
            incoming_msg = "Mujhe silai aati hai, machine ke liye loan chahiye."

        result = process_beneficiary_query(
            user_query=incoming_msg,
            phone_number=from_number
        )

        pdf_path = generate_applicant_pdf(result)
        pdf_filename = os.path.basename(pdf_path)
        pdf_public_url = f"{PUBLIC_BASE_URL}/static/{pdf_filename}"
        result["generated_pdf_url"] = pdf_public_url
        result["timestamp"] = datetime.now().isoformat()

        APPLICANTS_DB[from_number] = result

        # Build TwiML XML Response
        skill_name = result["extracted_skill"]
        status_name = result["pm_ajay_eligibility"]["status"]
        grant_type = result["pm_ajay_eligibility"]["grant_type"]
        nsqf_level = result["nsqf_mapping"]["level"]

        twiml_response = f"""<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Message>
        <Body>Namaste! Project KARMAN AI has analyzed your inquiry.

Skill Identified: {skill_name} ({nsqf_level})
Scheme Eligibility: {status_name} ({grant_type})

Download your dynamic PM-AJAY Beneficiary Roadmap PDF here:
{pdf_public_url}</Body>
    </Message>
</Response>"""
        return Response(content=twiml_response, media_type="application/xml")

    except Exception as e:
        # Fallback TwiML response
        fallback_pdf = f"{PUBLIC_BASE_URL}/static/Roadmap_919876543210.pdf"
        fallback_xml = f"""<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Message>
        <Body>Namaste! Your PM-AJAY Skill &amp; Grant Roadmap has been generated.
Download PDF: {fallback_pdf}</Body>
    </Message>
</Response>"""
        return Response(content=fallback_xml, media_type="application/xml")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
        skill_name = result["extracted_skill"].replace("&", "&amp;")
        status_name = result["pm_ajay_eligibility"]["status"].replace("&", "&amp;")
        grant_type = result["pm_ajay_eligibility"]["grant_type"].replace("&", "&amp;")
        nsqf_level = result["nsqf_mapping"]["level"].replace("&", "&amp;")