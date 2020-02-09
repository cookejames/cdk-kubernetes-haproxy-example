# HA Proxy on AWS Stack

## Overview
This is an example of how to define some simple infrastructure in AWS to support
haproxy served on kubernetes.

A CDK stack compromising of a VPC, Elastic Container Repository and Elastic Kubernetes Service are
described in `/bin` and `/lib`.

Kubernetes deployment and service definitions are in `/kubernetes`.

A docker image for haproxy is available in `/docker`.

## Deployment pipeline steps

1) Deploy the AWS infrastructure using the AWS CDK.
1) Build haproxy docker image.
2) Push haproxy docker image to our ECR respository.
    * The image path could be hard coded if this will only ever be deployed to
    one region otherwise we will have to pull in the current account details and 
    build up a repository URL or add a URL output to the ECR stack.
4) Using kubectl deploy the haproxy deployment and service

## Out of scope
* Monitoring of EKS (use cloudwatch alarms as a starting point)
    * More advanced monitoring solutions are available eg datadog, grafana etc
* AWS Load balancer
    * A network load balancer would be suitable unless using a fargate deployment
    then only application load balancers are allowed.
    * EKS supports creating load balancers through annotating the service eg
    * service.beta.kubernetes.io/aws-load-balancer-type: nlb
* Service discovery
    * Kubernetes provides a mechanism for service discovery by default however
    our application might not live in the cluster