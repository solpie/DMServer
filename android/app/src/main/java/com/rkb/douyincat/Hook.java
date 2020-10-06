package com.rkb.douyincat;

import android.util.Log;

import de.robv.android.xposed.IXposedHookLoadPackage;
import de.robv.android.xposed.XC_MethodHook;
import de.robv.android.xposed.XposedHelpers;
import de.robv.android.xposed.callbacks.XC_LoadPackage;

public class Hook implements IXposedHookLoadPackage {
    private  void hook_okhttp3(XC_LoadPackage.LoadPackageParam loadPackageParam)
    {
//        okhttp3.OkHttpClient
        Class<?> hookClass = XposedHelpers.findClass("okhttp3.OkHttpClient",  loadPackageParam.classLoader);
        String methodName = "newCall";
        Class<?> _RequestClass = XposedHelpers.findClass("okhttp3.Request",  loadPackageParam.classLoader);
        Class<?> param1Class =_RequestClass;
        XposedHelpers.findAndHookMethod(hookClass, methodName, param1Class,
                new XC_MethodHook() {
                    @Override
                    protected void afterHookedMethod(MethodHookParam param) throws Throwable {
                        super.afterHookedMethod(param);
                        Object result = param.getResult();
                        Log.i("okhttp3", "hook:======hook_okhttp3==="+result);
                        Object request = XposedHelpers.callMethod(result,"request");
                        Object url = XposedHelpers.callMethod(request,"url");
                        Log.i("okhttp3", "hook:url: "+url);
                    }
                });
    }
    public void hook_dm(XC_LoadPackage.LoadPackageParam loadPackageParam){
        String clsName = "com.bytedance.android.livesdk.message.model.ey";
        String methodName = "decode";
        Class<?> hookClass = XposedHelpers.findClass("com.bytedance.android.livesdk.message.model.ey",  loadPackageParam.classLoader);
        Class<?> hClass = XposedHelpers.findClass("com.bytedance.android.livesdkapi.message.h",  loadPackageParam.classLoader);
        // g gVar
        Class<?> param1Class = XposedHelpers.findClass("com.bytedance.android.e.a.a.g",  loadPackageParam.classLoader);
        Class<?> sClass = XposedHelpers.findClass("com.bytedance.android.livesdk.message.model.s",  loadPackageParam.classLoader);
        XposedHelpers.findAndHookMethod(
                hookClass,methodName,
                param1Class,
                new XC_MethodHook() {
                    @Override
                    protected void afterHookedMethod(MethodHookParam param) throws Throwable {
                        //返回值
//                         return class   com.bytedance.android.livesdk.message.model.s
                        Object  result = param.getResult();
                        Log.i("message", "hook:======result==="+ result);


//                          common is  com.bytedance.android.livesdkapi.message.b
                        Object common = XposedHelpers.getObjectField(result,"baseMessage");
//                            Object msg_id =  XposedHelpers.getObjectField(common,"f108258d");
                        Log.i("message", "hook: common "+common);

//                            XposedBridge.log("开始获取属性：");
//                            Field[] fields = param.thisObject.getClass().getDeclaredFields();
//                            for (int i = 0; i < fields.length; i++) {
//                                XposedBridge.log("======【属性】==args[1]=" + fields[i].getName());
//                            }
//                            XposedBridge.log("获取属性完成：");

//                            param.thisObject.getClass().getDeclaredFields();
                        //第一个参数
//                            XposedBridge.log("hook:======result==="+ user);
                        Log.i("message", "hook:======class===");
//                            com.bytedance.android.live.base.model.user.User
                        Object user1 = XposedHelpers.callMethod(result,"a");
                        String user_name = XposedHelpers.callMethod(user1,"getRealNickName").toString();
                        String user_id =  XposedHelpers.callMethod(user1,"getIdStr").toString();
                        String content = XposedHelpers.callMethod(result,"b").toString();
                        Log.i("message", "hook: content "+ user_name+":"+content);

                        super.afterHookedMethod(param);
                    }
                }
        );
    }
    @Override
    public void handleLoadPackage(XC_LoadPackage.LoadPackageParam loadPackageParam) throws Throwable {
        if(loadPackageParam.packageName.equals("com.ss.android.ugc.aweme"))
        {
            this.hook_dm(loadPackageParam);
            this.hook_okhttp3(loadPackageParam);
        }
    }
}
