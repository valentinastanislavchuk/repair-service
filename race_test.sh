#!/bin/bash

echo "Sending parallel take requests..."

curl -X POST http://localhost:3000/requests/2/take &
curl -X POST http://localhost:3000/requests/2/take &

wait

echo "Done"
