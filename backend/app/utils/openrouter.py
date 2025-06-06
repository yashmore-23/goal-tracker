import os
import httpx
from fastapi import HTTPException
from dotenv import load_dotenv
from app import config  # ✅ FIXED

load_dotenv()

OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")
MODEL_NAME = os.getenv("OPENROUTER_MODEL", "google/gemma-3n-e4b-it:free")
settings = config.settings  # ✅ ADDED

OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions"

async def chat_with_ai(messages: list[dict]) -> str:
    print("🔍 Calling OpenRouter API with:")
    print("Messages:", messages)
    print("Model:", MODEL_NAME)
    print("API Key Present:", bool(OPENROUTER_API_KEY))

    if not OPENROUTER_API_KEY:
        raise HTTPException(status_code=500, detail="Missing OpenRouter API key")

    headers = {
        "Authorization": f"Bearer {OPENROUTER_API_KEY}",
        "Content-Type": "application/json"
    }

    payload = {
        "model": MODEL_NAME,
        "messages": messages,
        "max_tokens": 1000
    }

    async with httpx.AsyncClient() as client:
        response = await client.post(OPENROUTER_URL, headers=headers, json=payload)
        print("Status code:", response.status_code)
        print("Response body:", response.text)

        response.raise_for_status()
        return response.json()["choices"][0]["message"]["content"]

