from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List
from app.utils.openrouter import chat_with_ai  # ✅ FIXED

router = APIRouter(prefix="/ai", tags=["AI Chat"])

class ChatMessage(BaseModel):
    role: str  # "user" or "assistant"
    content: str

class ChatRequest(BaseModel):
    messages: List[ChatMessage]

@router.post("/chat")
async def chat_endpoint(request: ChatRequest):
    try:
        response = await chat_with_ai([m.dict() for m in request.messages])
        return {"response": response}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

