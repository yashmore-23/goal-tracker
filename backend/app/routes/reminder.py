from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from app import models, schemas, database
from app.routes.auth import get_current_user

router = APIRouter()

get_db = database.get_db

@router.post("/", response_model=schemas.ReminderOut)
def create_reminder(
    reminder: schemas.ReminderCreate,
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    goal = db.query(models.Goal).filter(models.Goal.id == reminder.goal_id, models.Goal.user_id == current_user.id).first()
    if not goal:
        raise HTTPException(status_code=404, detail="Goal not found")

    db_reminder = models.Reminder(
        remind_at=reminder.remind_at,
        goal_id=reminder.goal_id,
        sent=False
    )
    db.add(db_reminder)
    db.commit()
    db.refresh(db_reminder)
    return db_reminder

@router.get("/", response_model=List[schemas.ReminderOut])
def read_reminders(
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    reminders = (
        db.query(models.Reminder)
        .join(models.Goal)
        .filter(models.Goal.user_id == current_user.id)
        .all()
    )
    return reminders

@router.delete("/{reminder_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_reminder(
    reminder_id: int,
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    reminder = (
        db.query(models.Reminder)
        .join(models.Goal)
        .filter(models.Reminder.id == reminder_id, models.Goal.user_id == current_user.id)
        .first()
    )
    if not reminder:
        raise HTTPException(status_code=404, detail="Reminder not found")
    db.delete(reminder)
    db.commit()
    return None

