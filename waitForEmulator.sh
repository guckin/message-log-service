#!/usr/bin/env bash
NEXT_WAIT_TIME=0
until curl -X GET http://localhost:8081/  || [[ ${NEXT_WAIT_TIME} -eq 300 ]]; do
   [[ NEXT_WAIT_TIME++ ]]
   sleep 1
done
