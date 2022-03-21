from flask import Flask, jsonify, request
from flask_cors import CORS
import urllib.request, json

app = Flask(__name__)
CORS(app)

def get_token(username, password):
    apiKeyUrl = "https://smapi.schedulemaster.com/SMapi.aspx?c=findToken&username="+ username + "&pwd=" + password

    response = urllib.request.urlopen(apiKeyUrl)
    data = response.read()
    dict = json.loads(data)

    return dict["response"]["accounts"][0]["token"]

def get_data(url):
    response = urllib.request.urlopen(url)
    data = response.read()
    dict = json.loads(data)

    return jsonify(dict)

# TODO: Filter response by aircraft here and remove filtering logic from frontend
@app.route('/get-aircraft-list', methods=['GET'])
def get_aircraft_list():
    token = get_token(request.args.get('username'), request.args.get('password'))

    url = "https://smapi.schedulemaster.com/SMapi.aspx?c=getentity&t=" + token+ "&entity=res&entity_id=0"

    return get_data(url)

@app.route('/get-schedule-data', methods=['GET'])
def get_schedule_data():
    token = get_token(request.args.get('username'), request.args.get('password'))

    print(token)

    url = "https://smapi.schedulemaster.com/SMapi.aspx?c=schlist&t=" + token + "&res_list=CATEGORY->AIRPLANE,&st_date=" + request.args.get('start') + "&en_date="+ request.args.get('end') + "&uid=0&purge=F"

    print(url)

    return get_data(url)

if __name__ == '__main__':
    app.run()