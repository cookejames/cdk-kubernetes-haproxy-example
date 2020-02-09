import * as cdk from '@aws-cdk/core';
import { Repository } from '@aws-cdk/aws-ecr';

/**
 * Create an Elastic Container Repository for our docker images.
 * Access to this repository can be controlled through IAM and would likely be managed
 * through roles assigned to groups in the IAM console.
 */
export class EcrStack extends cdk.Stack {
  public readonly haProxyRepository: Repository;
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    this.haProxyRepository = new Repository(this, 'HaProxyRepository');
    // Cleanup old images that are > 30 days old but not ones with the prod tag
    this.haProxyRepository.addLifecycleRule({ tagPrefixList: ['prod'], maxImageCount: 9999 });
    this.haProxyRepository.addLifecycleRule({ maxImageAge: cdk.Duration.days(30) });
  }
}
