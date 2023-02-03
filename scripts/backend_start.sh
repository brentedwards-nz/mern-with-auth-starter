#!/bin/bash
clear
pushd ~/Projects/mern-with-auth-starter/backend
PID=$(ps -la | grep node | grep server.js | head -1 | awk '{print $2}')
echo 'PID: ' $PID
kill -9 $PID
PID=$(ps -la | grep node | grep server.js | head -1 | awk '{print $2}')
echo 'PID: ' $PID
kill -9 $PID
nodemon server.js
popd
