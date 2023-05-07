from flask import flash, redirect, url_for as _url_for, session
from functools import wraps

def login_required(status=None):
    def login_decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            if 'user' in session and (status is None or status in session):
                return func(*args, **kwargs)
            else:
                flash("You are not logged in")
                return redirect(url_for(""))
        return wrapper
    return login_decorator

SERVER_NAME = "airfishi-bug-free-space-lamp-pgwj4rjxwrpf5vq-5000.preview.app.github.dev"
def url_for(endpoint, _external=False):
    return _url_for(endpoint, _external=_external).replace("localhost", SERVER_NAME)