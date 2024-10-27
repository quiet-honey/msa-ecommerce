from fastapi import FastAPI

app = FastAPI()

@app.get("/users")
async def test():
    return "user-service-test"