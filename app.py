from os import environ as env

from authlib.integrations.flask_client import OAuth

from dotenv import find_dotenv, load_dotenv
from flask import Flask, redirect, render_template, url_for, flash, request, jsonify

from components.authentication import create_auth_blueprint

from helpers.decorators import login_required

import requests

ENV_FILE = find_dotenv()
if ENV_FILE:
    load_dotenv(ENV_FILE)
    
app = Flask(__name__)
app.secret_key = env.get("APP_SECRET_KEY")

#initialize OAuth registry with this fetch_token function
oauth = OAuth(app)

oauth.register(
    "auth0",
    client_id=env.get("AUTH0_CLIENT_ID"),
    client_secret=env.get("AUTH0_CLIENT_SECRET"),
    client_kwargs={
        "scope": "openid profile email",
    },
    server_metadata_url=f'https://{env.get("AUTH0_DOMAIN")}/.well-known/openid-configuration'
)

app.register_blueprint(create_auth_blueprint(oauth))

@app.route('/')
def index() -> str:
    return render_template('homepage.html')

# this is a temporary fix hopefully for the button not working
@app.route('/pantry_planner')
def pantryplanner() -> str:
    return render_template('homepage.html')

@app.route('/settings')
@login_required()
def settings() -> str:
    return render_template('settings.html')

@app.route('/my_food')
def myfood() -> str:
    return render_template('my_food.html')

@app.route('/shopping_list')
def shopping_list() -> str:
    return render_template('shopping_list.html')

@app.route('/recipes')
def recipes() -> str:
    return render_template('recipes.html')

@app.route('/login')
def login() -> str:
    return render_template('welcome.html')

@app.route('/logout')
@login_required()
def logout() -> str:
    return render_template('logout.html')

@app.route("/")
def recipes():
    return render_template('recipes.html');

# @app.route("/request/", methods=['POST'])
# def request():
#     #Moving forward code
#     forward_message = "Moving Forward..."
#     return render_template('index.html', forward_message=forward_message);

@app.route("/request/", methods=['GET'])
def api_endpoint():
    url = "https://tasty.p.rapidapi.com/recipes/list"

    print("here")

    # Retrieve the query parameters from the request
    input1 = request.args.get('input1')

    querystring = {"from":"0","size":"20","tags":"under_30_minutes","q":input1}

    headers = {
        "X-RapidAPI-Key":env.get("API_KEY"),
        "X-RapidAPI-Host":env.get("API_HOST")
    }

    response = requests.request("GET", url, headers=headers, params=querystring)

    #print(response.text)
    # Process the response and return the result
    if response.status_code == 200:
        result = response.json()
        return render_template('recipes.html');
    else:
        return "API request failed with status code: " + str(response.status_code)

if __name__ == '__main__':
    index()
