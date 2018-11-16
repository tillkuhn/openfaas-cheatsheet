# OpenFaaS 

## Install manually (alternatively via helm)

    $ git clone https://github.com/openfaas/faas-netes.git
    $ cd faas-netes && git checkout tags/0.6.3
    $ kubectl apply -f namespaces.yml
    $ kc get namespaces|grep faas
    openfaas      Active    2m
    openfaas-fn   Active    2m    

    $ kubectl apply -f ./yaml
    configmap/alertmanager-config created
    deployment.apps/alertmanager created
    service/alertmanager created
    service/faas-netes created
    deployment.apps/gateway created
    service/gateway created
    deployment.apps/nats created
    service/nats created
    configmap/prometheus-config created
    deployment.apps/prometheus created
    service/prometheus created
    deployment.apps/queue-worker created
    serviceaccount/faas-controller created
    role.rbac.authorization.k8s.io/faas-controller created
    rolebinding.rbac.authorization.k8s.io/faas-controller-fn created

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

## Open OpenFaaS UI

    minikube -n openfaas service gateway
    Opening kubernetes service openfaas/gateway in default browser...
    http://192.168.64.4:31112/ui/

 ## Install OpenFaaS CLI via shell or homebrew

    $ curl -sSL https://cli.openfaas.com | sudo sh
    
    $ brew install faas-cli
    $ brew info faas-cli
    faas-cli: stable 0.7.7 (bottled)
    CLI for templating and/or deploying FaaS functions    