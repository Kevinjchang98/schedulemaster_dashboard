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


@app.route('/sample', methods=['GET'])
def sample():
    return jsonify({
        "response": [
            {
                "sch_id": 11261146,
                "orig_key": 11261112,
                "res_id": 6941,
                "user_id": 84317,
                "made_by_user": 84315,
                "made_by_name": "Rohl, Heidi",
                "canc_by_user": 0,
                "canc_by_name": ", ",
                "auth_by": 84315,
                "ses_id": 23700249,
                "sch_start": "2019-01-21T16:00:00",
                "sec_start": 1548086400,
                "sec_end": 1548087636,
                "sch_end": "2019-01-21T18:20:36.393",
                "sch_made": "2019-01-21T16:04:06.920",
                "sch_reason": 1216,
                "purge": False,
                "cnx_user_id": 0,
                "destination": "Local (VFR only)",
                "rule_exempt": False,
                "sch_supercede": 0,
                "CATEGORY": "AIRPLANE",
                "N_NO": "1234D",
                "MODEL": "C172",
                "LOCATION": "",
                "NAME": "Joe Miller",
                "lastname": "Miller",
                "firstname": "Joe",
                "maint": False,
                "hmphone": "",
                "wrkphone": "",
                "cellphone": "",
                "email": "",
                "tag": 0,
                "sch_comment": "",
                "unconfirmed": 0,
                "postflight_done": 1,
                "postflight_systime": "2019-01-21T13:20:57.533"
            },
            {
                "sch_id": 11275183,
                "orig_key": 11275180,
                "res_id": 8954,
                "user_id": 84331,
                "made_by_user": 84315,
                "made_by_name": "Rohl, Heidi",
                "canc_by_user": 0,
                "canc_by_name": ", ",
                "auth_by": 84315,
                "ses_id": 23729027,
                "sch_start": "2019-01-28T07:30:00",
                "sec_start": 1548660600,
                "sec_end": 1548661740,
                "sch_end": "2019-01-28T07:49:00.520",
                "sch_made": "2019-01-28T07:46:09.593",
                "sch_reason": 1088,
                "purge": False,
                "cnx_user_id": 0,
                "destination": "123",
                "rule_exempt": False,
                "sch_supercede": 0,
                "CATEGORY": "AIRPLANE",
                "N_NO": "345SM",
                "MODEL": "C172",
                "LOCATION": "",
                "NAME": "Valerie Smith",
                "lastname": "Smith",
                "firstname": "Valerie",
                "maint": False,
                "hmphone": "",
                "wrkphone": "",
                "cellphone": "",
                "email": "",
                "tag": 0,
                "sch_comment": "",
                "unconfirmed": 0,
                "postflight_done": 1,
                "postflight_systime": "2019-01-28T04:49:15.347"
            },
            {
                "sch_id": 11386608,
                "orig_key": 11386608,
                "res_id": 10031,
                "user_id": 84317,
                "made_by_user": 84317,
                "made_by_name": "Miller, Joe",
                "canc_by_user": 0,
                "canc_by_name": ", ",
                "auth_by": 84317,
                "ses_id": 23977190,
                "sch_start": "2019-03-26T10:00:00",
                "sec_start": 1553594400,
                "sec_end": 1553601600,
                "sch_end": "2019-03-26T12:00:00",
                "sch_made": "2019-03-26T09:51:32.250",
                "sch_reason": 0,
                "purge": False,
                "cnx_user_id": 0,
                "destination": "",
                "rule_exempt": False,
                "sch_supercede": 0,
                "CATEGORY": "AIRPLANE",
                "N_NO": "N123GT",
                "MODEL": "BE-76",
                "LOCATION": "",
                "NAME": "Joe Miller",
                "lastname": "Miller",
                "firstname": "Joe",
                "maint": False,
                "hmphone": "",
                "wrkphone": "",
                "cellphone": "",
                "email": "",
                "tag": 0,
                "sch_comment": "",
                "unconfirmed": 0,
                "postflight_done": 1,
                "postflight_systime": "2019-05-06T08:51:36.120"
            },
            {
                "sch_id": 11386608,
                "orig_key": 11386608,
                "res_id": 10031,
                "user_id": 84317,
                "made_by_user": 84317,
                "made_by_name": "Miller, Joe",
                "canc_by_user": 0,
                "canc_by_name": ", ",
                "auth_by": 84317,
                "ses_id": 23977190,
                "sch_start": "2019-03-26T13:00:00",
                "sec_start": 1553594400,
                "sec_end": 1553601600,
                "sch_end": "2019-03-26T16:00:00",
                "sch_made": "2019-03-26T09:51:32.250",
                "sch_reason": 0,
                "purge": False,
                "cnx_user_id": 0,
                "destination": "",
                "rule_exempt": False,
                "sch_supercede": 0,
                "CATEGORY": "AIRPLANE",
                "N_NO": "N123GT",
                "MODEL": "BE-76",
                "LOCATION": "",
                "NAME": "Joe Miller",
                "lastname": "Miller",
                "firstname": "Joe",
                "maint": False,
                "hmphone": "",
                "wrkphone": "",
                "cellphone": "",
                "email": "",
                "tag": 0,
                "sch_comment": "",
                "unconfirmed": 0,
                "postflight_done": 1,
                "postflight_systime": "2019-05-06T08:51:36.120"
            }
        ]
    }
)

@app.route('/sample-aircraft-list', methods=['GET'])
def sample_aircraft_list():
    return jsonify({
    "response": [
        {
            "res_id": 6941,
            "N_NO": "1234D",
            "CATEGORY": "AIRPLANE",
            "category_group": 1,
            "mfg": "Cessna",
            "class": "SEL-FG",
            "model": "C172",
            "model_group": "C172",
            "c_resA": "",
            "c_resB": "",
            "COLOR": "B/W",
            "elig_BasicMed": False,
            "elig_SportPilot": False,
            "faa_id": "",
            "LOCATION": "",
            "FUELCAPACITY": 0,
            "MAXLOAD": 0,
            "SUSPEND": False,
            "HP": 180,
            "TASKTS": 110,
            "year_model": "",
            "date_added": "2011-01-12T11:47:27.400",
            "date_removed": "2020-05-12T10:32:31.017",
            "last_update": "2020-05-12T10:32:31.017",
            "seats": 4,
            "info": "",
            "wet": True,
            "show": True,
            "costperhour": 80,
            "owner_name": "joe money",
            "solo_req": "",
            "equip_list": "DME,GPS,WAAS,Storm Scope"
        },
        {
            "res_id": 8955,
            "N_NO": "345SM",
            "CATEGORY": "AIRPLANE",
            "category_group": 1,
            "mfg": "Cessna",
            "class": "SEL-FG",
            "model": "C152",
            "model_group": "C152",
            "c_resA": "",
            "c_resB": "",
            "COLOR": "",
            "elig_BasicMed": False,
            "elig_SportPilot": False,
            "faa_id": "",
            "LOCATION": "",
            "FUELCAPACITY": 0,
            "MAXLOAD": 0,
            "SUSPEND": False,
            "HP": 0,
            "TASKTS": 0,
            "year_model": "",
            "date_added": "2015-04-23T12:46:21.353",
            "date_removed": "2020-05-12T10:32:29.410",
            "last_update": "2020-05-12T10:32:29.410",
            "seats": 2,
            "info": "",
            "wet": False,
            "show": True,
            "costperhour": 100,
            "owner_name": "123SM owner",
            "solo_req": "Checkout required.<br>"
        },
        {
            "res_id": 11494,
            "N_NO": "N123GT",
            "CATEGORY": "AIRPLANE",
            "category_group": 1,
            "mfg": "",
            "class": "SEL-FG",
            "model": "C172",
            "model_group": "C172",
            "c_resA": "",
            "c_resB": "",
            "COLOR": "",
            "elig_BasicMed": False,
            "elig_SportPilot": False,
            "faa_id": "",
            "LOCATION": "",
            "FUELCAPACITY": 0,
            "MAXLOAD": 0,
            "SUSPEND": False,
            "HP": 0,
            "TASKTS": 0,
            "year_model": "1981",
            "date_added": "2022-02-17T09:15:33.207",
            "last_update": "2022-02-17T09:15:48.650",
            "seats": 0,
            "info": "",
            "wet": False,
            "show": True,
            "costperhour": 0,
            "solo_req": ""
        },
        {
            "res_id": 11079,
            "N_NO": "Headset",
            "CATEGORY": "OTHER",
            "category_group": 3,
            "class": "CLASS1",
            "model": "MODEL1",
            "elig_BasicMed": False,
            "elig_SportPilot": False,
            "faa_id": "",
            "LOCATION": "",
            "FUELCAPACITY": 0,
            "MAXLOAD": 0,
            "SUSPEND": False,
            "HP": 0,
            "TASKTS": 0,
            "year_model": "",
            "date_added": "2017-03-24T07:52:11.643",
            "last_update": "2021-03-24T07:52:11.643",
            "info": "",
            "wet": False,
            "show": True
        },
        {
            "res_id": 6950,
            "N_NO": "V_Smith",
            "CATEGORY": "INSTRUCTOR",
            "category_group": 2,
            "mfg": "Instructor",
            "class": "CFII-M",
            "model": "CFI,CFII,MEI,",
            "c_resA": "",
            "c_resB": "",
            "faa_id": "",
            "LOCATION": "",
            "FUELCAPACITY": 0,
            "MAXLOAD": 0,
            "SUSPEND": False,
            "HP": 0,
            "TASKTS": 0,
            "date_added": "2011-01-19T20:24:55.490",
            "date_removed": "2020-05-12T10:31:34.080",
            "last_update": "2021-03-24T07:49:53.830",
            "info": "",
            "wet": False,
            "show": True,
            "costperhour": 25,
            "instr_name": "Valerie Smith",
            "instr_userid": 84331,
            "instr_hmphone": "",
            "instr_wrkphone": "",
            "instr_cellphone": "",
            "instr_email": "",
            "instr_email2": "",
            "instr_usershow": True,
            "suspend_byDate": False,
            "suspend_details": "",
            "suspend_byMX": False,
            "MXsuspend_details": "",
            "checkouts": "C172,"
        }
    ]
}
)

if __name__ == '__main__':
    app.run()