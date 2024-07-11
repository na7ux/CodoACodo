from flask import Flask, render_template
from flask_cors import CORS
from app.database import init_app
from app.views import *

app = Flask(__name__)

# Configurar la aplicación Flask
# app.config.from_pyfile('config/development.py')

# Inicializar la base de datos con la aplicación Flask
init_app(app)
# permitir solicitudes desde cualquier origen
CORS(app)
# permitir solicitudes desde un origen específico
# CORS(app, resources={r"/api/*": {"origins": "http://127.0.0.1:5000"}})

# Rutas para el CRUD de la entidad Users


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/usuario')
def registro():
    user_usuario = request.args.get('user_usuario')
    if user_usuario:
        return get_user(user_usuario)
    else:
        return render_template('registro.html')


app.route('/registro', methods=['POST'])(create_user)
app.route('/usuarios', methods=['GET'])(get_all_users)

app.route('/update/<string:user_usuario>', methods=['PUT'])(update_user)

app.route('/delete/<string:user_usuario>', methods=['DELETE'])(delete_user)

if __name__ == '__main__':
    app.run(debug=True)
