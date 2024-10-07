export ENVIRONMENT=dev
python -m pipenv run uvicorn app.main:app --reload
