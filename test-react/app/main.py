from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates

from app.routes import router as routes_router


app = FastAPI()


app.include_router(routes_router)

app.mount("/static", StaticFiles(directory="app/static"), name="static")
app.mount("/templates", Jinja2Templates(directory="app/templates"))
