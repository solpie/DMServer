from flask import Flask, request, jsonify
from service import DanmakuSrv

import json

app = Flask(__name__)

dmk_srv = DanmakuSrv()
@app.after_request
def add_headers(response):
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Headers'] =  "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"
    response.headers['Access-Control-Allow-Methods']=  "POST, GET, PUT, DELETE, OPTIONS"
    return response


@app.route("/")
def hello():
    return "Hello World!"


@app.route("/<name>")
def hello_name(name):
    return "Hello " + name



@app.route("/dm", methods=["POST"])
def save_dm():
    j = request.get_json()
    dmk_list = j['dmk_list']
    dmk_srv.save_danmaku(dmk_list)
    return jsonify({'msg':'ok'})

dmk_srv.merge_page()

if __name__ == "__main__":
    app.run(debug=True, port=8888)
