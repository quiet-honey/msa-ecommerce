from fastapi import FastAPI

from core.db import get_users_col

app = FastAPI()


@app.get("/users")
async def test():
    await get_users_col().insert_one({"test": "test"})
    return "user-service-test"
