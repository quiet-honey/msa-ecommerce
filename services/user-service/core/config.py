import os


class Config:
    DB_URI = os.getenv("MONGO_URI")
