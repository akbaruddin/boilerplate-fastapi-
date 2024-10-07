from fastapi import APIRouter, Request
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
from app.config import settings
from app.utils import load_aicamera_package_json

router = APIRouter()
templates = Jinja2Templates(directory="app/templates")

@router.get("/aicamera", response_class=HTMLResponse)
async def render_aicamera_page(request: Request, dev: int = 0):
    """
    Render the AI camera template.
    """
    package_data = load_aicamera_package_json()
    return templates.TemplateResponse(
        "aicamera_index.html",
        {
            "request": request,
            "dev_level": dev,
            "debug": settings.debug,
            "version": package_data.get("version"),
        }
    )
