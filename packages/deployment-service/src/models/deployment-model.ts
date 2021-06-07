import { attribute, autoGeneratedHashKey, table } from '@aws/dynamodb-data-mapper-annotations'
import { TABLE_NAMES } from '@/constants'
import { AppTypeEnum, PackageManagerEnum } from '../dto'

@table(TABLE_NAMES.DEPLOYMENT)
export class DeploymentModel {
  @autoGeneratedHashKey()
  id?: string

  @attribute()
  name?: string

  @attribute({ defaultProvider: () => new Date() })
  created?: string

  @attribute({ defaultProvider: () => new Date() })
  modified?: string

  @attribute()
  developerId?: string

  @attribute()
  appType?: AppTypeEnum

  @attribute()
  buildCommand?: string = 'build'

  @attribute({ defaultProvider: () => PackageManagerEnum.YARN })
  packageManager?: PackageManagerEnum

  @attribute()
  repository?: string
}
