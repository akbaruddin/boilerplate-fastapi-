from fastapi import APIRouter, Request
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates

router = APIRouter()
templates = Jinja2Templates(directory="app/templates")

@router.get("/", response_class=HTMLResponse)
async def render_home_page(request: Request):
    """
    Render the home page template.
    """
    return templates.TemplateResponse("index.html", {"request": request})
