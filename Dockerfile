FROM python:3.11-slim

WORKDIR /app
COPY pyproject.toml* /app/
RUN pip install --no-cache-dir poetry \
    && poetry config virtualenvs.create false \
    && poetry install --no-interaction --no-root
COPY . /app
CMD ["uvicorn", "src.green_ai.service:app", "--host", "0.0.0.0", "--port", "8000"]
