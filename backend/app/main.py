from fastapi import FastAPI  # type: ignore[import-not-found]
from fastapi.middleware.cors import CORSMiddleware  # type: ignore[import-not-found]

from app.routes.applications import router as applications_router
from app.routes.admin import router as admin_router
from app.routes.partner import router as partner_router

app = FastAPI(
    title="StudentOS Partner API",
    version="1.0.0",
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {
        "message": "StudentOS Partner API is running"
    }


@app.get("/health")
def health():
    return {
        "status": "healthy"
    }


app.include_router(applications_router)
app.include_router(partner_router)
app.include_router(admin_router)
