#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { AwsAppStack } from '../lib/aws-app-stack';

const app = new cdk.App();
new AwsAppStack(app, 'AwsAppStack');
