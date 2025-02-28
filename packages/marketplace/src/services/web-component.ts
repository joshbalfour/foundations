import { fetcher } from '@reapit/utils-common'
import { getPlatformHeaders, logger } from '@reapit/utils-react'
import { URLS } from './constants'
import { reapitConnectBrowserSession } from '../core/connect-session'

export interface FetchWebComponentConfigParams {
  customerId: string
  applicationId: string
}

export interface UpdateWebComponentConfigParams {
  appId: string
  appointmentLength: number
  appointmentTimeGap: number
  appointmentTypes: any
  customerId: string
  daysOfWeek: string[]
  negotiatorIds: string[]
  // Callback run after update success
  callback?: () => void
}

export type WebComponentConfigResult = {
  appointmentLength: number
  appointmentTimeGap: number
  appointmentTypes: any
  customerId: string
  daysOfWeek: string[]
  negotiatorIds: string[]
} | null

export const fetchWebComponentConfigApi = async (
  params: FetchWebComponentConfigParams,
): Promise<WebComponentConfigResult | void> => {
  try {
    const { customerId, applicationId } = params
    const headers = await getPlatformHeaders(reapitConnectBrowserSession, 'latest')
    if (headers) {
      const response = await fetcher({
        url: `${URLS.webComponentConfig}/${customerId}/${applicationId}`,
        api: window.reapit.config.webComponentConfigApiUrl,
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

export const updateWebComponentConfigApi = async (
  params: UpdateWebComponentConfigParams,
): Promise<WebComponentConfigResult | void> => {
  try {
    const { customerId, appId, ...rest } = params
    const headers = await getPlatformHeaders(reapitConnectBrowserSession, 'latest')
    if (headers) {
      const response = await fetcher({
        url: `${URLS.webComponentConfig}/${customerId}/${appId}`,
        api: window.reapit.config.webComponentConfigApiUrl,
        method: 'PATCH',
        headers,
        body: rest,
      })
      return response
    }
  } catch (error) {
    logger(error)
    throw error?.response
  }
}
