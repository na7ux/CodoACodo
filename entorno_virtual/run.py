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


""" @app.route('/registro')
def registro():
    return render_template('registro.html') """

app.route('/registro', methods=['POST'])(create_user)
app.route('/registro', methods=['GET'])(get_all_users)
app.route('/api/users/<int:user_user>', methods=['GET'])(get_user)
app.route('/api/users/<string:user_user>', methods=['PUT'])(update_user)
app.route('/api/users/<int:user_user>', methods=['DELETE'])(delete_user)

if __name__ == '__main__':
    app.run(debug=True)
