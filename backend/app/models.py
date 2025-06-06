from sqlalchemy import Column, Integer, String, DateTime, Boolean, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
from .database import Base

class User(Base):
    """
    User model represents a registered user.
    """
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    password = Column(String, nullable=False)

    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)

    goals = relationship("Goal", back_populates="owner", cascade="all, delete-orphan")

class Goal(Base):
    """
    Goal model represents a user's goal with optional description and status.
    """
    __tablename__ = "goals"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True, nullable=False)
    description = Column(String, nullable=True)
    completed = Column(Boolean, default=False, nullable=False)

    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)

    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)

    owner = relationship("User", back_populates="goals")
    reminders = relationship("Reminder", back_populates="goal", cascade="all, delete")

class Reminder(Base):
    """
    Reminder model represents a reminder tied to a specific goal.
    """
    __tablename__ = "reminders"

    id = Column(Integer, primary_key=True, index=True)
    remind_at = Column(DateTime, nullable=False)
    sent = Column(Boolean, default=False, nullable=False)

    goal_id = Column(Integer, ForeignKey("goals.id"), nullable=False)
    goal = relationship("Goal", back_populates="reminders")

