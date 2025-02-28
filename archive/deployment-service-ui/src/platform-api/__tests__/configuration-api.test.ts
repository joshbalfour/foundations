import { configurationApiKeyApiService } from '../configuration-api'
import { ApiKeyEntityType, ApiKeyInterface } from '@reapit/foundations-ts-definitions'
import { mockBrowserSession } from '../__mocks__/session'
import { fetcher } from '@reapit/utils-common'

jest.mock('@reapit/utils-common')

const mockedFetch = fetcher as jest.Mock
const mockConfigurationAppointments = [
  {
    id: 'some-uuid',
    apiKey: 'another-uuid',
    keyExpiresAt: new Date().toISOString(),
    keyCreatedAt: new Date().toISOString(),
    entityType: ApiKeyEntityType.DEPLOYMENT,
  },
] as (ApiKeyInterface & { id: string })[]

describe('configurationApiKeyApiService', () => {
  it('should return a response from the config service', async () => {
    mockedFetch.mockReturnValueOnce({ items: mockConfigurationAppointments })
    expect(await configurationApiKeyApiService(mockBrowserSession)).toEqual(mockConfigurationAppointments)
    expect(fetcher).toHaveBeenCalledTimes(1)
  })

  it('should catch an error if no response from config service', async () => {
    const errorSpy = jest.spyOn(console, 'error')
    mockedFetch.mockReturnValueOnce(undefined as any)
    await configurationApiKeyApiService(mockBrowserSession)
    expect(errorSpy).toHaveBeenCalledWith(
      'Error fetching Configuration Appointment Types',
      'No response returned by API',
    )
  })
})
