package com.rkb.douyincat;

import android.os.Bundle;
import android.util.Log;

import androidx.appcompat.app.ActionBar;
import androidx.appcompat.app.AppCompatActivity;
import androidx.preference.PreferenceFragmentCompat;

import java.util.HashMap;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import io.objectbox.Box;
import io.objectbox.android.AndroidObjectBrowser;

public class SettingsActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.settings_activity);
        getSupportFragmentManager()
                .beginTransaction()
                .replace(R.id.settings, new SettingsFragment())
                .commit();
        ActionBar actionBar = getSupportActionBar();
        if (actionBar != null) {
            actionBar.setDisplayHomeAsUpEnabled(true);
            this.test();
        }

        ObjectBox.init(this);
        if (BuildConfig.DEBUG) {
            // 添加调试
            boolean start=  new AndroidObjectBrowser(ObjectBox.get()).start(this);
            Log.e("====start=======",start+"");
        }
    }

    private void test() {
        Log.i("test", "test run");
        String cm = "CommonMessageData{createTime=0, roomId=6880691448577002244, messageId=6880723865132108559, method='WebcastChatMessage', describe='null', showMsg=true, monitor=0, displayText=null, foldType=0, anchorFoldType=0, priorityScore=0}";

        HashMap kv = new HashMap();
        for (String segment: cm.split("\\{|,\\s|\\}")){
            if(segment.contains("=")){
                segment= segment.replace("'","");
                String[] a = segment.split("=");
                kv.put(a[0],a[1]);
//                Log.i("test", segment);
            }
        }
//        Log.i("test", String.valueOf(kv));
        Log.i("test",kv.get("messageId").toString());
        Log.i("test",kv.get("roomId").toString());

//        Pattern r = Pattern.compile("roomId=");
//        Matcher m = r.matcher(cm);
//        if (!m.matches()) {   Log.i("dm", "分组" + i + ":" + m.group(i));
//            throw new IllegalArgumentException("Bad Input");
//        }
//        /*
//输出：
//
//分组0:Adams,John Quincy
//分组1:Adams
//分组2:John Quincy
//*/
//        for (int i = 0; i < m.groupCount() + 1; i++) {
//            Log.i("dm", "分组" + i + ":" + m.group(i));
//        }
//        cm.replace("CommonMessageData","");
////        cm.replace("createTime","\"createTime\"");
//        String[] props = {"createTime","roomId","messageId","method","describe","showMsg","monitor","displayText","foldType"};
//        cm = this.replace_prop(cm,"createTime");
//        cm = this.replace_prop(cm,"createTime");
    }
    private String replace_prop(String str,String prop)
    {
        str.replace(prop,"\""+prop+"\"");
        return  str;
    }

    public static class SettingsFragment extends PreferenceFragmentCompat {
        @Override
        public void onCreatePreferences(Bundle savedInstanceState, String rootKey) {
            setPreferencesFromResource(R.xml.root_preferences, rootKey);

        }
    }
}