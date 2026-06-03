import uvicorn
import sys
import os

# Add src/ to python path to allow feature imports
sys.path.insert(0, os.path.abspath(os.path.dirname(__file__)))

def start():
    """Launched with `python src/main.py`"""
    uvicorn.run("app.backend.server:app", host="0.0.0.0", port=8000, reload=True)

if __name__ == "__main__":
    start()
