@ECHO off

cd /d "D:/serial-port-node/"

pm2 start server.js

pm2 status

pause