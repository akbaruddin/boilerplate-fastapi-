# main.py
from fastapi import FastAPI
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
import os

app = FastAPI()

# Serve static files from the 'dist' directory
app.mount("/", StaticFiles(directory=".", html=True), name="static")

@app.get("/")
async def read_index():
    return FileResponse("index.html")

# Optionally, serve other static assets directly
@app.get("/{path_name:path}")
async def serve_static_files(path_name: str):
    file_path = os.path.join(".", path_name)
    if os.path.isfile(file_path):
        return FileResponse(file_path)
    return FileResponse("index.html")  # Serve index.html for SPA routing
