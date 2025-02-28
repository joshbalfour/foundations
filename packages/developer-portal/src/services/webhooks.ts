import { fetcher, setQueryParams } from '@reapit/utils-common'
import { URLS } from './constants'
import { getPlatformHeaders, logger } from '@reapit/utils-react'
import { FetchListCommonParams, FetchByIdCommonParams } from './types'
import { reapitConnectBrowserSession } from '../core/connect-session'
import { WebhookLogsQuery } from '../components/pages/webhooks/webhooks-logs'

// Manual defined Model

export type PagedResultWebhookModel_ = {
  _embedded?: WebhookModel[]
  pageNumber?: number
  pageSize?: number
  pageCount?: number
  totalCount?: number
  _links?: { [key: string]: PagingLinkModel }
}

export type WebhookModel = {
  id?: string
  created?: string
  modified?: string
  applicationId?: string
  url?: string
  description?: string
  topicIds?: string[]
  customerIds?: string[]
  active?: boolean
  ignoreEtagOnlyChanges?: boolean
}

export type PagingLinkModel = {
  href?: string
}

export type CreateWebhookModel = {
  applicationId?: string
  url?: string
  description?: string
  topicIds?: string[]
  customerIds?: string[]
  active?: boolean
}

export type UpdateWebhookModel = {
  url?: string
  description?: string
  topicIds?: string[]
  customerIds?: string[]
  active?: boolean
}

export type PingEndpointModel = {
  topicId?: string
}

export type PagedResultTopicModel_ = {
  _embedded?: TopicModel[]
  pageNumber?: number
  pageSize?: number
  pageCount?: number
  totalCount?: number
  _links?: { [key: string]: PagingLinkModel }
}

export type TopicModel = {
  id?: string
  created?: string
  modified?: string
  name?: string
  description?: string
  url?: string
  active?: boolean
  associatedScope?: string
  example?: string
}

export type CreateTopicModel = {
  id?: string
  name?: string
  description?: string
  url?: string
  associatedScope?: string
  example?: string
}
export type UpdateTopicModel = {
  name?: string
  description?: string
  url?: string
  example?: string
}

export interface WebhookLogModel {
  timeStamp: string
  applicationId: string
  url: string
  payload: string
  topicId: string
  statusCode: number
}

// end manual defined Model

// Subscriptions
export type FetchWebhooksSubscriptionsListParams = FetchListCommonParams & {
  sortBy?: string
  applicationId?: string[]
  active?: boolean
}

export type CreateWebhooksSubscriptionParams = CreateWebhookModel

export type FetchWebhooksSubscriptionByIdParams = FetchByIdCommonParams

export type UpdateWebhooksSubscriptionByIdParams = FetchByIdCommonParams & UpdateWebhookModel

export type DeleteWebhooksSubscriptionByIdParams = FetchByIdCommonParams

export type PingWebhooksByIdParams = FetchByIdCommonParams & PingEndpointModel

// Topics

export type FetchWebhooksTopicsListParams = FetchListCommonParams & {
  sortBy?: string
  applicationId?: string
}

export type CreateWebhooksTopicParams = CreateTopicModel

export type FetchWebhooksTopicByIdParams = FetchByIdCommonParams

export type UpdateWebhooksTopicByIdParams = FetchByIdCommonParams & UpdateTopicModel

// Subscription
export const fetchWebhooksSubscriptionsListApi = async (
  params: FetchWebhooksSubscriptionsListParams,
): Promise<PagedResultWebhookModel_ | void> => {
  try {
    const headers = await getPlatformHeaders(reapitConnectBrowserSession, 'latest')

    if (headers) {
      const response = await fetcher({
        url: `${URLS.webhookSubscriptions}?${setQueryParams(params)}`,
        api: window.reapit.config.platformApiUrl,
        method: 'GET',
        headers,
      })
      return response
    }
  } catch (error) {
    logger(error)
    throw error?.response
  }
}

export const createWebhooksSubscription = async (params: CreateWebhooksSubscriptionParams) => {
  try {
    const headers = await getPlatformHeaders(reapitConnectBrowserSession, 'latest')

    if (headers) {
      const response = await fetcher({
        url: `${URLS.webhookSubscriptions}`,
        api: window.reapit.config.platformApiUrl,
        method: 'POST',
        body: params,
        headers,
      })
      return response
    }
  } catch (error) {
    logger(error)
    throw error?.response
  }
}

export const fetchWebhooksSubscriptionById = async (
  params: FetchWebhooksSubscriptionByIdParams,
): Promise<WebhookModel | void> => {
  try {
    const headers = await getPlatformHeaders(reapitConnectBrowserSession, 'latest')

    if (headers) {
      const { id } = params
      const response = await fetcher({
        url: `${URLS.webhookSubscriptions}/${id}`,
        api: window.reapit.config.platformApiUrl,
        method: 'GET',
        headers,
      })
      return response
    }
  } catch (error) {
    logger(error)
    throw error?.response
  }
}

export const updateWebhooksSubscriptionById = async (params: UpdateWebhooksSubscriptionByIdParams) => {
  try {
    const headers = await getPlatformHeaders(reapitConnectBrowserSession, 'latest')

    if (headers) {
      const { id, ...rest } = params
      const response = await fetcher({
        url: `${URLS.webhookSubscriptions}/${id}`,
        api: window.reapit.config.platformApiUrl,
        method: 'PUT',
        body: rest,
        headers,
      })
      return response
    }
  } catch (error) {
    logger(error)
    throw error?.response
  }
}

export const deleteWebhooksSubscriptionById = async (params: DeleteWebhooksSubscriptionByIdParams) => {
  try {
    const headers = await getPlatformHeaders(reapitConnectBrowserSession, 'latest')

    if (headers) {
      const { id } = params
      const response = await fetcher({
        url: `${URLS.webhookSubscriptions}/${id}`,
        api: window.reapit.config.platformApiUrl,
        method: 'DELETE',
        headers,
      })
      return response
    }
  } catch (error) {
    logger(error)
    throw error?.response
  }
}

export const pingWebhooksById = async (params: PingWebhooksByIdParams) => {
  try {
    const headers = await getPlatformHeaders(reapitConnectBrowserSession, 'latest')

    if (headers) {
      const { id, ...rest } = params
      const response = await fetcher({
        url: `${URLS.webhookSubscriptions}/${id}/ping`,
        api: window.reapit.config.platformApiUrl,
        method: 'POST',
        body: rest,
        headers,
      })
      return response
    }
  } catch (error) {
    logger(error)
    throw error?.response
  }
}

// Topic
export const fetchWebhooksTopicsListApi = async (
  params: FetchWebhooksTopicsListParams,
): Promise<PagedResultTopicModel_ | void> => {
  try {
    const headers = await getPlatformHeaders(reapitConnectBrowserSession, 'latest')

    if (headers) {
      const response = await fetcher({
        url: `${URLS.webhooksTopics}?${setQueryParams(params)}`,
        api: window.reapit.config.platformApiUrl,
        method: 'GET',
        headers,
      })
      return response
    }
  } catch (error) {
    logger(error)
    throw error?.response
  }
}

export const createWebhooksTopic = async (params: CreateWebhooksTopicParams) => {
  try {
    const headers = await getPlatformHeaders(reapitConnectBrowserSession, 'latest')

    if (headers) {
      const response = await fetcher({
        url: `${URLS.webhooksTopics}?${setQueryParams(params)}`,
        api: window.reapit.config.platformApiUrl,
        method: 'POST',
        body: params,
        headers,
      })
      return response
    }
  } catch (error) {
    logger(error)
    throw error?.response
  }
}

export const fetchWebhooksTopicById = async (params: FetchWebhooksTopicByIdParams): Promise<TopicModel | void> => {
  try {
    const headers = await getPlatformHeaders(reapitConnectBrowserSession, 'latest')

    if (headers) {
      const { id } = params
      const response = await fetcher({
        url: `${URLS.webhooksTopics}/${id}`,
        api: window.reapit.config.platformApiUrl,
        method: 'GET',
        headers,
      })
      return response
    }
  } catch (error) {
    logger(error)
    throw error?.response
  }
}
export const updateWebhooksTopicById = async (params: UpdateWebhooksTopicByIdParams) => {
  try {
    const headers = await getPlatformHeaders(reapitConnectBrowserSession, 'latest')

    if (headers) {
      const { id, ...rest } = params
      const response = await fetcher({
        url: `${URLS.webhooksTopics}/${id}`,
        api: window.reapit.config.platformApiUrl,
        method: 'PUT',
        body: rest,
        headers,
      })
      return response
    }
  } catch (error) {
    logger(error)
    throw error?.response
  }
}

export const fetchWebhookLogsApi = async (params: WebhookLogsQuery): Promise<WebhookLogModel[] | void> => {
  try {
    const headers = await getPlatformHeaders(reapitConnectBrowserSession, 'latest')

    if (headers) {
      const response = await fetcher({
        url: `${URLS.webhooksLogs}?${setQueryParams(params)}`,
        api: window.reapit.config.platformApiUrl,
        method: 'GET',
        headers,
      })
      return response
    }
  } catch (error) {
    // Weirdly the API returns a 404 when no logs are returned - this happens a lot so not
    // logging to sentry as is intended behaviour and will get very noisy
    if (error.status !== 404) {
      logger(error)
    }
    throw error?.response
  }
}
