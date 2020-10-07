package com.rkb.douyincat;

import io.objectbox.annotation.Entity;
import io.objectbox.annotation.Id;

@Entity
public class EntityDm {
    @Id
    public long id;

    public String content;
    public String msg_id;
    public String user_id;
    public String user_name;
    public String created_time;
}
