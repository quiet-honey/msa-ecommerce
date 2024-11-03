from motor.motor_asyncio import AsyncIOMotorClient
from core.config import Config

client = AsyncIOMotorClient(Config.DB_URI)
user_db = client.userdb


def get_users_col():
    return user_db["users"]
