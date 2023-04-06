FROM python:3.10.4

COPY requirements.txt .

RUN python3 -m pip install -r requirements.txt \
    apt update \
    apt -y install npm \
    npm install firebase