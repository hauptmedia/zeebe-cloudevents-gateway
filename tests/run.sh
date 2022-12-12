#!/bin/sh

ENDPOINT=https://127.0.0.1:4444
TESTS="DeployResourceRequest CreateProcessInstanceRequest TopologyRequest ActivateJobsRequest"
echo "HTTP/1.1 Tests"

for testcase in $TESTS; do
  echo
  echo [HTTP/1.1] $testcase
  echo
  curl -X POST --http1.1 --insecure -H "content-type: application/cloudevents+json" -d @$testcase.json ${ENDPOINT}
  echo
  echo
  echo [HTTP/2] $testcase
  echo
  curl -X POST --http2 --insecure -H "content-type: application/cloudevents+json" -d @$testcase.json ${ENDPOINT}
  echo
done
