import { ApolloServer } from 'apollo-server-lambda'
import { Context } from 'apollo-server-core'
import {ApplicantResolver} from './resolvers/applicants'
import depthLimit from 'graphql-depth-limit'
import * as Sentry from '@sentry/node'
import DataLoader from 'dataloader'
import 'reflect-metadata'
import {buildSchema} from 'type-graphql'
import { handleContext } from './utils/handle.context'
import { formatError } from './utils/format.errors'

if (process.env.NODE_ENV !== 'development') {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    release: process.env.APP_VERSION,
    environment: process.env.APP_ENV,
  })
}

export type ServerDataLoader = {
  configurationLoader: DataLoader<string, any, string>
  propertyLoader: DataLoader<string, any, string>
  officeLoader: DataLoader<string, any, string>
  negotiatorLoader: DataLoader<string, any, string>
}

export type ServerContext = Context<{ traceId: string; authorization: string; dataLoader: ServerDataLoader }>

export const graphqlHandler = async () => {

  const schema = await buildSchema({
    resolvers: [
      ApplicantResolver,
    ],
  });

  const server = new ApolloServer({
    schema,
    resolvers: [ApplicantResolver],
    playground: true,
    introspection: true,
    formatError,
    uploads: false,
    context: handleContext,
    validationRules: [depthLimit(10)],
  })

  return server.createHandler({
    cors: {
      origin: '*',
      credentials: true,
    },
  })
}
