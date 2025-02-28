import {
  InstallationModelPagedResult,
  CreateInstallationModel,
  InstallationModel,
  TerminateInstallationModel,
} from '@reapit/foundations-ts-definitions'
import { fetcher, setQueryParams } from '@reapit/utils-common'
import { URLS } from './constants'
import { getPlatformHeaders, logger } from '@reapit/utils-react'
import { FetchListCommonParams } from './types'
import { reapitConnectBrowserSession } from '../core/connect-session'

export type FetchInstallationsListParams = FetchListCommonParams & {
  appId?: string[]
  developerId?: string[]
  clientId?: string[]
  externalAppId?: string[]
  installedDateFrom?: string
  installedDateTo?: string
  uninstalledDateFrom?: string
  uninstalledDateto?: string
  isInstalled?: boolean
}

export type CreateInstallationParams = CreateInstallationModel & {
  callback: () => void
}

export type FetchInstallationByIdParams = {
  installationId: string
}

export type FetchApiKeyInstallationByIdParams = {
  installationId: string
}

export type DeleteApiKeyInstallationById = {
  installationId: string
}

export type RemoveAccessToAppByIdParams = TerminateInstallationModel & {
  installationId: string
  callback: () => void
}

export const fetchInstallationsList = async (
  params: FetchInstallationsListParams,
): Promise<InstallationModelPagedResult | void> => {
  try {
    const headers = await getPlatformHeaders(reapitConnectBrowserSession, 'latest')

    if (headers) {
      const response = await fetcher({
        url: `${URLS.installations}?${setQueryParams(params)}`,
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

export const createInstallation = async (params: CreateInstallationParams) => {
  try {
    const headers = await getPlatformHeaders(reapitConnectBrowserSession, 'latest')

    if (headers) {
      const response = await fetcher({
        url: `${URLS.installations}`,
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

export const fetchInstallationById = async (params: FetchInstallationByIdParams): Promise<InstallationModel | void> => {
  try {
    const { installationId } = params
    const headers = await getPlatformHeaders(reapitConnectBrowserSession, 'latest')

    if (headers) {
      const response = await fetcher({
        url: `${URLS.installations}/${installationId}`,
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

export const fetchApiKeyInstallationById = async (params: FetchApiKeyInstallationByIdParams) => {
  try {
    const { installationId } = params
    const headers = await getPlatformHeaders(reapitConnectBrowserSession, 'latest')

    if (headers) {
      const response = await fetcher({
        url: `${URLS.installations}/${installationId}/apiKey`,
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

export const deleteApiKeyInstallationById = async (params: DeleteApiKeyInstallationById) => {
  try {
    const { installationId } = params
    const headers = await getPlatformHeaders(reapitConnectBrowserSession, 'latest')

    if (headers) {
      const response = await fetcher({
        url: `${URLS.installations}/${installationId}/apiKey`,
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

export const removeAccessToAppById = async (params: RemoveAccessToAppByIdParams) => {
  try {
    const { installationId, ...rest } = params
    const headers = await getPlatformHeaders(reapitConnectBrowserSession, 'latest')

    if (headers) {
      const response = await fetcher({
        url: `${URLS.installations}/${installationId}/terminate`,
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
