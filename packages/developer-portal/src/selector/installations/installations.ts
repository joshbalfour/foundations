import { ReduxState, FormState } from '@/types/core'
import { InstallationModel, InstallationModelPagedResult } from '@reapit/foundations-ts-definitions'

export const selectInstallationsListLoading = (state: ReduxState): boolean => {
  return state.installations.installationsList.isLoading
}

export const selectInstallationFormState = (state: ReduxState): FormState => {
  return state.installations.formState.state
}

export const selectInstallationsListData = (state: ReduxState): InstallationModel[] => {
  return state.installations.installationsList?.list?.data || []
}

export const selectSboxInstallation = (state: ReduxState): InstallationModel | undefined =>
  state.installations.installationsList?.list?.data?.find((installation) => installation.customerId === 'SBOX')

export const selectInstallationsFilterListData = (state: ReduxState): InstallationModel[] => {
  return state.installations.installationsFilterList?.list?.data || []
}

export const selectInstallationsFilterList = (state: ReduxState): InstallationModelPagedResult | null => {
  return state.installations.installationsFilterList?.list
}

export const selectInstallationsFilterLoading = (state: ReduxState): boolean => {
  return state.installations.installationsFilterList?.isLoading
}

export const selectInstallationsLoading = (state: ReduxState): boolean => {
  return state.installations.installationsList?.isLoading
}
