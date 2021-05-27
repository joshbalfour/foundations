import { KeyType, ApiKeyInterface } from '@reapit/foundations-ts-definitions'
import { attribute, table, autoGeneratedHashKey } from '@aws/dynamodb-data-mapper-annotations'
import { TABLE_NAMES } from './../constants'
import { v4 as uuid } from 'uuid'

@table(TABLE_NAMES.API_KEY_TABLE)
export class ApiKeyModel implements ApiKeyInterface {
  @autoGeneratedHashKey()
  id?: string

  @attribute({ defaultProvider: () => uuid() })
  apiKey?: string

  @attribute()
  developerId?: string

  @attribute({ defaultProvider: () => new Date().toISOString() })
  keyCreatedAt?: string

  @attribute()
  keyExpiresAt?: string

  @attribute()
  clientCode?: string

  @attribute()
  keyType?: KeyType

  @attribute()
  paymentId?: string
}
