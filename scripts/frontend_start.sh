#!/bin/bash
clear
pushd ~/Projects/mern-with-auth-starter/frontend
PID=$(ps -la | grep node | grep mern-frontend | head -1 | awk '{print $2}')
echo 'PID: ' $PID
kill -9 $PID
PID=$(ps -la | grep node | grep mern-frontend | head -1 | awk '{print $2}')
echo 'PID: ' $PID
kill -9 $PID
npm start
popd
