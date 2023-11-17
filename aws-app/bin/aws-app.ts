#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { S3BucketStack } from '../lib/s3-buket-stack';

const app = new cdk.App();

new S3BucketStack(app, 'AwsShopS3Stack');
