# HA Proxy on AWS Stack

## Overview
This is an example of how to define some simple infrastructure in AWS to support
haproxy served on kubernetes.

A CDK stack compromising of a VPC, Elastic Container Repository and Elastic Kubernetes Service are
described in `/bin` and `/lib`.

Kubernetes deployment and service definitions are in `/kubernetes`.

A docker image for haproxy is available in `/docker`.

## Out of scope
* Monitoring of EKS (use cloudwatch alarms as a starting point)
    * More advanced monitoring solutions are available eg datadog, grafana etc
* AWS Load balancer
    * A network load balancer would be suitable unless using a fargate deployment
    then only application load balancers are allowed.
    * EKS supports creating load balancers through annotating the service eg
    * service.beta.kubernetes.io/aws-load-balancer-type: nlb
