import json
from os import environ as env

from authlib.integrations.flask_client import OAuth

from dotenv import find_dotenv, load_dotenv
from flask import Flask, redirect, render_template, url_for, flash, request, jsonify, session

from components.authentication import create_auth_blueprint, nickname

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
    return render_template('homepage.html', session=session.get('user'))#, pretty=json.dump(session.get('user'), indent=4))

# this is a temporary fix hopefully for the button not working
@app.route('/pantry_planner')
def pantry_planner() -> str:
    return render_template('homepage.html', session=session.get('user'))#, pretty=json.dump(session.get('user'), indent=4))

@app.route('/settings')
@login_required()
def settings() -> str:
    return render_template('settings.html', session=session.get('user'))#, pretty=json.dump(session.get('user'), indent=4))

@app.route('/my_food')
def my_food() -> str:
    return render_template('my_food.html', session=session.get('user'))#, pretty=json.dump(session.get('user'), indent=4))

@app.route('/shopping_list')
def shopping_list() -> str:
    return render_template('shopping_list.html', session=session.get('user'))#, pretty=json.dump(session.get('user'), indent=4))

@app.route('/recipes')
def recipes() -> str:
    return render_template('recipes.html', session=session.get('user'))#, pretty=json.dump(session.get('user'), indent=4))

# @app.route('/login')
# @login_required()
# def login() -> str:
#     return render_template('homepage.html', session=session.get('user'))

@app.route('/successful_logout')
def successful_logout() -> str:
    return render_template('logout.html', session=session.get('user'))#, pretty=json.dump(session.get('user'), indent=4))

@app.route('/getnickname')
def getnickname():
    print('Is this even running?')
    return jsonify(nickname)

foodNames = None  # Initialize global variable

@app.route('/myFoodArray/<string:itemArray>', methods=['POST'])
def myFoodArray(itemArray):
    itemArray = json.loads(itemArray)
    global foodNames  # Declare that we're using the global variable
    foodNames = itemArray
    return "Success!!"

@app.route('/api-endpoint', methods=['GET'])
def api_endpoint():
    url = "https://tasty.p.rapidapi.com/recipes/list"

    print(f"Item: {foodNames}")

    # choose 3 ingredients from my food randomly
    if len(foodNames) < 3:
        items_str = ' '.join(foodNames)
    
    else:
        random_indices = random.sample(range(len(foodNames)), 3)
        random_items = [foodNames[i] for i in random_indices]
    
    items_str = ' '.join(random_items)
    # Retrieve the query parameters from the request
    # Load the HTML file
    # with open('templates/recipes.html') as f:
    #     soup = BeautifulSoup(f, 'html.parser')

    # # Find the input element with id 'name'
    # name_input = soup.find('input', {'id': 'name'}).get('value')
    # print(soup.find('input', {'id': 'name'}))
    # print(name_input)

    # Get the value of the input
    # name_value = name_input['value']
    # print(name_value)

    # name = request.form['name']
    # name_input = request.args.get("name")
    # print(name)
    querystring = {"from":"0","size":30,"q":items_str}

    headers = {
        "X-RapidAPI-Key":env.get("API_KEY"),
        "X-RapidAPI-Host":env.get("API_HOST")
    }

    response = requests.request("GET", url, headers=headers, params=querystring)

    # Process the response and return the result
    if response.status_code == 200:
        result = response.json()
        return jsonify(result);
    else:
        return "API request failed with status code: " + str(response.status_code)

if __name__ == '__main__':
    index()
