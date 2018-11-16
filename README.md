[![Build Status](https://travis-ci.org/tillkuhn/yummy-aws.svg?branch=master)](https://travis-ci.org/tillkuhn/openfaas-cheatsheet)

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [OpenFaaS - Serverless Functions Made Simple](#openfaas---serverless-functions-made-simple)
  - [Install Minikube](#install-minikube)
  - [Install faas-netes manually (alternatively via helm)](#install-faas-netes-manually-alternatively-via-helm)
  - [Open OpenFaaS UI and Minikube dashboard](#open-openfaas-ui-and-minikube-dashboard)
  - [Install OpenFaaS CLI via shell or homebrew](#install-openfaas-cli-via-shell-or-homebrew)
  - [Deploy an invoke new function](#deploy-an-invoke-new-function)
  - [Interact with REST API](#interact-with-rest-api)
  - [Develop new function with your favourite template](#develop-new-function-with-your-favourite-template)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# OpenFaaS - Serverless Functions Made Simple

[Read Intro](https://docs.openfaas.com/)

![OpenFaaS UI](/ui.jpg?raw=true)

## Install Minikube

* To install Minikube with hyperkit on Mac see [Minikube on Mac](https://blog.arkey.fr/2018/06/18/minikube-with-hyperkit/)
* Start with `rm -f ~/.minikube/machines/minikube/hyperkit.pid; minikube start --vm-driver hyperkit -v 10` (see https://github.com/kubernetes/minikube/issues/1926)

## Install faas-netes manually (alternatively via helm)

    $ git clone https://github.com/openfaas/faas-netes.git
    $ cd faas-netes && git checkout tags/0.6.3
    $ kubectl apply -f namespaces.yml
    
    $ kc get namespaces|grep faas
    openfaas      Active    2m
    openfaas-fn   Active    2m    

    $ kubectl apply -f ./yaml
    $ kc get all -n openfaas
    NAME                                READY     STATUS    RESTARTS   AGE
    pod/alertmanager-f5b4dfb8b-dv2vd    1/1       Running   0          1m
    pod/gateway-d8477b4b6-sqtgj         2/2       Running   0          1m
    pod/nats-86955fb749-s2kn9           1/1       Running   0          1m
    pod/prometheus-7d78d54b57-snvb2     1/1       Running   0          1m
    pod/queue-worker-8698f5bb78-m94r9   1/1       Running   0          1m

    NAME                   TYPE        CLUSTER-IP       EXTERNAL-IP   PORT(S)          AGE
    service/alertmanager   ClusterIP   10.110.31.216    <none>        9093/TCP         1m
    service/faas-netes     ClusterIP   10.101.239.229   <none>        8081/TCP         1m
    service/gateway        NodePort    10.98.182.47     <none>        8080:31112/TCP   1m
    service/nats           ClusterIP   10.109.197.14    <none>        4222/TCP         1m
    service/prometheus     NodePort    10.101.240.78    <none>        9090:31119/TCP   1m

    NAME                           DESIRED   CURRENT   UP-TO-DATE   AVAILABLE   AGE
    deployment.apps/alertmanager   1         1         1            1           1m
    deployment.apps/gateway        1         1         1            1           1m
    deployment.apps/nats           1         1         1            1           1m
    deployment.apps/prometheus     1         1         1            1           1m
    deployment.apps/queue-worker   1         1         1            1           1m

    NAME                                      DESIRED   CURRENT   READY     AGE
    replicaset.apps/alertmanager-f5b4dfb8b    1         1         1         1m
    replicaset.apps/gateway-d8477b4b6         1         1         1         1m
    replicaset.apps/nats-86955fb749           1         1         1         1m
    replicaset.apps/prometheus-7d78d54b57     1         1         1         1m
    replicaset.apps/queue-worker-8698f5bb78   1         1         1         1m    

## Open OpenFaaS UI and Minikube dashboard

    $ minikube -n openfaas service gateway
    Opening kubernetes service openfaas/gateway in default browser...
    http://192.168.64.4:31112/ui/

    $ minikube dashboard
    Opening http://127.0.0.1:57952/api/v1/namespaces/kube-system/services/http:kubernetes-dashboard:/proxy/ in your default browser...    

 ## Install OpenFaaS CLI via shell or homebrew

    $ curl -sSL https://cli.openfaas.com | sudo sh
    
    $ brew install faas-cli
    $ brew info faas-cli
    faas-cli: stable 0.7.7 (bottled)
    CLI for templating and/or deploying FaaS functions    

 ## Deploy an invoke new function

Deploy from Store, pick https://github.com/faas-and-furious/figlet, invoke via Text, get ASCII back (codebase is [here](https://github.com/faas-and-furious/figlet)) 

Deploy manually use Docker Image `templum/functions-base64` from  [Dockerhub](https://hub.docker.com/r/templum/functions-base64/) (codebase is [here](https://github.com/Templum/OpenFaaS-CI))

Sample request for base64 function: `{"encode":true,"text":"hase"}`

Deploy [Node info function ](https://github.com/openfaas/faas/tree/master/sample-functions/NodeInfo)

    $ curl http://192.168.64.4:31112/function/nodeinfo
    Hostname: nodeinfo-546584dd67-7qmsc

    Platform: linux
    Arch: x64
    CPU count: 2
    Uptime: 5134

Deploy and invoke functions via CLI   

    $ export OPENFAAS_URL=http://192.168.64.4:31112/
    $ faas-cli deploy --image functions/nodeinfo:latest --name nodeinfo --gateway http://192.168.64.4:31112/
    Deployed. 202 Accepted.

    $ faas-cli invoke nodeinfo --gateway http://192.168.64.4:31112/ </dev/null
    Reading from STDIN - hit (Control + D) to stop.
    Hostname: nodeinfo-56778c558b-8tz5c

    Platform: linux
    Arch: x64
    CPU count: 2
    Uptime: 6583

## Interact with REST API

[Exploring or editing the Swagger API documentation](https://github.com/openfaas/faas/tree/master/api-docs)

Useful system APIs

    $ curl http://192.168.64.4:31112/system/info
    $ curl http://192.168.64.4:31112/system/functions

## Develop new function with your favourite template

See https://gist.github.com/Templum/494ccc02c8537553400076e75562d674 and https://github.com/Templum/OpenFaaS-CI

Login to [Dockerhub](https://hub.docker.com/) and use your account as prefix in image urls specified  in the <function>.yml files

    $ faas-cli template pull
    2018/11/16 11:39:07 Attempting to expand templates from https://github.com/openfaas/templates.git
    2018/11/16 11:39:09 Fetched 14 template(s) : [csharp dockerfile go go-armhf java8 node node-arm64 node-armhf php7 python python-armhf python3 python3-armhf ruby] from https://github.com/openfaas/templates.git
    

    $ faas-cli up -f wheather.yml     ## is short for ...
    $ faas-cli build -f wheather.yml && faas-cli push -f wheather.yml && faas-cli deploy wheather.yml
    
Start with node (simple), if you want check out [Java comes to the official OpenFaaS templates](https://blog.alexellis.io/java-comes-to-openfaas/) for Tutorial to create a Java Function  

    $ faas-cli new --lang java8 wheather && cd wheather
    $ tree
    |____gradle
    | |____wrapper
    | | |____gradle-wrapper.jar
    | | |____gradle-wrapper.properties
    |____build.gradle
    |____settings.gradle
    |____src
    | |____test
    | | |____java
    | | | |____HandlerTest.java
    | |____main
    | | |____java
    | | | |____com
    | | | | |____openfaas
    | | | | | |____function
    | | | | | | |____Handler.java
    (...)
    
Invoke deployed function via CLI (or UI) ....
    
    $ echo -n "Mannheim"|faas-cli invoke wheather
    {"location":{"name":"Mannheim","region":"Baden-Wurttemberg","country":"Germany","lat":49.49, (...)
    
## OpenFaaS in CI

[Sample config using Travis](https://github.com/Templum/OpenFaaS-CI/blob/master/.travis.yml) (similar to Gitlab CI)   

## OpenFaaS Serverless Dashboard (Grafana)

https://grafana.com/dashboards/3434
