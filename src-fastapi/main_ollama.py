import uvicorn
from dotenv.main import DotEnv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse

envs = DotEnv(".env.local")

from _ollama.utils import Request, get_streaming_response
from utils.note import extract_text

FASTAPI_PORT = int(envs.get("FASTAPI_PORT"))
NEXT_PORT = int(envs.get("NEXT_PORT"))

app = FastAPI(
    title="Trio FastAPI server",
    version="0.0.1",
)
# Configure CORS settings
origins = [
    f"http://localhost:{NEXT_PORT}",
    "https://your-web-app.com",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    # allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def connect():
    return f"Connected to api server on port {FASTAPI_PORT}. Refer to 'http://localhost:{FASTAPI_PORT}/docs' for api docs."


@app.post("/ollama")
async def chat_stream(req: Request):
    try:
        stream = get_streaming_response(
            req.model, req.messages, extract_text(req.noteContents)
        )
        return StreamingResponse(
            stream,
            media_type="text/event-stream",
        )
    except Exception as e:
        print(e)


if __name__ == "__main__":
    try:
        print("Starting API server...")
        # Start the ASGI server
        uvicorn.run(
            "main_ollama:app",
            port=FASTAPI_PORT,
            log_level="info",
            reload=True,
            # reload_dirs=["src-fastapi"],
        )
    except HTTPException:
        print("Failed to start API server")
    except KeyboardInterrupt:
        print("API server stopped")
