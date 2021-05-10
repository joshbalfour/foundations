import applicantServices from './services'
import { checkPermission } from '../../utils/check-permission'
import logger from '../../logger'
import errors from '../../errors'
import { ServerContext } from '../../index'
import {
  GetApplicantByIdArgs,
  CreateApplicantArgs,
  GetApplicantsArgs,
  UpdateApplicantArgs,
  MutationCreateApplicantReturn,
  MutationUpdateApplicantReturn,
  GetApplicantRelationshipsByIdArgs,
  QueryGetApplicantRelationshipsByIdReturn,
  GetApplicantRelationshipsArgs,
  QueryGetApplicantRelationshipsReturn,
  CreateApplicantRelationshipArgs,
  MutationCreateApplicantRelationshipsReturn,
  DeleteApplicantRelationshipArgs,
  MutationDeleteApplicantRelationshipReturn,
} from './applicants'
import {Query, Mutation} from 'type-graphql'
import { AuthenticationError } from 'apollo-server-errors'
import { PaginationModel, ApplicantModel } from '@/models'

export class ApplicantResolver {
  @Query()
  queryGetApplicantById(
    _: any,
    args: GetApplicantByIdArgs,
    context: ServerContext,
  ): Promise<AuthenticationError | ApplicantModel> {
    const traceId = context.traceId
    logger.info('queryGetApplicantById', { traceId, args })
    const isPermit = checkPermission(context)
    if (!isPermit) {
      return Promise.resolve(errors.generateAuthenticationError(context.traceId))
    }
    return applicantServices.getApplicantById(args, context)
  }

  @Query()
  queryGetApplicants(
    _: any,
    args: GetApplicantsArgs,
    context: ServerContext,
  ): Promise<AuthenticationError | PaginationModel<ApplicantModel>> {
    const traceId = context.traceId
    logger.info('queryGetApplicants', { traceId, args })
    const isPermit = checkPermission(context)
    if (!isPermit) {
      return Promise.resolve(errors.generateAuthenticationError(context.traceId))
    }
    return applicantServices.getApplicants(args, context)
  }
}


export const mutationCreateApplicant = (
  _: any,
  args: CreateApplicantArgs,
  context: ServerContext,
): MutationCreateApplicantReturn => {
  const traceId = context.traceId
  logger.info('mutationCreateApplicant', { traceId, args })
  const isPermit = checkPermission(context)
  if (!isPermit) {
    return errors.generateAuthenticationError(context.traceId)
  }
  return applicantServices.createApplicant(args, context)
}

export const mutationUpdateApplicant = (
  _: any,
  args: UpdateApplicantArgs,
  context: ServerContext,
): MutationUpdateApplicantReturn => {
  const traceId = context.traceId
  logger.info('mutationUpdateApplicant', { traceId, args })
  const isPermit = checkPermission(context)
  if (!isPermit) {
    return errors.generateAuthenticationError(context.traceId)
  }
  return applicantServices.updateApplicant(args, context)
}

export const queryGetApplicantRelationshipById = (
  _: any,
  args: GetApplicantRelationshipsByIdArgs,
  context: ServerContext,
): QueryGetApplicantRelationshipsByIdReturn => {
  const traceId = context.traceId
  logger.info('queryGetApplicantRelationshipById', { traceId, args })
  const isPermit = checkPermission(context)
  if (!isPermit) {
    return errors.generateAuthenticationError(context.traceId)
  }
  return applicantServices.getApplicantRelationshipById(args, context)
}

export const queryGetApplicantRelationships = (
  _: any,
  args: GetApplicantRelationshipsArgs,
  context: ServerContext,
): QueryGetApplicantRelationshipsReturn => {
  const traceId = context.traceId
  logger.info('queryGetApplicantRelationships', { traceId, args })
  const isPermit = checkPermission(context)
  if (!isPermit) {
    return errors.generateAuthenticationError(context.traceId)
  }
  return applicantServices.getApplicantRelationships(args, context)
}

export const mutationCreateApplicantRelationship = (
  _: any,
  args: CreateApplicantRelationshipArgs,
  context: ServerContext,
): MutationCreateApplicantRelationshipsReturn => {
  const traceId = context.traceId
  logger.info('mutationCreateApplicantRelationship', { traceId, args })
  const isPermit = checkPermission(context)
  if (!isPermit) {
    return errors.generateAuthenticationError(context.traceId)
  }
  return applicantServices.createApplicantRelationship(args, context)
}

export const mutationDeleteApplicantRelationship = (
  _: any,
  args: DeleteApplicantRelationshipArgs,
  context: ServerContext,
): MutationDeleteApplicantRelationshipReturn => {
  const traceId = context.traceId
  logger.info('mutationDeleteApplicantRelationship', { traceId, args })
  const isPermit = checkPermission(context)
  if (!isPermit) {
    return errors.generateAuthenticationError(context.traceId)
  }
  return applicantServices.deleteApplicantRelationship(args, context)
}

export default {
  Query: {
    GetApplicantRelationshipById: queryGetApplicantRelationshipById,
    GetApplicantRelationships: queryGetApplicantRelationships,
  },
  Mutation: {
    CreateApplicant: mutationCreateApplicant,
    UpdateApplicant: mutationUpdateApplicant,
    CreateApplicantRelationship: mutationCreateApplicantRelationship,
    DeleteApplicantRelationship: mutationDeleteApplicantRelationship,
  },
}
