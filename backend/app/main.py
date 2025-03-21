#Prettier - Code formatter
#ESLint
#1. venv\Scripts\activate
#2. pip install fastapi uvicorn sqlalchemy pydantic python-dotenv
##uvicorn app.main:app --reload  BACKEND
##npm start  FRONTEND
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from .routers import organizations

app = FastAPI()
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(organizations.router)