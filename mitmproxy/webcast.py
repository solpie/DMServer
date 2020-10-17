#  mitmdump -p 8080 -s .\webcast.py
# mitmweb 开启8080 mitmdump 并且8081 web log
# ..\protoc-3.13.0-win64\bin\protoc.exe -I=./ --python_out=./ *.proto
# pip install protobuf
import json
import time
from proto2 import ProtoApiResult_pb2, WebcastMessage_pb2


def response(flow):
    url = 'webcast'
    if url in flow.request.url:
        req_text = flow.request.get_text()
        if 'resp_content_type=protobuf' in req_text:
            res_b = flow.response.content
            print('【Webcastmsg】')
            file_name = './data/cont'+str(int(time.time()))+'.bin'
            r = ProtoApiResult_pb2.ProtoApiResult()
            r.ParseFromString(res_b)
            for msg in r.messages:
                decode_method = msg.method

                print('method:', decode_method)
                if 'WebcastChatMessage' in decode_method:
                    decoder = WebcastMessage_pb2.WebcastChatMessage()
                    decode_msg = decoder.ParseFromString(msg.payload)
                    # print(msg.payload)
                    print('::', decode_msg)
                if 'WebcastMemberMessage' in decode_method:
                    decode_msg = WebcastMessage_pb2.WebcastMemberMessage().ParseFromString(msg.payload)
                    print('::', decode_msg)

                # with open(file_name,'wb') as f:
                #     f.write(res_b)
                #     f.close()
            # print(res_b)
        # if 'WebSocket' in flow.response.content:
        #     print(flow.response.content)
        #     pass
