from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers.plan import router as plan_router

app = FastAPI(title="RouteAI API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(plan_router, prefix="/api")
