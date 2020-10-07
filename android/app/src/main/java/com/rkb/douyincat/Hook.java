package com.rkb.douyincat;

import android.util.Log;

import java.io.IOException;
import java.util.HashMap;

import de.robv.android.xposed.IXposedHookLoadPackage;
import de.robv.android.xposed.XC_MethodHook;
import de.robv.android.xposed.XposedHelpers;
import de.robv.android.xposed.callbacks.XC_LoadPackage;
import io.objectbox.Box;
import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;

public class Hook implements IXposedHookLoadPackage {
    private void hook_okhttp3(XC_LoadPackage.LoadPackageParam loadPackageParam) {
//        okhttp3.OkHttpClient
        Class<?> hookClass = XposedHelpers.findClass("okhttp3.OkHttpClient", loadPackageParam.classLoader);
        String methodName = "newCall";
        Class<?> _RequestClass = XposedHelpers.findClass("okhttp3.Request", loadPackageParam.classLoader);
        Class<?> param1Class = _RequestClass;
        XposedHelpers.findAndHookMethod(hookClass, methodName, param1Class,
                new XC_MethodHook() {
                    @Override
                    protected void afterHookedMethod(MethodHookParam param) throws Throwable {
                        super.afterHookedMethod(param);
                        Object result = param.getResult();
                        Log.i("okhttp3", "hook:======hook_okhttp3===" + result);
                        Object request = XposedHelpers.callMethod(result, "request");
                        Object url = XposedHelpers.callMethod(request, "url");
                        Log.i("okhttp3", "hook:url: " + url);
                    }
                });
    }

    public Class<?> findClass(String className, XC_LoadPackage.LoadPackageParam loadPackageParam) {
//
        return XposedHelpers.findClass("com.bytedance.android.livesdk.message.model.ey", loadPackageParam.classLoader);

    }

    public void hook_dm2(XC_LoadPackage.LoadPackageParam loadPackageParam) {
        Class<?> param1Class = XposedHelpers.findClass("com.bytedance.android.e.a.a.g", loadPackageParam.classLoader);
        XposedHelpers.findAndHookMethod(
                "com.bytedance.android.livesdk.message.model.hv", loadPackageParam.classLoader,
                "decode",
                param1Class,
                new XC_MethodHook() {
                    @Override
                    protected void afterHookedMethod(MethodHookParam param) throws Throwable {
                        Object result = param.getResult();
                        Log.i("@member", "hook:======result===");
                        Object commonDataStr = XposedHelpers.getObjectField(result, "baseMessage");
                        Log.i("@member", "hook: common " + commonDataStr);
                        Object member = XposedHelpers.callMethod(result, "c");
//                        Object user = XposedHelpers.getObjectField(result, "f104160c");

//                        Log.i("@member", " class " + user);
                        Log.i("@member", " class " + result);

                        super.afterHookedMethod(param);
                    }
                }
        );
    }

    public void hook_dm(XC_LoadPackage.LoadPackageParam loadPackageParam) {
        String methodName = "decode";
        Class<?> hookClass = XposedHelpers.findClass("com.bytedance.android.livesdk.message.model.ey", loadPackageParam.classLoader);
        Class<?> hClass = XposedHelpers.findClass("com.bytedance.android.livesdkapi.message.h", loadPackageParam.classLoader);
        // g gVar  bytes[] gVar
        Class<?> param1Class = XposedHelpers.findClass("com.bytedance.android.e.a.a.g", loadPackageParam.classLoader);
//        Class<?> sClass = XposedHelpers.findClass("com.bytedance.android.livesdk.message.model.s", loadPackageParam.classLoader);
        XposedHelpers.findAndHookMethod(
                hookClass, methodName,
                param1Class,
                new XC_MethodHook() {
                    @Override
                    protected void afterHookedMethod(MethodHookParam param) throws Throwable {
                        //返回值
//                         return class   com.bytedance.android.livesdk.message.model.s
                        Object result = param.getResult();
                        Log.i("dm", "hook:======result===");


//                          common is  com.bytedance.android.livesdkapi.message.b
                        Object commonDataStr = XposedHelpers.getObjectField(result, "baseMessage");
//                            String msg_id =  XposedHelpers.getObjectField(common,"msg_id").toString();
                        Log.i("dm", "hook: common " + commonDataStr);


//                        HashMap kv = new HashMap();
                        String msg_id = "";
                        for (String segment : commonDataStr.toString().split("\\{|,\\s|\\}")) {
                            if (segment.contains("=")) {
                                segment = segment.replace("'", "");
                                String[] a = segment.split("=");
                                if (a[0].contains("messageId")) {
                                    msg_id = a[1];
                                }
//                Log.i("test", segment);
                            }
                        }
//        Log.i("test", String.valueOf(kv));
                        Log.i("dm", "hook: msg_id " + msg_id);
                        Log.i("dm", "hook:======class=== " + result);
//                            com.bytedance.android.live.base.model.user.User
                        Object user1 = XposedHelpers.callMethod(result, "a");
                        String user_name = XposedHelpers.callMethod(user1, "getRealNickName").toString();
                        String user_id = XposedHelpers.callMethod(user1, "getIdStr").toString();
                        String content = XposedHelpers.callMethod(result, "b").toString();
                        Log.i("dm", "user_id: " + user_id);
                        Log.i("dm", "hook: content " + user_name + ":" + content);

//                        ObjectBox.init(this);
//                        Box<EntityDm> dmBox = ObjectBox.get().boxFor(EntityDm.class);
//                        EntityDm dm = new EntityDm();
//                        dm.content= content;
//                        dm.user_name = user_name;
//                        dm.user_id =user_id;
//                        dm.msg_id =msg_id;
//                        dm.created_time = String.valueOf(System.currentTimeMillis());
//                        dmBox.put(dm);
                        String json = bowlingJson(msg_id, user_id, user_name, content);
                        String response = post("http://c-stg.liangle.com/srv/dmcat", json);
                        Log.i("dm", "post:  " + response);
                        super.afterHookedMethod(param);
                    }
                }
        );
    }

    public static final MediaType JSON
            = MediaType.get("application/json; charset=utf-8");

    OkHttpClient client = new OkHttpClient();

    String post(String url, String json) throws IOException {
        RequestBody body = RequestBody.create(json, JSON);
        Request request = new Request.Builder()
                .url(url)
                .post(body)
                .build();
        try (Response response = client.newCall(request).execute()) {
            return response.body().string();
        }
    }

    String bowlingJson(String msg_id, String user_id, String user_name, String content) {
        return "{\"msg_id\":\"" + msg_id + "\","
                + "\"user_id\":\"" + user_id + "\","
                + "\"user_name\":\"" + user_name + "\","
                + "\"content\":\"" + content + "\""
                + "}";
    }

    @Override
    public void handleLoadPackage(XC_LoadPackage.LoadPackageParam loadPackageParam) throws Throwable {
        if (loadPackageParam.packageName.equals("com.ss.android.ugc.aweme")) {
            this.hook_dm(loadPackageParam);
            this.hook_dm2(loadPackageParam);
        }
    }
}
