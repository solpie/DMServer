# -*- encoding=utf8 -*-
__author__ = "Qwx2"

from airtest.core.api import *

auto_setup(__file__)
# com.ss.android.ugc.aweme:id/text 

from poco.drivers.android.uiautomation import AndroidUiautomationPoco
poco = AndroidUiautomationPoco(use_airtest_input=True, screenshot_each_action=False)
import json
import urllib.request
using('tail_dm.air')
from tail_dm import *
def send_to_server(dmk_list):
#     data = {"dmk_list":dmk_list}
    server_url = 'http://localhost:8888'
#     server_url = 'http://10.244.1.2:8090'
#     server_url = 'http://liangle-rkb-stg.hupu.com/'
#     server_url = server_url+'/mobi?mod=danmaku'
    server_url = server_url+'/dm'
    data = json.dumps({"dmk_list":dmk_list})
    data = bytes(data, 'utf-8')
    headers = {'Content-Type': 'application/json'}
    request = urllib.request.Request(server_url, headers=headers,data=data)
    try:
        res =  urllib.request.urlopen(request,timeout=3.5)
        print(res.read())
    except Exception as e:
        print( str(e))
    pass
def get_dm():
    text_ui_list=poco(name="com.ss.android.ugc.aweme:id/text")
    # .offspring("android.widget.FrameLayout")
    print("poco:",len(text_ui_list))
    dmk_list = []
    need_swipe = False
    for i in range(0,len(text_ui_list)):  #同列表方式一致，节点序号从0开始，
        try:
#             dmk = text_ui_list[i].get_text().encode('gbk')
            dmk = text_ui_list[i].get_text()
            if dmk.find("：")>0:
                dmk_list.append(dmk)
        except Exception as e:
#             dmk = text_ui_list[i].get_text().encode('utf-8')
            print(i)
#             print(dmk)

    print('top_dm',dmk_list[0])
    
    if is_new_page(dmk_list):
        new_dm_arr = find_new_page(dmk_list)
        if len(new_dm_arr)>0:
            print("new_dm_arr",len(new_dm_arr))
            send_to_server(new_dm_arr)
           


while(1):
    get_dm()
    sleep(3)















