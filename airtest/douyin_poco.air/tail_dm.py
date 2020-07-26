# find tail dm
top_conf= {"init":False,"top_dm_arr":['','','']}
tail_conf = {"init":False,"cursor_arr":['','','']}

def find_cursor_in_new_page(cursor_arr,dm_arr,from_idx):
    # from bottom   
    same_count = 0
    # print('---find from',from_idx)
    for cursor_idx in [-1,-2,-3]:
        cursor_dm = cursor_arr[cursor_idx]
        if from_idx+cursor_idx+1>0:
            new_dm = dm_arr[from_idx+cursor_idx+1]
            # print(new_dm,'<-->',cursor_dm)
            if new_dm == cursor_dm:
                same_count+=1
            else:
                return 0
    return same_count


def find_new_page(dm_arr):
    global tail_conf
    if len(dm_arr)>2:
        new_dm_arr = []
        cursor_arr = tail_conf['cursor_arr']
        if not tail_conf['init']:
            tail_conf['init']=True
            new_dm_arr = dm_arr
        else:
            # find cursor in new page
            # print('---cursor_arr')
            for dm in cursor_arr:
                print(dm)
            new_idx = len(dm_arr)

            while(new_idx>0):
                new_idx-=1
                same_count = find_cursor_in_new_page(cursor_arr,dm_arr,new_idx)
                # print("same",same_count)
                if same_count==3:
                    if new_idx+1!=len(dm_arr):
                        new_dm_arr = dm_arr[new_idx+1:]
                    break
                elif same_count>0 and new_idx+1==same_count:
                    # top
                    if new_idx+1!=len(dm_arr):
                        new_dm_arr = dm_arr[new_idx+1:]
                    break
                else:
                    new_dm_arr = dm_arr
        #
        cursor_arr[-3] = dm_arr[-3]
        cursor_arr[-2] = dm_arr[-2]
        cursor_arr[-1] = dm_arr[-1]
        
        return new_dm_arr
        

def is_new_page(dm_arr):
    global top_conf
    is_new = False
    top_dm_arr = top_conf['top_dm_arr']
    if not top_conf['init']:
        top_conf['init'] = True
        is_new = True
        pass
    if len(dm_arr)>0:
        if dm_arr[0]!=top_dm_arr[0]:
            is_new = True
        top_dm_arr[0]=dm_arr[0]
    return is_new

##find tail dm