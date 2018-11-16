<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [OpenFaaS - Serverless Functions Made Simple¶](#openfaas---serverless-functions-made-simple%C2%B6)
  - [Install Minikube](#install-minikube)
  - [Install faas-netes manually (alternatively via helm)](#install-faas-netes-manually-alternatively-via-helm)
  - [Open OpenFaaS UI and Minikube dashboard](#open-openfaas-ui-and-minikube-dashboard)
  - [Install OpenFaaS CLI via shell or homebrew](#install-openfaas-cli-via-shell-or-homebrew)
  - [Deploy an invoke new function](#deploy-an-invoke-new-function)
  - [Interact with REST API](#interact-with-rest-api)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# OpenFaaS - Serverless Functions Made Simple¶

[Intro](https://docs.openfaas.com/)

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

* Deploy from Store, pick https://github.com/faas-and-furious/figlet, invoke via Text, get ASCII back (codebase is [here](https://github.com/faas-and-furious/figlet)) 
* Deploy manually use Docker Image `templum/functions-base64` from  [Dockerhub](https://hub.docker.com/r/templum/functions-base64/) (codebase is [here](https://github.com/Templum/OpenFaaS-CI))
* Sample request for base64 function: `{"encode":true,"text":"hase"}`
* [Node info function ](https://github.com/openfaas/faas/tree/master/sample-functions/NodeInfo)

    $ curl http://192.168.64.4:31112/function/nodeinfo
    Hostname: nodeinfo-546584dd67-7qmsc

    Platform: linux
    Arch: x64
    CPU count: 2
    Uptime: 5134

## Interact with REST API

[Exploring or editing the Swagger API documentation](https://github.com/openfaas/faas/tree/master/api-docs)

Useful system APIs

    $ curl http://192.168.64.4:31112/system/info
    $ curl http://192.168.64.4:31112/system/functions


