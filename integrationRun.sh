#!/usr/bin/env bash -e
docker-compose up > /dev/null 2>&1 &
NEXT_WAIT_TIME=0
until curl -X GET http://localhost:8081/  || [[ ${NEXT_WAIT_TIME} -eq 300 ]]; do
   [[ NEXT_WAIT_TIME++ ]]
   sleep 1
done
jest --config ./jest.integration.json
docker-compose down
