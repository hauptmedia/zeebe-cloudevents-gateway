#!/bin/sh

echo
echo "HTTP/1.1 Tests"
curl -X POST --http1.1 --insecure -H "content-type: application/cloudevents+json" -d @DeployResourceRequest.json https://127.0.0.1:7777
curl -X POST --http1.1 --insecure -H "content-type: application/cloudevents+json" -d @CreateProcessInstanceRequest.json https://127.0.0.1:7777
curl -X POST --http1.1 --insecure -H "content-type: application/cloudevents+json" -d @TopologyRequest.json https://127.0.0.1:7777

echo
echo "HTTP/2 Tests"
curl -X POST --http2 --insecure -H "content-type: application/cloudevents+json" -d @DeployResourceRequest.json https://127.0.0.1:7777
curl -X POST --http2 --insecure -H "content-type: application/cloudevents+json" -d @CreateProcessInstanceRequest.json https://127.0.0.1:7777
curl -X POST --http2 --insecure -H "content-type: application/cloudevents+json" -d @TopologyRequest.json https://127.0.0.1:7777
