# aws-cdk-issue-23991

## Issue
This repository is created to demonstrate the [aws-cdk issue #23991](https://github.com/aws/aws-cdk/issues/23991)

## Prerequisite
* To replicate the issue we need to have a KMS created already in the AWS account.
  - The alias name of this KMS key needs to be set as `kmsAliasName` parameter value in `./bin/aws-cdk-issue-23991.ts` [file](https://github.com/heikkima/aws-cdk-issue-23991/blob/main/bin/aws-cdk-issue-23991.ts#L11)
* AWS account id needs to be set as `targetAcountId` parameter value in `./bin/aws-cdk-issue-23991.ts` [file](https://github.com/heikkima/aws-cdk-issue-23991/blob/main/bin/aws-cdk-issue-23991.ts#L10)
