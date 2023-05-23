from flask import flash, redirect, url_for, session
from functools import wraps
from dotenv import find_dotenv, load_dotenv

ENV_FILE = find_dotenv()
if ENV_FILE:
    load_dotenv(ENV_FILE)

def login_required(status=None):
    def login_decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            if 'user' in session and (status is None or status in session):
                return func(*args, **kwargs)
            else:
                print("not logged in")
                flash("You are not logged in")
                return redirect(url_for("login"))
        return wrapper
    return login_decorator