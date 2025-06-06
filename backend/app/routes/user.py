from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app import models, schemas, database
from app.routes.auth import get_current_user, get_password_hash

router = APIRouter()

get_db = database.get_db

@router.post("/users/", response_model=schemas.UserOut)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    existing_user = db.query(models.User).filter(
        (models.User.email == user.email) | (models.User.username == user.username)
    ).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email or username already registered")
    hashed_password = get_password_hash(user.password)
    db_user = models.User(
        email=user.email,
        username=user.username,
        password=hashed_password
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

@router.get("/users/me/", response_model=schemas.UserOut)
def read_current_user(current_user: models.User = Depends(get_current_user)):
    return current_user

@router.put("/users/me/", response_model=schemas.UserOut)
def update_user_profile(
    updated_user: schemas.UserUpdate,
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    if updated_user.email:
        current_user.email = updated_user.email
    if updated_user.username:
        current_user.username = updated_user.username
    if updated_user.password:
        current_user.password = get_password_hash(updated_user.password)
    db.commit()
    db.refresh(current_user)
    return current_user

@router.post("/change-password/", status_code=204)
def change_password(
    old_password: str,
    new_password: str,
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    from app.routes.auth import verify_password, get_password_hash
    if not verify_password(old_password, current_user.password):
        raise HTTPException(status_code=400, detail="Old password is incorrect")
    current_user.password = get_password_hash(new_password)
    db.commit()
    return None

