#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { NetworkStack } from '../lib/NetworkStack';
import {KubernetesStack} from "../lib/KubernetesStack";
import {EcrStack} from "../lib/EcrStack";

const app = new cdk.App();
const networkStack = new NetworkStack(app, 'NetworkStack');
new KubernetesStack(app, 'KubernetesStack', {vpc: networkStack.vpc})
new EcrStack(app, 'EcrStack')