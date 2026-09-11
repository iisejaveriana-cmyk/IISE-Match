# IISE Match

IISE Match is a student recommendation and profiling system for the IISE chapter at Pontificia Universidad Javeriana, Bogotá. It analyzes student preferences and skills to match them with the best chapter activities.

## Overview
- **Frontend:** HTML/CSS/JS (Hosted on GitHub Pages)
- **Backend:** Google Apps Script (Serverless)
- **Database:** Google Sheets
- **AI Engine:** Google Gemini API

## Prerequisites
- A Google Account (Preferably the official IISE chapter account).
- A free Google Gemini API Key (Get it at [Google AI Studio](https://aistudio.google.com/)).

## Step-by-Step Installation

### 1. Google Sheets Setup
1. Create a new Google Spreadsheet.
2. Open Apps Script from the spreadsheet: `Extensions > Apps Script`.
3. Follow the instructions in `apps-script/SETUP_GUIDE.md` to deploy the backend.
4. Run `setupSheets()` to automatically create and populate these exact sheets:
   - `RESPUESTAS`
   - `PERFILES`
   - `ACTIVIDADES`
   - `RECOMENDACIONES`
   - `METRICAS`

### 2. Backend Deployment
See `apps-script/SETUP_GUIDE.md` for full details. 
- You must deploy as a **Web App**.
- Execute as: **Me**.
- Access: **Anyone**.

### 3. Frontend Configuration
1. In your frontend repository, locate `config.js` or where the API URL is defined.
2. Paste the Web App URL provided by Apps Script.

### 4. GitHub Pages Deployment
1. Push your frontend code to a GitHub repository.
2. Go to repository Settings > Pages.
3. Select the `main` branch and `/root` folder.
4. Save. Your site will be live shortly.

### 5. Testing Locally
You can test the backend locally using `curl`:
```bash
curl -X POST -H "Content-Type: application/json" \
     -d '{"action": "submit", "data": {"carrera": "Ingeniería Industrial", "semestre": "6"}}' \
     https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```

## Adding New Activities
You can add new activities by directly editing the `ACTIVIDADES` sheet in Google Sheets. The system dynamically reads this sheet for the catalog.

## Cost Breakdown
- **Google Sheets / Apps Script:** Free (Quota limits apply, but ample for a student chapter).
- **GitHub Pages:** Free.
- **Gemini API:** Free tier (15 RPM, 1M tokens/min).

## Common Errors
- **CORS Error on frontend:** Ensure the Web App is deployed with "Who has access: Anyone".
- **AI returns generic profile:** Check if the `GEMINI_API_KEY` is correctly set in Script Properties. The system will auto-fallback to template responses if the API fails.
- **Missing Sheets:** Run `setupInitialData()` again from the Apps Script editor.
