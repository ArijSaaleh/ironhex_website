# IRONHEX Server

Python FastAPI server.

1. Create virtual environment and install:

python -m venv .venv
.\.venv\Scripts\activate
pip install -r requirements.txt

2. Copy `.env.example` to `.env` and fill values (SMTP creds, EMAIL_TO, ADMIN_TOKEN).

3. Run server:

uvicorn server.main:app --reload --host 0.0.0.0 --port 8000

By default the server uses SQLite at `server/messages.db`.
