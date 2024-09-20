import unittest
import json
from app import app, connect_to_redis_kv_database

"""
Existing user from initial database: "user:jennifer39@yahoo.com"
email: "jennifer39@yahoo.com"
password: "rS;k|9Y1"
firstName: "jennifer"
securityQuestion: "What was your first dog's name?"
securityAnswer: "Zeus"


Existing user from initial database: "user:Margaret37@outlook.com"
email: "Margaret37@outlook.com"
password: "(6NI9Mlx"
firstName: "Margaret"
securityQuestion: "What was your first dog's name?"
securityAnswer: "Rosie"
"""

class TestCampsiteApp(unittest.TestCase):
    
    @classmethod
    def setUpClass(cls):
        """Sets up redis connection and Flask test client""" 
        cls.client = app.test_client()  
        cls.connection = connect_to_redis_kv_database()
        app.config['TESTING'] = True  
    
    
    def test_register_success(self):
        """Tests user registration - success"""
        data = {
            'email': 'test_register_success@test.com',
            'password': 'test1',
            'firstName': 'Test1',
            'securityQuestion': 'What is your favorite colour?',
            'securityQuestionAnswer': 'Red'
        }
        response = self.client.post('/register', json=data)
        self.assertEqual(response.status_code, 201)
        self.assertIn(b'User registered successfully', response.data)

    
    def test_register_existing_user(self):
        """Tests registration with existing user"""
        data = {
            'email': 'jennifer39@yahoo.com',
            'password': 'test2',
            'firstName': 'Test2',
            'securityQuestion': 'What is your favorite colour?',
            'securityQuestionAnswer': 'Green'
        }
        response = self.client.post('/register', json=data)
        self.assertEqual(response.status_code, 409)
        self.assertIn(b'User already exists', response.data)

    
    def test_login_success(self):
        """Tests login with correct credentials"""
        data = {
            'email': 'jennifer39@yahoo.com',
            'password': 'rS;k|9Y1'
        }
        response = self.client.post('/login', json=data)
        self.assertEqual(response.status_code, 200)
        self.assertIn(b'Login successful', response.data)

    
    def test_login_invalid_credentials(self):
        """Tests login with incorrect credentials"""
        data = {
            'email': 'jennifer39@yahoo.com',
            'password': 'wrongpassword'
        }
        response = self.client.post('/login', json=data)
        self.assertEqual(response.status_code, 401)
        self.assertIn(b'Incorrect credentials', response.data)

    
    def test_forgot_password_success(self):
        """Tests forgot password with correct security question answer"""
        data = {
            'email': 'Margaret37@outlook.com',
            'securityQuestionAnswer': 'Rosie',  
            'newPassword': 'newpassword123'
        }
        response = self.client.post('/forgot_password', json=data)
        self.assertEqual(response.status_code, 200)
        self.assertIn(b'Password updated successfully', response.data)
    
    
    def test_forgot_password_invalid_answer(self):
        """Tests forgot password with incorrect security question answer"""
        data = {
            'email': 'Margaret37@outlook.com',
            'securityQuestionAnswer': 'WrongAnswer',
            'newPassword': 'newpassword123'
        }
        response = self.client.post('/forgot_password', json=data)
        self.assertEqual(response.status_code, 400)
        self.assertIn(b'Incorrect security question answer', response.data)


if __name__ == '__main__':
    unittest.main()
