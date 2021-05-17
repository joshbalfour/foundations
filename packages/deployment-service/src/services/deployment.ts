import { DeploymentDto } from '../dto'
import { DeploymentModel } from '../models'
import { db } from './../core'

export const createDeploymentModel = (dto: DeploymentDto): Promise<DeploymentModel> => {
  return db.put({
    ...dto,
    create: new Date().toISOString(),
    apiKey: '', // TODO solve api key, think every propert on model with key value (or is that GSI I'm thinking of?)
  })
}

export const updateDeploymentModel = (model: DeploymentModel, dto: DeploymentDto): Promise<DeploymentModel> => {
  return db.put({
    ...model,
    ...dto,
    modified: new Date().toISOString(),
    apiKey: '', // TODO solve api key
  })
}

export const deleteDeploymentModel = async (model: DeploymentModel): Promise<void> => {
  await db.delete(model)
}

export const getByKey = (apiKey: string): Promise<DeploymentModel | undefined> => {
  return db.get({
    apiKey,
  })
}

export const batchGet = async (organisationId: string): Promise<DeploymentModel[]> => {
  return db.batchGet() // TODO get by organisation
}
