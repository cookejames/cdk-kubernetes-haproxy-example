# HA Proxy on AWS Stack

## Out of scope
* Monitoring of EKS (use cloudwatch alarms as a starting point)
    * More advanced monitoring solutions are available eg datadog, grafana etc
* AWS Load balancer
    * A network load balancer would be suitable unless using a fargate deployment
    then only application load balancers are allowed.
    * EKS supports creating load balancers through annotating the service eg
    * service.beta.kubernetes.io/aws-load-balancer-type: nlb
