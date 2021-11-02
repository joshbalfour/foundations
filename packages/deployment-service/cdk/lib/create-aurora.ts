import { AuroraMysqlEngineVersion, ServerlessCluster, DatabaseClusterEngine } from '@aws-cdk/aws-rds'
import { ISecret } from '@aws-cdk/aws-secretsmanager'
import { ISubnet, Vpc } from '@aws-cdk/aws-ec2'
import { CdkStack } from './cdk-stack'

export const databaseName = 'deployment_service'

export const createAurora = (stack: CdkStack, vpc: Vpc, subnets: ISubnet[]): [ISecret, ServerlessCluster] => {
  const aurora = new ServerlessCluster(stack as any, 'Database', {
    engine: DatabaseClusterEngine.auroraMysql({ version: AuroraMysqlEngineVersion.VER_2_08_1 }),
    vpc,
    vpcSubnets: {
      subnets,
    },
    defaultDatabaseName: databaseName,
  })

  const secretManager = aurora.secret as ISecret

  return [secretManager, aurora]
}
