FROM python:3.10.4

WORKDIR /usr/app
COPY ./ /usr/app
COPY requirements.txt .

RUN python3 -m pip install -r requirements.txt && \
    apt update && \
    apt -y install npm && \
    apt install sl && \ 
    ln -s /usr/games/sl /usr/bin/sl && \
    npm install firebase && \ 
    curl -s https://ngrok-agent.s3.amazonaws.com/ngrok.asc | tee /etc/apt/trusted.gpg.d/ngrok.asc >/dev/null && \
    echo "deb https://ngrok-agent.s3.amazonaws.com buster main" | tee /etc/apt/sources.list.d/ngrok.list && \
    apt update && \
    apt install ngrok