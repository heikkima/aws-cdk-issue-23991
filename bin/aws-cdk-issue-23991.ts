#!/usr/bin/env node
import 'source-map-support/register'
import { App } from 'aws-cdk-lib'
import { ManagedPolicy, ServicePrincipal } from 'aws-cdk-lib/aws-iam'

import { IamRoleStack } from '../lib/iam-role-stack'
import { DynamoDbStack } from '../lib/dynamodb-stack'

// Input parameters
const targetAcountId: string = ''
const kmsAliasName: string = 'alias/my-test-key' // This key needs to be created in the AWS account before hand

if (!targetAcountId) {
  throw new Error('Please provide a value for paramaeter targetAcountId in ./bin/aws-cdk-issue-23991.ts')
}

if (!kmsAliasName) {
  throw new Error('Please provide a value for paramaeter kmsAliasName in ./bin/aws-cdk-issue-23991.ts')
}

// CDK application
const app = new App()
const iamRoleStack = new IamRoleStack(app, 'IamRoleStack', {
  env: { region: 'eu-west-1' },
  stackName: 'cdk-issue-test-iam-role',
  
  managedPolicies: [ManagedPolicy.fromAwsManagedPolicyName('service-role/AWSLambdaBasicExecutionRole')],
  roleName: 'my-test-role',
  rolePrincipal: new ServicePrincipal('lambda.amazonaws.com')
})

new DynamoDbStack(app, 'DynamoDbStack', {
  env: { region: 'eu-west-1', account: targetAcountId },
  stackName: 'cdk-issue-test-dynamodb-table',
  kmsAliasName,
  tableName: 'my-test-dynamo-table',
  dynamoDbDataReadRole: iamRoleStack.role,
})
