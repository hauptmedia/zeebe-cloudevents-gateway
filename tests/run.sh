#!/bin/sh

ENDPOINT=https://127.0.0.1:8080

echo
echo "HTTP/1.1 Tests"
curl -X POST --http1.1 --insecure -H "content-type: application/cloudevents+json" -d @DeployResourceRequest.json ${ENDPOINT}
curl -X POST --http1.1 --insecure -H "content-type: application/cloudevents+json" -d @CreateProcessInstanceRequest.json ${ENDPOINT}
curl -X POST --http1.1 --insecure -H "content-type: application/cloudevents+json" -d @TopologyRequest.json ${ENDPOINT}

echo
echo "HTTP/2 Tests"
curl -X POST --http2 --insecure -H "content-type: application/cloudevents+json" -d @DeployResourceRequest.json ${ENDPOINT}
curl -X POST --http2 --insecure -H "content-type: application/cloudevents+json" -d @CreateProcessInstanceRequest.json ${ENDPOINT}
curl -X POST --http2 --insecure -H "content-type: application/cloudevents+json" -d @TopologyRequest.json ${ENDPOINT}