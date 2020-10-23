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
                print('--msg_id ', base_msg.msg_id)
                print('--room_id ', base_msg.room_id)
                if 'WebcastChatMessage' in decode_method:
                    print('---- ', decoder.chat_id, decoder.content)
                    print('---- ', base_msg.display_text)
                if 'WebcastMemberMessage' in decode_method:
                    # print('---- ', decoder.anchor_display_text)
                    print('---- ', decoder.user_id)
                    # b_str = decoder.pop_str.encode("utf-8")
                    if len(decoder.pop_str) > 0:
                        # 新加入关注房间的用户
                        # print('---- ', len(decoder.pop_str), decoder.pop_str)
                        b_str = decoder.pop_str.decode("utf-8", 'ignore')
                        print(b_str)
                        # with open('test.txt', 'wb') as f:
                        #     f.write(decoder.pop_str)
                        #     f.close()
                        #     pass
                    # print('---- ', str(decoder.pop_str,'utf-8'))
                    dt = base_msg.display_text
                    print('---- ', dt)
                    # print('---- ', dt.key)
                    # print('---- ', dt.default_pattern)
                    if len(dt.pieces)>0:
                        p = dt.pieces[0]
                        # print('---- pieces',p.user_value)
                        print('---- pieces len:',len(dt.pieces))
                        # print('---- pieces',p.decode("utf-8", 'ignore'))
                    print('---- user', decoder.user)

        if is_ignore:
            ignore_arr.append(decode_method)

    print('ignore methods:', ignore_arr)


test()
