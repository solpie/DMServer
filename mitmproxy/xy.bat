@rem 在Android studio和逍遥模拟器都启动的情况下调试代码
@echo on
cd /d C:\\Users\\solpi\\AppData\\Local\\Android\\Sdk\\platform-tools
adb start-server

cd /d C:\\Program Files\\Microvirt\\MEmu
adb connect 127.0.0.1:21503
pause