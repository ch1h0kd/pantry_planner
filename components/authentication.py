from flask import Blueprint
from os import environ as env
from urllib.parse import quote_plus, urlencode
from pprint import pprint as print

from authlib.integrations.flask_client import OAuth
from authlib.oauth2.rfc6750 import BearerTokenValidator

from flask import redirect, session, request

from helpers.decorators import url_for

from flask.json import jsonify

nickname = 'baseline'

def create_auth_blueprint(oauth):
    auth = Blueprint('auth', __name__, template_folder='templates')

    @auth.route('/login')
    def login():
        return oauth.auth0.authorize_redirect(
            redirect_uri=url_for("auth.callback", _external=True)
        )

    @auth.route('/callback', methods=["GET", "POST"])
    def callback():
        token = oauth.auth0.authorize_access_token()
        session["user"] = token
        nickname = session["user"]['userinfo']['nickname']
        return redirect(url_for("pantry_planner"))

    @auth.route('/logout')
    def logout():
        session.clear()
        return redirect(
            "/successful_logout"
        )   
    
    return auth

def get_nickname():
    return nickname
