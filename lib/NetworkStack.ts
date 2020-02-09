import * as cdk from '@aws-cdk/core';
import { Vpc } from '@aws-cdk/aws-ec2';

/*
This is probably all we need for a VPC. The default CDK VPC construct creates a VPC, Internet Gateway
and three subnets a public (internet addressable), private (not addressable but has outbound
internet connectivity) and a isolated subnet (not addressable or having internet connectivity -
good for managed services like aurora databases).
 */
export class NetworkStack extends cdk.Stack {
  public readonly vpc: Vpc;

  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create a VPC
    this.vpc = new Vpc(this, 'Vpc');

    /*
    The equivalent terraform to create a VPC, IG and single subnet would be

    resource "aws_vpc" "default" {
      cidr_block           = "20.0.0.0/16"
      enable_dns_hostnames = true
    }
    resource "aws_subnet" "public_subnet" {
      vpc_id                  = "${aws_vpc.default.id}"
      cidr_block              = "20.0.0.0/24"
      map_public_ip_on_launch = true
    }
    resource "aws_internet_gateway" "gw" {
      vpc_id = "${aws_vpc.default.id}"
    }
    resource "aws_route_table" "r" {
      vpc_id = "${aws_vpc.default.id}"
      route {
        cidr_block = "0.0.0.0/0"
        gateway_id = "${aws_internet_gateway.gw.id}"
      }
    }
    resource "aws_route_table_association" "a" {
      subnet_id      = "${aws_subnet.public_subnet.id}"
      route_table_id = "${aws_route_table.r.id}"
    }
     */
  }
}
