from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import logging

from app import models, schemas, database, config
from app.routes.auth import get_current_user

router = APIRouter()

get_db = database.get_db
settings = config.settings

@router.post("/roadmap")
def generate_roadmap(
    goal_description: str,
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    if not settings.openrouter_api_key:
        raise HTTPException(status_code=503, detail="OpenRouter API key not configured")

    try:
        # Call your OpenRouter AI client here
        # Example placeholder:
        # response = openrouter_client.generate(goal_description)
        # roadmap = response.text

        roadmap = f"Simulated roadmap for: {goal_description}"  # Remove when real API integration added

        return {"roadmap": roadmap}
    except Exception as e:
        logging.error(f"OpenRouter API error: {e}")
        raise HTTPException(status_code=500, detail="Failed to generate roadmap")

