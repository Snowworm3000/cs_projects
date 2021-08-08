from flask import Flask, render_template
from flask_socketio import SocketIO

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
#TODO: Set secret key on production environment
socketio = SocketIO(app, cors_allowed_origins="http://localhost:3000") #TODO: Set CORS allowed origin to server hosting react frontend if flask is not serving the react frontend.

@app.route("/")
# @cross_origin(origin='localhost',headers=['Content- Type','Authorization'])

def home():
    return render_template("index.html")

@socketio.on('my event')
def handle_my_custom_event(json):
    print('received json: ' + str(json))

@socketio.on("move")
def move(json):
    print('move', str(json))

if(__name__ == '__main__'):
    # app.run(debug=True)
    socketio.run(app)