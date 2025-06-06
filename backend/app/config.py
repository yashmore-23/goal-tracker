from pydantic_settings import BaseSettings
from pydantic import field_validator
from typing import Optional

class Settings(BaseSettings):
    """
    Application configuration loaded from environment variables or .env file.
    """

    # Email server settings
    email_host: str
    email_port: int = 587
    email_username: str
    email_password: str

    # JWT settings
    secret_key: str
    algorithm: str = "HS256"
    access_token_expire_minutes: int = 30

    # Logging settings
    log_file_path: Optional[str] = "logs/app_logs.log"

    # OpenRouter settings
    openrouter_api_key: Optional[str] = None
    openrouter_model: str = "google/gemma-3n-e4b-it:free"

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"
        extra = "allow"  # Allow unexpected fields instead of throwing errors

    @field_validator("email_username", "email_password", "secret_key", mode="before")
    @classmethod
    def check_required_fields(cls, v, info):
        if not v:
            raise ValueError(f"Missing critical config value: {info.field_name}")
        return v

settings = Settings()

