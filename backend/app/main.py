from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import traceback

from app import models
from app.database import engine
from app.routes import auth, user, goal, reminder, roadmap, ai_chat

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Goal Tracker API")

origins = [
    "http://localhost",
    "http://localhost:3000",
    "http://192.168.0.103:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/auth")
app.include_router(user.router)
app.include_router(goal.router, prefix="/goals", tags=["Goals"])
app.include_router(reminder.router, prefix="/reminders", tags=["Reminders"])
app.include_router(roadmap.router, tags=["Roadmap"])
app.include_router(ai_chat.router)

@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    print("Exception:", exc)
    traceback.print_exc()
    return JSONResponse(
        status_code=500,
        content={"detail": str(exc)},
        )
