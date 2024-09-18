from flask import Flask
import redis

app = Flask(__name__)

def connect_to_redis_kv_database() :
    """Connects to an Redis Cache database."""
    connection = redis.Redis(  host='redis-17186.c74.us-east-1-4.ec2.redns.redis-cloud.com',  port=17186,  password='bi8Yx2xRghnei6wft8juL3ae3TzK1wJW', decode_responses=True)
    return connection






@app.route('/')
def home():
    return "Hello, Flask!"

#if __name__ == '__main__':
    #app.run(debug=True)

connection = connect_to_redis_kv_database()
print (connection.ping())