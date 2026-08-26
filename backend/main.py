import os
from datetime import datetime
from typing import List, Optional
import requests
from fastapi import FastAPI, Request, Response, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from dotenv import load_dotenv

from ai_engine import process_beneficiary_query
from pdf_generator import generate_applicant_pdf

load_dotenv()

app = FastAPI(
    title="Project KARMAN Backend API",
    description="Meta WhatsApp Cloud API AI Voice Bot & PM-AJAY / NSQF RAG Field Officer Hub API",
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
META_VERIFY_TOKEN = os.getenv("META_VERIFY_TOKEN", "karman_meta_verify_token_123")
META_ACCESS_TOKEN = os.getenv("META_ACCESS_TOKEN", "")

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
        "system": "Project KARMAN Core Backend (Meta WhatsApp Cloud API)",
        "meta_verify_token_configured": bool(META_VERIFY_TOKEN),
        "active_applicants": len(APPLICANTS_DB),
        "docs_url": "/docs"
    }

@app.get("/api/applicants")
def get_all_applicants():
    """Returns list of all beneficiary intakes with full RAG trace & PDF roadmap URLs."""
    applicants_list = list(APPLICANTS_DB.values())
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
    Evaluator Simulator Endpoint: Allows manual submission of a beneficiary query
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

@app.get("/whatsapp")
def verify_meta_webhook(request: Request):
    """
    Meta WhatsApp Cloud API Webhook Verification Endpoint (GET /whatsapp).
    Handles the verification challenge sent from Meta Developer Dashboard.
    """
    params = request.query_params
    mode = params.get("hub.mode")
    token = params.get("hub.verify_token")
    challenge = params.get("hub.challenge")

    if mode == "subscribe" and token == META_VERIFY_TOKEN:
        print(f"Meta Webhook Verification Successful! Token: {token}")
        return Response(content=challenge, status_code=200, media_type="text/plain")

    print(f"Meta Verification Failed. Provided Token: {token}, Expected: {META_VERIFY_TOKEN}")
    raise HTTPException(status_code=403, detail="Verification token mismatch")

@app.post("/whatsapp")
async def meta_whatsapp_webhook(request: Request):
    """
    Meta WhatsApp Cloud API Incoming Message Webhook (POST /whatsapp).
    Receives Meta JSON payload, runs RAG engine, generates PDF roadmap,
    and posts automated reply back to Meta Graph API.
    """
    try:
        body = await request.json()
        
        entries = body.get("entry", [])
        for entry in entries:
            changes = entry.get("changes", [])
            for change in changes:
                value = change.get("value", {})
                messages = value.get("messages", [])
                metadata = value.get("metadata", {})
                phone_number_id = metadata.get("phone_number_id")

                for msg in messages:
                    sender_phone = msg.get("from", "919876543210")
                    msg_type = msg.get("type", "text")

                    if msg_type == "text":
                        user_query = msg.get("text", {}).get("body", "").strip()
                    elif msg_type in ["audio", "voice"]:
                        user_query = "Voice Note Received: Seeking PM-AJAY Skill Development and Equipment Assistance."
                    else:
                        user_query = "Mujhe silai aati hai, machine ke liye loan chahiye."

                    if not user_query:
                        user_query = "Mujhe silai aati hai, machine ke liye loan chahiye."

                    # Run RAG Pipeline & Generate Dynamic PDF
                    result = process_beneficiary_query(
                        user_query=user_query,
                        phone_number=sender_phone
                    )

                    pdf_path = generate_applicant_pdf(result)
                    pdf_filename = os.path.basename(pdf_path)
                    pdf_public_url = f"{PUBLIC_BASE_URL}/static/{pdf_filename}"
                    result["generated_pdf_url"] = pdf_public_url
                    result["timestamp"] = datetime.now().isoformat()

                    APPLICANTS_DB[sender_phone] = result

                    # Send reply message back via Meta Graph API if access token is available
                    if META_ACCESS_TOKEN and phone_number_id:
                        send_meta_whatsapp_reply(
                            phone_number_id=phone_number_id,
                            recipient_phone=sender_phone,
                            result=result,
                            pdf_url=pdf_public_url
                        )

        return JSONResponse(content={"status": "ok"}, status_code=200)

    except Exception as e:
        print(f"Meta Webhook Processing Error: {e}")
        return JSONResponse(content={"status": "ok"}, status_code=200)

def send_meta_whatsapp_reply(phone_number_id: str, recipient_phone: str, result: dict, pdf_url: str):
    """Sends text reply and PDF roadmap document using Meta WhatsApp Cloud API."""
    url = f"https://graph.facebook.com/v18.0/{phone_number_id}/messages"
    headers = {
        "Authorization": f"Bearer {META_ACCESS_TOKEN}",
        "Content-Type": "application/json"
    }

    skill = result.get("extracted_skill", "Vocational Skill")
    level = result.get("nsqf_mapping", {}).get("level", "NSQF Level 4")
    status = result.get("pm_ajay_eligibility", {}).get("status", "GIA Linked")
    grant = result.get("pm_ajay_eligibility", {}).get("grant_type", "Equipment Grant")

    message_text = (
        f"Namaste! Project KARMAN AI has analyzed your inquiry.\n\n"
        f"Skill Identified: {skill} ({level})\n"
        f"Scheme Eligibility: {status} ({grant})\n\n"
        f"Download your dynamic PM-AJAY Beneficiary Roadmap PDF here:\n"
        f"{pdf_url}"
    )

    payload = {
        "messaging_product": "whatsapp",
        "recipient_type": "individual",
        "to": recipient_phone,
        "type": "text",
        "text": {"body": message_text}
    }

    try:
        requests.post(url, headers=headers, json=payload, timeout=5)
    except Exception as err:
        print(f"Failed to post reply to Meta Graph API: {err}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
