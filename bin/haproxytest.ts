#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { HaproxytestStack } from '../lib/haproxytest-stack';

const app = new cdk.App();
new HaproxytestStack(app, 'HaproxytestStack');
