from flask import Flask, render_template
app = Flask(__name__)

@app.route('/')
def index() -> str:
    return render_template('homepage.html')

# I think this is how it would be set up for other pages but not entirely sure -Fish
# @app.route('/myfood')
# def myfood() -> str:
#     return render_template('myfood.html')

if __name__ == '__main__':
    index()