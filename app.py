from flask import Flask, render_template
app = Flask(__name__)

@app.route('/')
def index() -> str:
    return render_template('index.html')

# I think this is how it would be set up for other pages but not entirely sure -Fish
# @app.route('/myfood')
# def myfood() -> str:
#     return render_template('myfood.html')

@app.route('/settings')
def settings() -> str:
    return render_template('settings.html')

if __name__ == '__main__':
    index()