from flask import Blueprint, redirect, session, url_for

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
        return redirect(url_for("pantry_planner"))

    @auth.route('/logout')
    def logout():
        session.clear()
        return redirect(
            "/pantry_planner"
        )   
    
    return auth

def get_nickname():
    if 'user' not in session:
        return 'baseline'
    temp = session["user"]['userinfo']['email']
    for c in temp:
        if c == '@' or c == '.' or c == '{' or c == '}' or c == '[' or c == ']' or c == '/' or c == '$':
            temp = temp[:temp.index(c)] + temp[temp.index(c) + 1:]
    return temp