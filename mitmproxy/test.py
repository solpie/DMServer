from proto2 import ProtoApiResult_pb2, WebcastMessage_pb2 as Msg


def test():
    with open('./data/cont1602947905.bin', 'rb') as f:
        res_b = f.read()
        r = ProtoApiResult_pb2.ProtoApiResult()
        r.ParseFromString(res_b)
        decode_msg(res_b)


def decode_msg(res_b):
    r = ProtoApiResult_pb2.ProtoApiResult()
    r.ParseFromString(res_b)
    cls_map = {'WebcastChatMessage': Msg.WebcastChatMessage,
               'WebcastMemberMessage': Msg.WebcastMemberMessage}
    ignore_arr = []
    for msg in r.messages:
        decode_method = msg.method
        # print('method:', decode_method)
        is_ignore = True
        for cls_name in cls_map:
           
            if cls_name in decode_method:
                is_ignore = False
                print('method:', decode_method)
                decoder = cls_map[cls_name]()
                decoder.ParseFromString(msg.payload)
                base_msg = decoder.baseMessage[0]
                # print(decoder.baseMessage[0].msg_id)
                msg_id =base_msg.msg_id
                print('--msg_id ',msg_id)
                print('--room_id ',base_msg.room_id)
                if 'WebcastChatMessage' in decode_method:
                    print('---- ', decoder.chat_id, decoder.content)
        if is_ignore:
            ignore_arr.append(decode_method)

    print('ignore methods:',ignore_arr)

test()
