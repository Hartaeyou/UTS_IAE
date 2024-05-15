from flask import Flask
import requests

app = Flask(__name__)

@app.route('/', methods=['GET'])
def index():
    req = requests.get('http://localhost:3000/api/v1/posts')
    data = req.json()
    print(data)
    return data  # Flask will automatically convert dictionary to JSON response

if __name__ == '__main__':
    app.run(debug=True)
