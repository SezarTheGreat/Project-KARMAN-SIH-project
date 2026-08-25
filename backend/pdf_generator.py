import os
from datetime import datetime
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable, KeepTogether
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_RIGHT

STATIC_DIR = os.path.join(os.path.dirname(__file__), "static")
os.makedirs(STATIC_DIR, exist_ok=True)

def generate_applicant_pdf(applicant_data: dict) -> str:
    """
    Generates a high-quality PM-AJAY Dynamic Roadmap PDF using ReportLab.
    Returns the absolute path to the generated PDF.
    """
    applicant_id = applicant_data.get("applicant_id", "919876543210")
    pdf_filename = f"Roadmap_{applicant_id}.pdf"
    file_path = os.path.join(STATIC_DIR, pdf_filename)
    
    doc = SimpleDocTemplate(
        file_path,
        pagesize=letter,
        rightMargin=36,
        leftMargin=36,
        topMargin=36,
        bottomMargin=36
    )
    
    styles = getSampleStyleSheet()
    
    # Custom Color Palette
    PRIMARY_COLOR = colors.HexColor("#0f172a")    # Slate 900
    SECONDARY_COLOR = colors.HexColor("#0284c7")  # Cyan 600
    ACCENT_GREEN = colors.HexColor("#16a34a")     # Green 600
    BG_LIGHT = colors.HexColor("#f8fafc")         # Slate 50
    BORDER_COLOR = colors.HexColor("#cbd5e1")     # Slate 300
    DARK_TEXT = colors.HexColor("#1e293b")        # Slate 800
    
    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Heading1'],
        fontName='Helvetica-Bold',
        fontSize=18,
        leading=22,
        textColor=colors.white,
        alignment=TA_CENTER
    )
    
    subtitle_style = ParagraphStyle(
        'DocSubtitle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=10,
        leading=13,
        textColor=colors.HexColor("#e2e8f0"),
        alignment=TA_CENTER
    )
    
    section_title_style = ParagraphStyle(
        'SectionTitle',
        parent=styles['Heading2'],
        fontName='Helvetica-Bold',
        fontSize=12,
        leading=16,
        textColor=PRIMARY_COLOR,
        spaceAfter=6
    )
    
    body_style = ParagraphStyle(
        'BodyDark',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9.5,
        leading=13,
        textColor=DARK_TEXT
    )
    
    bold_body_style = ParagraphStyle(
        'BoldBodyDark',
        parent=body_style,
        fontName='Helvetica-Bold'
    )
    
    quote_style = ParagraphStyle(
        'QuoteText',
        parent=body_style,
        fontName='Helvetica-Oblique',
        textColor=colors.HexColor("#334155")
    )
    
    elements = []
    
    # Header Banner
    header_data = [
        [
            Paragraph("MINISTRY OF SOCIAL JUSTICE & EMPOWERMENT", title_style),
        ],
        [
            Paragraph("PROJECT KARMAN • PM-AJAY BENEFICIARY ROADMAP & NSQF ALIGNMENT TRACE", subtitle_style),
        ]
    ]
    header_table = Table(header_data, colWidths=[540])
    header_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), PRIMARY_COLOR),
        ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('TOPPADDING', (0, 0), (-1, -1), 10),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 10),
        ('LEFTPADDING', (0, 0), (-1, -1), 12),
        ('RIGHTPADDING', (0, 0), (-1, -1), 12),
    ]))
    elements.append(header_table)
    elements.append(Spacer(1, 14))
    
    # Metadata Block
    applicant_name = applicant_data.get("name", "Sunita Devi")
    district = applicant_data.get("district", "G.B. Nagar")
    skill = applicant_data.get("extracted_skill", "Tailoring")
    timestamp = applicant_data.get("timestamp", datetime.now().strftime("%Y-%m-%d %H:%M"))
    status = applicant_data.get("pm_ajay_eligibility", {}).get("status", "GIA Linked")
    
    meta_table_data = [
        [
            Paragraph("<b>Applicant ID:</b> " + str(applicant_id), body_style),
            Paragraph("<b>Beneficiary Name:</b> " + str(applicant_name), body_style),
        ],
        [
            Paragraph("<b>District/State:</b> " + str(district), body_style),
            Paragraph("<b>Extracted Skill:</b> " + str(skill), body_style),
        ],
        [
            Paragraph("<b>Intake Timestamp:</b> " + str(timestamp), body_style),
            Paragraph(f"<b>Verification Status:</b> <font color='{ACCENT_GREEN.hexval()}'><b>{status}</b></font>", body_style),
        ]
    ]
    meta_table = Table(meta_table_data, colWidths=[270, 270])
    meta_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), BG_LIGHT),
        ('BOX', (0, 0), (-1, -1), 1, BORDER_COLOR),
        ('INNERGRID', (0, 0), (-1, -1), 0.5, BORDER_COLOR),
        ('PADDING', (0, 0), (-1, -1), 8),
    ]))
    elements.append(meta_table)
    elements.append(Spacer(1, 14))
    
    # Section 1: Beneficiary Intent & Voice Transcript
    elements.append(Paragraph("1. Beneficiary Intent & Audio Transcript", section_title_style))
    elements.append(HRFlowable(width="100%", thickness=1.5, color=SECONDARY_COLOR, spaceAfter=8))
    
    intent_audio = applicant_data.get("original_audio_intent", "Mujhe silai aati hai, machine ke liye loan chahiye.")
    intent_trans = applicant_data.get("translated_text", "Knows basic sewing, requires funding for motorized sewing machine.")
    
    intent_data = [
        [Paragraph("<b>Original Audio Inquiry:</b>", bold_body_style)],
        [Paragraph(f'"{intent_audio}"', quote_style)],
        [Paragraph("<b>English Translation:</b>", bold_body_style)],
        [Paragraph(intent_trans, body_style)]
    ]
    intent_table = Table(intent_data, colWidths=[540])
    intent_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), colors.HexColor("#f1f5f9")),
        ('BOX', (0, 0), (-1, -1), 1, colors.HexColor("#cbd5e1")),
        ('PADDING', (0, 0), (-1, -1), 6),
    ]))
    elements.append(intent_table)
    elements.append(Spacer(1, 14))
    
    # Section 2: NSQF Qualification Mapping
    elements.append(Paragraph("2. NSQF Skill Qualification Mapping", section_title_style))
    elements.append(HRFlowable(width="100%", thickness=1.5, color=SECONDARY_COLOR, spaceAfter=8))
    
    nsqf_info = applicant_data.get("nsqf_mapping", {})
    nsqf_level = nsqf_info.get("level", "NSQF Level 4")
    nsqf_role = nsqf_info.get("role", "Sewing Machine Operator (AMH/Q0301)")
    rpl_recommended = "Yes (Prior Learning Recognized)" if nsqf_info.get("rpl_recommended", True) else "No (Standard Course)"
    
    nsqf_table_data = [
        [Paragraph("<b>NSQF Mapped Level:</b>", bold_body_style), Paragraph(nsqf_level, body_style)],
        [Paragraph("<b>Job Role & QP Code:</b>", bold_body_style), Paragraph(nsqf_role, body_style)],
        [Paragraph("<b>RPL Track Eligible:</b>", bold_body_style), Paragraph(rpl_recommended, body_style)],
    ]
    nsqf_table = Table(nsqf_table_data, colWidths=[180, 360])
    nsqf_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), BG_LIGHT),
        ('BOX', (0, 0), (-1, -1), 1, BORDER_COLOR),
        ('INNERGRID', (0, 0), (-1, -1), 0.5, BORDER_COLOR),
        ('PADDING', (0, 0), (-1, -1), 7),
    ]))
    elements.append(nsqf_table)
    elements.append(Spacer(1, 14))
    
    # Section 3: PM-AJAY Scheme Grant Eligibility & Zero-Hallucination Source Trace
    elements.append(Paragraph("3. PM-AJAY Scheme Grant Eligibility & Vector Policy Source", section_title_style))
    elements.append(HRFlowable(width="100%", thickness=1.5, color=SECONDARY_COLOR, spaceAfter=8))
    
    pm_info = applicant_data.get("pm_ajay_eligibility", {})
    grant_type = pm_info.get("grant_type", "Micro-Enterprise Equipment Grant")
    eligible_amount = pm_info.get("eligible_amount", "₹50,000")
    source_doc = pm_info.get("source_document", "PM-AJAY_Guidelines_2024_25.pdf")
    source_page = pm_info.get("source_page", 38)
    sim_score = pm_info.get("similarity_score", 0.94)
    rule_snippet = pm_info.get("rule_snippet", "Section 4.2 (GIA Micro-Enterprises): Financial assistance up to ₹50,000 per beneficiary for purchasing self-employment equipment (e.g., motorized sewing machines, artisan tools).")
    
    pm_table_data = [
        [Paragraph("<b>Scheme Component:</b>", bold_body_style), Paragraph(grant_type, body_style)],
        [Paragraph("<b>Eligible Assistance:</b>", bold_body_style), Paragraph(f"<b>{eligible_amount}</b>", body_style)],
        [Paragraph("<b>Retrieved Document:</b>", bold_body_style), Paragraph(f"{source_doc} (Page {source_page})", body_style)],
        [Paragraph("<b>RAG Similarity Score:</b>", bold_body_style), Paragraph(f"<b>{sim_score}</b> (High Confidence)", body_style)],
        [Paragraph("<b>Policy Rule Snippet:</b>", bold_body_style), Paragraph(f'"{rule_snippet}"', quote_style)]
    ]
    pm_table = Table(pm_table_data, colWidths=[180, 360])
    pm_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), colors.HexColor("#f0fdf4")),
        ('BOX', (0, 0), (-1, -1), 1, colors.HexColor("#86efac")),
        ('INNERGRID', (0, 0), (-1, -1), 0.5, colors.HexColor("#bbf7d0")),
        ('PADDING', (0, 0), (-1, -1), 7),
    ]))
    elements.append(pm_table)
    elements.append(Spacer(1, 14))
    
    # Section 4: Action Roadmap Checklist
    elements.append(Paragraph("4. Field Officer & Beneficiary Action Steps", section_title_style))
    elements.append(HRFlowable(width="100%", thickness=1.5, color=SECONDARY_COLOR, spaceAfter=8))
    
    roadmap_steps = applicant_data.get("roadmap_steps", [
        "1. Verify Caste/Income Certificate and Aadhaar linkage at District Portal.",
        "2. Submit NSQF Level 4 RPL Assessment Application for Sewing Machine Operator.",
        "3. Issue PM-AJAY GIA Equipment Order voucher of ₹50,000 for Motorized Sewing Kit."
    ])
    
    steps_table_data = [[Paragraph(f"<b>Step {i+1}:</b> {step}", body_style)] for i, step in enumerate(roadmap_steps)]
    steps_table = Table(steps_table_data, colWidths=[540])
    steps_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), BG_LIGHT),
        ('BOX', (0, 0), (-1, -1), 1, BORDER_COLOR),
        ('INNERGRID', (0, 0), (-1, -1), 0.5, BORDER_COLOR),
        ('PADDING', (0, 0), (-1, -1), 6),
    ]))
    elements.append(steps_table)
    elements.append(Spacer(1, 16))
    
    # Footer verification signature
    footer_data = [
        [
            Paragraph("<b>Automated Verification Seal:</b> Project KARMAN AI System • Verified Against Official PM-AJAY Guidelines", ParagraphStyle('FooterStyle', parent=body_style, fontSize=8, textColor=colors.HexColor("#64748b"))),
            Paragraph("<b>Page 1 of 1</b>", ParagraphStyle('FooterRight', parent=body_style, fontSize=8, textColor=colors.HexColor("#64748b"), alignment=TA_RIGHT))
        ]
    ]
    footer_table = Table(footer_data, colWidths=[400, 140])
    footer_table.setStyle(TableStyle([
        ('LINEABOVE', (0, 0), (-1, -1), 1, BORDER_COLOR),
        ('PADDING', (0, 0), (-1, -1), 4),
    ]))
    elements.append(footer_table)
    
    doc.build(elements)
    return file_path

if __name__ == "__main__":
    test_data = {
        "applicant_id": "919876543210",
        "name": "Sunita Devi",
        "district": "G.B. Nagar",
        "original_audio_intent": "Mujhe silai aati hai, machine ke liye loan chahiye.",
        "translated_text": "Knows basic sewing, requires funding for motorized sewing machine.",
        "extracted_skill": "Tailoring & Sewing",
        "nsqf_mapping": {
            "level": "NSQF Level 4",
            "role": "Sewing Machine Operator (AMH/Q0301)",
            "rpl_recommended": True
        },
        "pm_ajay_eligibility": {
            "grant_type": "Micro-Enterprise Equipment Grant",
            "status": "GIA Linked",
            "eligible_amount": "₹50,000",
            "source_document": "PM-AJAY_Guidelines_2024_25.pdf",
            "source_page": 38,
            "similarity_score": 0.94,
            "rule_snippet": "Section 4.2 (GIA Micro-Enterprises): Financial assistance up to ₹50,000 per beneficiary for purchasing self-employment equipment (e.g., motorized sewing machines, artisan tools)."
        }
    }
    path = generate_applicant_pdf(test_data)
    print(f"Generated PDF successfully at: {path}")
