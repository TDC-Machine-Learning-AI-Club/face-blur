ARG PYTHON_VERSION=3.11

FROM python:${PYTHON_VERSION}

RUN apt-get update && apt-get install -y \
    python3-pip \
    python3-venv \
    python3-dev \
    libgl1 \
    libglu1-mesa-dev \
    libopencv-dev \
    python3-setuptools \
    python3-wheel

ENV STORAGE_URL=xx
ENV SUPABASE_API_KEY=xxx
ENV FRONTEND_API_KEY=xxx

RUN mkdir -p /app
WORKDIR /app

COPY requirements.txt .
COPY .env .
RUN pip install -r requirements.txt

COPY . .

EXPOSE 8080

CMD ["uvicorn", "server:app", "--host", "0.0.0.0", "--port", "8080"]
