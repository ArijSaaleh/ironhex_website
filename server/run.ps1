# Powershell helper to run server in dev
python -m venv .venv; .\.venv\Scripts\Activate; pip install -r requirements.txt; uvicorn server.main:app --reload
