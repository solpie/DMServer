from flask import Flask, request, jsonify
from service import DanmakuSrv,DanmakuModel
import threading

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
import time
def thread_polling(name):
    # http post data
    # record timestamp filer save
    # 3 sec send 10 page
    while(1):
        print('sec:')
        time.sleep(5)
    pass

dm_page = DanmakuModel.select().limit(4)
print('dm count page',len(dm_page))
dmk_srv.merge_page(dm_page)

if __name__ == "__main__":
    # x = threading.Thread(target=thread_polling, args=(1,))
    # x.start()

    print([1,2,3][1:])
    app.run(debug=True, port=8888)
