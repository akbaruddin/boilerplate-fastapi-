import json
from pathlib import Path

def load_aicamera_package_json():
    print(Path(__file__).parent)
    package_json_path = Path(__file__).parent.parent / "web-app/aicamera/package.json"
    with open(package_json_path, "r") as file:
        data = json.load(file)
    return data
