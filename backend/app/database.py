from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# Replace with your actual DB credentials or use environment variables
DATABASE_URL = "postgresql://tracker_user:tracker_pass@localhost/goal_tracker"

engine = create_engine(DATABASE_URL, echo=False)  # Set echo=True to enable SQL logging during development

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    """
    Dependency function to get DB session.
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

