import { Stack, StackProps } from 'aws-cdk-lib'
import { Table, AttributeType, BillingMode, TableEncryption } from 'aws-cdk-lib/aws-dynamodb'
import { Role, ManagedPolicy, ServicePrincipal } from 'aws-cdk-lib/aws-iam'
import { Key } from 'aws-cdk-lib/aws-kms'
import { Construct } from 'constructs'

interface Props extends StackProps {
  tableName: string
  dynamoDbDataReadRole: Role
  kmsAliasName: string
  pointInTimeRecovery?: boolean
}

export class DynamoDbStack extends Stack {
  public readonly dynamoDbTable: Table

  constructor(scope: Construct, id: string, props: Props) {
    super(scope, id, props)
    const { tableName, dynamoDbDataReadRole, pointInTimeRecovery, kmsAliasName } = props
  
    const kmsKey = Key.fromLookup(this, 'kms-lookup-alias', { aliasName: kmsAliasName })
    this.dynamoDbTable = new Table(this, 'table', {
      partitionKey: { name: 'id', type: AttributeType.STRING },
      sortKey: { name: 'name', type: AttributeType.STRING },
      billingMode: BillingMode.PAY_PER_REQUEST,
      pointInTimeRecovery,
      encryption: TableEncryption.CUSTOMER_MANAGED,
      encryptionKey: kmsKey,
      tableName
    })

    // Grant access
    this.dynamoDbTable.grantReadData(dynamoDbDataReadRole)
  }
}
