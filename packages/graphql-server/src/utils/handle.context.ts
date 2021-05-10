import { ServerDataLoader } from ".."
import { generateConfigurationLoader } from './../resolvers/configurations/dataloader'
import { generatePropertyLoader } from './../resolvers/properties/dataloader'
import { generateOfficeLoader } from './../resolvers/offices/dataloader'
import { generateNegotiatorLoader } from './../resolvers/negotiators/dataloader'
import logger from './../logger'
import {v4 as uuid} from 'uuid'

export const handleContext = ({ event, context }) => {
  const reapitCustomer = event.headers['reapit-customer'] ?? 'UNKNOWN-CUSTOMER'
  const traceId = `${reapitCustomer}-${uuid()}`
  const isProductionEnv = process.env.NODE_ENV === 'production'
  if (isProductionEnv) {
    logger.info('handleContext', { traceId, event })
  }
  const newContext = {
    traceId: traceId,
    headers: event.headers,
    authorization: event?.headers['reapit-connect-token'] ?? '',
    functionName: context.functionName,
    event,
    context,
  } as any
  const dataLoader = {
    configurationLoader: generateConfigurationLoader(newContext),
    propertyLoader: generatePropertyLoader(newContext),
    officeLoader: generateOfficeLoader(newContext),
    negotiatorLoader: generateNegotiatorLoader(newContext),
  } as ServerDataLoader
  newContext.dataLoader = dataLoader
  return newContext
}
