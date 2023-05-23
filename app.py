import json
from os import environ as env

from authlib.integrations.flask_client import OAuth

from dotenv import find_dotenv, load_dotenv
from flask import Flask, render_template, jsonify, session

from components.authentication import create_auth_blueprint, get_nickname

from helpers.decorators import login_required

import requests
import random

ENV_FILE = find_dotenv()
if ENV_FILE:
    load_dotenv(ENV_FILE)
    
app = Flask(__name__)
app.secret_key = env.get("APP_SECRET_KEY")
app.server_name = env.get("BASE_URL")

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
    return render_template('homepage.html', session=session.get('user'),nickname=getnickname())

# this is a temporary fix hopefully for the button not working
@app.route('/pantry_planner')
def pantry_planner() -> str:
    return render_template('homepage.html', session=session.get('user'),nickname=getnickname())

@app.route('/settings')
@login_required()
def settings() -> str:
    return render_template('settings.html', session=session.get('user'), nickname=getnickname())

@app.route('/my_food')
def my_food() -> str:
    return render_template('my_food.html', session=session.get('user'), nickname=getnickname())

@app.route('/shopping_list')
def shopping_list() -> str:
    return render_template('shopping_list.html', session=session.get('user'), nickname=getnickname())

@app.route('/recipes')
def recipes() -> str:
    return render_template('recipes.html', session=session.get('user'), nickname=getnickname())

@app.route('/getnickname', methods=['GET'])
def getnickname():
    dict = {'nickname':get_nickname()}
    return jsonify(dict)

foodNames = None # Initialize global variable

@app.route('/login')
@login_required()
def login() -> str:
    return render_template('homepage.html', session=session.get('user'),nickname=getnickname())

@app.route('/logout')
@login_required()
def logout() -> str:
    return render_template('homepage.html')

@app.route('/myFoodArray/<string:itemArray>', methods=['POST'])
def myFoodArray(itemArray):
    print("in my food array")
    itemArray = json.loads(itemArray)
    global foodNames  # Declare that we're using the global variable
    foodNames = itemArray
    return "Success!!"


searchTermG = None  # Initialize global variable

@app.route('/searchTerm/<string:searchTerm>', methods=['POST'])
def getSearchTerm(searchTerm):
    print("in search term")
    global searchTermG
    searchTermG = searchTerm
    return "Success!!"

    
@app.route('/api-endpoint', methods=['GET'])
def api_endpoint():

    url = "https://tasty.p.rapidapi.com/recipes/list"

    headers = {
            "X-RapidAPI-Key":env.get("API_KEY"),
            "X-RapidAPI-Host":env.get("API_HOST")
    }

    global foodNames  # Declare global variables
    global searchTermG

    response = None
    querystring = None
    keyword = None

    if (foodNames != None):
        print("length is.  ", len(foodNames))
        #choose 3 ingredients from my food randomly
        if len(foodNames) < 3:
            keyword = ' '.join(foodNames)
        
        else:
            random_indices = random.sample(range(len(foodNames)), 3)
            random_items = [foodNames[i] for i in random_indices]
            keyword = ' '.join(random_items)

    elif (searchTermG != None):
        keyword = searchTermG

    querystring = {"from":"0","size":50,"q":keyword}
    print("keyword : ", keyword)
    response = requests.request("GET", url, headers=headers, params=querystring)

    searchTermG = None #initialize
    foodNames = None

    # Process the response and return the result
    print("status code. ", response.status_code)
    if response.status_code == 200:
        result = response.json()
        return jsonify(result)

    else: #status code 401
        return str(response.status_code)

if __name__ == '__main__':
    index()
