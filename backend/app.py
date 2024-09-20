from datetime import timedelta
from flask import Flask, request, jsonify
from flask_cors import CORS
import redis
import csv
import bcrypt
from flask_jwt_extended import create_access_token, jwt_required, JWTManager

"""Initilised Flask app and enables CORS"""
app = Flask(__name__)
CORS(app) 

"""JWT setup"""
app.config['JWT_SECRET_KEY'] = 'your_secret_key'
jwt = JWTManager(app)

def connect_to_redis_kv_database() :
    """Connects to the Redis Cache database"""
    connection = redis.Redis(  host='redis-17186.c74.us-east-1-4.ec2.redns.redis-cloud.com',  port=17186,  password='bi8Yx2xRghnei6wft8juL3ae3TzK1wJW', decode_responses=True)
    return connection

connection = connect_to_redis_kv_database()
# print (connection.ping())

def load_initial_data(connection, file_path):
    """Loads initial data to the database from csv file"""
    try:
        with open(file_path, mode='r') as file:
            reader = csv.DictReader(file)
            for row in reader:
                email = row['username'].strip()
                password = row['password'].strip()
                firstname = row['firstname'].strip()
                security_question = 'What was you first dog\'s name?'
                security_question_answer = row['first dogs name'].strip()

                hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

                userid = connection.incr('userIdCounter')
                if connection.exists('user:'+ email):
                    return jsonify({"error": "User already exists"}), 409
              
                connection.hset('user:'+ email, mapping={
                    'password' : hashed_password.decode('utf-8'),
                    'firstName' : firstname,
                    'securityQuestion' : security_question,
                    'securityQuestionAnswer' : security_question_answer
                })
    except FileNotFoundError as e:
        print(f"Error: {e}")


def setup_database(connection, initialData):
    """Sets up the counter and calls initial data load function"""
    connection.set ('userIdCounter', 0)
    load_initial_data(connection, initialData)


"""User's registration endpoint"""
@app.post('/register')
def create_account():
    """Registers a new user by saving the credentials to the Redis"""
    data = request.json
    email = data.get('email').strip()
    password = data.get('password').strip()
    firstname = data.get('firstName').strip()
    security_question = data.get('securityQuestion').strip()
    security_question_answer = data.get('securityQuestionAnswer').strip()

    if connection.exists('user:'+ email):
        return jsonify({"error": "User already exists"}), 409

    # Encrypts the password before saving
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
    connection.hset('user:'+ email, mapping={
        'password' : hashed_password.decode('utf-8'),
        'firstName' : firstname,
        'securityQuestion' : security_question,
        'securityQuestionAnswer' : security_question_answer
    })
    
    return jsonify({'message': 'User registered successfully! Please log in.'}), 201

"""User's login endpoint"""
@app.post('/login')
def login():
    """Logs in a user by validating their credentials and returning JWT."""
    data = request.json
    email = data.get('email').strip()
    password = data.get('password').strip()
    remember_me = data.get('rememberMe', False)

    user = connection.hgetall('user:'+email)
    if not user:
        return jsonify({'error': 'User does not exist'}), 404

    stored_password = user.get('password').encode('utf-8')
    if not bcrypt.checkpw(password.encode('utf-8'), stored_password):
        return jsonify({'error': 'Incorrect credentials'}), 401

    expires = timedelta(days=7) if remember_me else timedelta(hours=1)
    access_token = create_access_token(identity=email)
    return jsonify({'message': 'Login successful', 'accessToken' : access_token}), 200


"""User's email verification endpoint"""
@app.post('/verify_email')
def verify_email():
    """Verifies the email and retrieves the security question"""
    data = request.json
    email = data.get('email').strip()
    user = connection.hgetall('user:'+email)
    if not user:
        return jsonify({'error': 'User does not exist'}), 404
    security_question = connection.hget('user:'+email, 'securityQuestion')
    return jsonify({'email':email, 'securityQuestion': security_question}), 200


"""User's forgot password endpoint"""
@app.post('/forgot_password')
def forgot_password():
    """Allows users to reset their password after verifying the security question"""
    data = request.json
    email = data.get('email').strip()
    security_question_answer = data.get('securityQuestionAnswer').strip()
    new_password = data.get('newPassword').strip()

    user = connection.hgetall('user:'+email)
    if not user:
        return jsonify({'error': 'User does not exist'}), 404
    
  
    stored_security_question_answer = user.get('securityQuestionAnswer')
    if security_question_answer != stored_security_question_answer:
        return jsonify({'error': 'Incorrect security question answer'}), 400

    hashed_password = bcrypt.hashpw(new_password.encode('utf-8'), bcrypt.gensalt())
    connection.hset('user:'+email, 'password', hashed_password.decode('utf-8'))
    return jsonify({'message': 'Password updated successfully'}), 200
    

"""User's home endpoint, requires a valid JWT to access this route"""
@app.get('/home')
@jwt_required()
def home():
    """Displays the home page for authenticated users"""
    return jsonify({'message': 'User was successfully logged in'}), 200


if __name__ == '__main__':
    if not connection.exists('user:jennifer39@yahoo.com'):
        setup_database(connection, 'ICT320 - Task 2 - Initial Database.csv')

    app.run(debug=True)