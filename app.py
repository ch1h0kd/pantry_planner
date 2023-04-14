from flask import Flask, render_template
app = Flask(__name__)

@app.route('/')
def index() -> str:
    return render_template('homepage.html')

# I think this is how it would be set up for other pages but not entirely sure -Fish
# @app.route('/myfood')
# def myfood() -> str:
#     return render_template('myfood.html')

# this is a temporary fix hopefully for the button not working
@app.route('/pantry_planner')
def pantryplanner() -> str:
    return render_template('homepage.html')

@app.route('/settings')
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
def recipes() -> str:
    return render_template('login.html')

if __name__ == '__main__':
    index()