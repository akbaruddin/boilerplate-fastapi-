from fastapi import APIRouter
from . import root, aicamera

router = APIRouter()

router.include_router(root.router)
router.include_router(aicamera.router)
