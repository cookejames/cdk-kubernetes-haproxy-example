import * as cdk from '@aws-cdk/core';
import {InstanceClass, InstanceSize, InstanceType, SubnetType, Vpc} from '@aws-cdk/aws-ec2';
import {Cluster} from '@aws-cdk/aws-eks';

type KubernetesStackProps = {
  vpc: Vpc;
};

/*
 * Create a managed kubernetes cluster with a default capacity of 2 M5.large machines.
 * Place the machines in the private VPC subnet (this creates a cross stack cloudformation reference).
 *
 * In production we would probably use an auto scaling group.
 *
 * I am also skipping adding any bastion hosts for SSH into the nodes. In production I would
 * probably skip this and use the systems manager to connect directly via its agent setup in a boot script
 * with permissions controlled by IAM.
 */
export class KubernetesStack extends cdk.Stack {
  private cluster: Cluster;

  constructor(scope: cdk.Construct, id: string, { vpc, ...props }: cdk.StackProps & KubernetesStackProps) {
    super(scope, id, props);

    this.cluster = new Cluster(this, 'Cluster', {
      vpc, // Place the cluster in our existing VPC
      // Add some default capacity, M instances are general purpose and a good starting place
      defaultCapacity: 2,
      defaultCapacityInstance: InstanceType.of(InstanceClass.M5, InstanceSize.LARGE),
      // Set the subnet selection for the cluster, use the private subnet and spread out of the AZs
      vpcSubnets: [{
        onePerAz: true,
        subnetType: SubnetType.PRIVATE
      }]
    })
  }
}
