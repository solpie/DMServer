
# find tail dm
from tail_dm import *
# find tail dm

def get_dm(dm_arr):
    if is_new_page(dm_arr):
        new_dm_arr = find_new_page(dm_arr)
        print(new_dm_arr)

def main():
    dm_arr1 =None
    dm_arr2 =None
    with open('./page1.txt','r',encoding='utf-8') as f:
        dm_arr1 = f.read().split('\n')
        f.close()
        # print(dm_arr1)
    get_dm(dm_arr1)
    with open('./page2.txt','r',encoding='utf-8') as f:
        dm_arr2 = f.read().split('\n')
        f.close()
        # print(dm_arr2)
    get_dm(dm_arr2)
    
    pass

main()