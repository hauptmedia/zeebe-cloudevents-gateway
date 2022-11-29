#!/bin/sh

curl -X POST --insecure -H "content-type: application/cloudevents+json" -d @test.json https://127.0.0.1:7777
