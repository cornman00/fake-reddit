from flask import Flask, jsonify, request, json
from flask_mysqldb import MySQL
from datetime import datetime
from flask_cors import CORS
from flask_jwt_extended import (JWTManager, create_access_token)
from flask_bcrypt import Bcrypt
from functions import isEmail

app = Flask(__name__)

app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = '1234'
app.config['MYSQL_DB'] = 'reddit'
app.config['MYSQL_CURSORCLASS'] = 'DictCursor'
app.config['JWT_SECRET_KEY'] = 't1NP63m4wnBg6nyHYKfmc2TpCOGI4nss'

mysql = MySQL(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)
CORS(app)


@app.route('/signup', methods=['GET', 'POST'])
def signup():
    if request.method == 'POST':
        data = request.get_json()
        if isEmail(data['email']):
            email = data['email']
        else:
            print('Not a valid email')
            return "Register Failed"
        username = data['username']
        password = bcrypt.generate_password_hash(
            data['password']).decode('utf-8')
        cur = mysql.connection.cursor()

        cur.execute("INSERT INTO users(email, username, password) VALUES (%s, %s, %s)",
                    (email, username, password))
        mysql.connection.commit()
        cur.close()

        new_user = {
            'email': email,
            'username': username,
            'password': password
        }

        return jsonify(new_user=new_user)
    return "Register Success"


@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        data = request.get_json()
        username = data['username']
        password = data['password']
        result = ""
        cur = mysql.connection.cursor()
        cur.execute(
            "SELECT * FROM users WHERE username = '{0}'".format(username))
        rv = cur.fetchone()

        if not rv:
            print("Username does not exist")
        else:
            if bcrypt.check_password_hash(rv['password'], password):
                access_token = create_access_token(
                    identity={'username': rv['username']})
                result = jsonify(access_token=access_token)
            else:
                print("Invalid Password")
                result = jsonify(error_message="Invalid Password")
            return result
    return "Login Page"
