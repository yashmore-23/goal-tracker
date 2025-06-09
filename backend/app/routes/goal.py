from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from app import models, schemas, database
from app.routes.auth import get_current_user

router = APIRouter()

get_db = database.get_db

@router.post("/", response_model=schemas.GoalOut)
def create_goal(
    goal: schemas.GoalCreate,
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    db_goal = models.Goal(
        title=goal.title,
        description=goal.description,
        completed=goal.completed,
        user_id=current_user.id
    )
    db.add(db_goal)
    db.commit()
    db.refresh(db_goal)
    return db_goal

@router.get("/", response_model=List[schemas.GoalOut])
def read_goals(
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    goals = db.query(models.Goal).filter(models.Goal.user_id == current_user.id).all()
    return goals

@router.get("/{goal_id}", response_model=schemas.GoalOut)
def read_goal(
    goal_id: int,
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    goal = db.query(models.Goal).filter(models.Goal.id == goal_id, models.Goal.user_id == current_user.id).first()
    if not goal:
        raise HTTPException(status_code=404, detail="Goal not found")
    return goal

@router.put("/{goal_id}", response_model=schemas.GoalOut)
def update_goal(
    goal_id: int,
    goal_update: schemas.GoalUpdate,
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    goal = db.query(models.Goal).filter(models.Goal.id == goal_id, models.Goal.user_id == current_user.id).first()
    if not goal:
        raise HTTPException(status_code=404, detail="Goal not found")

    update_data = goal_update.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(goal, key, value)

    db.commit()
    db.refresh(goal)
    return goal

@router.delete("/{goal_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_goal(
    goal_id: int,
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    goal = db.query(models.Goal).filter(models.Goal.id == goal_id, models.Goal.user_id == current_user.id).first()
    if not goal:
        raise HTTPException(status_code=404, detail="Goal not found")
    db.delete(goal)
    db.commit()
    return None
