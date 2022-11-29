#!/bin/sh

#curl -X POST --insecure -H "content-type: application/cloudevents+json" -d @DeployResource.json https://127.0.0.1:7777
curl -X POST --insecure -H "content-type: application/cloudevents+json" -d @CreateProcessInstance.json https://127.0.0.1:7777
