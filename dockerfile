FROM python:3.10.4

WORKDIR /usr/app
COPY ./ /usr/app
COPY requirements.txt .

RUN python3 -m pip install -r requirements.txt && \
    apt update && \
    apt -y install npm && \
    apt install sl && \ 
    ln -s /usr/games/sl /usr/bin/sl && \
    npm install express cors express-jwt jwks-rsa firebase-admin firebase dotenv