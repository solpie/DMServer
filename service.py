from peewee import *
import json
db = SqliteDatabase('danmaku.db')

class BaseModel(Model):
    class Meta:
        database = db

class JSONField(TextField):
    def db_value(self, value):
        return json.dumps(value)

    def python_value(self, value):
        if value is not None:
            return json.loads(value)

class DanmakuModel(BaseModel):
    dmk_arr_json = JSONField()
    timestamp = TimestampField()

import time
 
timeStamp = int(time.time())
print(timeStamp)
def is_same_dm(dm1,dm2):
    if dm1['usename'] == dm2['usename']:
        if dm1['text'] == dm2['text']:
            return True
        else:
            return False
    else:
        return False
def is_same_dm2(arr1,i1,arr2,i2):
    if i1<len(arr1) and i2<len(arr2):
        return is_same_dm(arr1[i1],arr2[i2])
class DanmakuSrv:
    def save_danmaku(self,dm_arr):
        timestamp = int(time.time())
        print(timestamp)
        save_count = 0
        save_json = {'timestamp':timestamp,"dmk_arr":[]}
        for dm in dm_arr:
            a = dm.split("：")
            if len(a)>1:
                save_count+=1
                username = a[0]
                text = a[1:][0]
                print(username,'-',text)
                save_json['dmk_arr'].append({'usename':username,'text':text})
        if save_count>0:
            # User.insert(username='Mickey').execute()
            DanmakuModel.insert(timestamp=timestamp,dmk_arr_json=save_json).execute()
        pass
    def merge_page(self):
        dm_page = DanmakuModel.select().count()
        print('dm count page',dm_page)
        dm_arr = DanmakuModel.select().where(DanmakuModel.id < dm_page)
        print(dm_arr)
        last_dm_arr = None
        for dm in dm_arr:
            # print(dm.dmk_arr_json)
            timestamp = dm.dmk_arr_json['timestamp']
            dmk_arr = dm.dmk_arr_json['dmk_arr']
            print('timestamp',timestamp)
            for d in dmk_arr:
                print(d)
            if last_dm_arr:
                is_overlay,merge_arr = self.find_overlay(last_dm_arr,dmk_arr)
            last_dm_arr = dmk_arr

    def find_overlay(self,dm_arr_last,dm2_arr):
        i2 = 0
        # for i in range(len(dm2_arr)):
        while(i2<len(dm2_arr)):
            dm1 = dm2_arr[i2]
            is_same_3 = False
            # 重合部分的第一个在上一页的idx
            idx_start_same_last = -1
            for i_last in range(len(dm_arr_last)):
                dm_last = dm_arr_last[i_last]
                is_same = is_same_dm(dm1,dm_last)
                if is_same:
                    is_same_2 = is_same_dm2(dm_arr_last,i_last+1,dm2_arr,i2+1)
                    # skip+=1
                    if is_same_2:
                        i2+=1
                        is_same_3 = is_same_dm2(dm_arr_last,i_last+2,dm2_arr,i2+1)
                        if is_same_3:
                            idx_start_same_last = i_last
                            i2+=1
                            print(i_last,dm_last)
                            print('-',dm_arr_last[i_last+1])
                            print('-',dm_arr_last[i_last+2])
                            break
                # if dm_last['username']==dm1['username']:
                #     if 
            i2+=1
            if is_same_3:
                print('idx_start_same_last',idx_start_same_last)
                tail_arr = dm_arr_last[0:idx_start_same_last]
                # for i3 in range(len(tail_arr)):
                #     print('++',tail_arr[i3])
                # for i3 in range(len(dm2_arr)):
                #     print('##',dm2_arr[i3])
                tail_arr.extend(dm2_arr)
                # for i3 in range(len(tail_arr)):
                #     print('==',tail_arr[i3])
                return True,tail_arr
                # break
            return False,None

db.connect()
db.create_tables([DanmakuModel])


# dm = DanmakuModel.create(username="test",text="test_text")
# dm.save()

# dm = DanmakuModel.get(DanmakuModel.username == 'test')
# print(dm.username,dm.text)
