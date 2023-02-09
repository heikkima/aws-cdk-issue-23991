import { Stack, StackProps } from 'aws-cdk-lib'
import { IManagedPolicy, IPrincipal, ManagedPolicy, Role } from 'aws-cdk-lib/aws-iam'
import { Construct } from 'constructs'

interface Props extends StackProps {
  roleName: string
  rolePrincipal: IPrincipal
  managedPolicies: IManagedPolicy[]
}

export class IamRoleStack extends Stack {
  public readonly role: Role

  constructor(scope: Construct, id: string, props: Props) {
    super(scope, id, props)
    const { managedPolicies, rolePrincipal, roleName } = props

    this.role = new Role(this, 'iamRole', {
      assumedBy: rolePrincipal,
      roleName,
      managedPolicies
    })

    // Static exports
    this.exportValue(this.role.roleArn)
  }
}
