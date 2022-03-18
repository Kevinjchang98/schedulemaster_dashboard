from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/sample', methods=['GET'])
def sample():
    return jsonify({"status": "ok", "response": "test"})

if __name__ == '__main__':
    app.run()