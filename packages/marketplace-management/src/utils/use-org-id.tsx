import React, { createContext, Dispatch, SetStateAction, useContext, useState, ChangeEvent, useEffect, FC } from 'react'
import { useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '../core/connect-session'
import { getUserInfo } from '../services/user'
import { OrganisationGroupMemberModel } from '../types/organisations-schema'
import { MultiSelectOption } from '@reapit/elements'

export interface OrgIdState {
  orgId: string | null
  orgName: string | null
  orgClientId: string | null
  orgIdOptions: MultiSelectOption[]
  orgMembers: OrganisationGroupMemberModel[]
}

export interface OrgIdContextProps {
  orgIdState: OrgIdState
  setOrgIdState: Dispatch<SetStateAction<OrgIdState>>
}

export interface UseOrgIdState {
  orgIdState: OrgIdState
  setOrgIdState: (event: ChangeEvent<HTMLSelectElement>) => void
}

export const OrgIdContext = createContext<OrgIdContextProps>({} as OrgIdContextProps)

const { Provider } = OrgIdContext

export const handleFetchInitialState =
  (setOrgIdState: Dispatch<SetStateAction<OrgIdState>>, orgIdState: OrgIdState, email?: string) => () => {
    const fetchUserInfo = async () => {
      if (email && !orgIdState.orgIdOptions.length) {
        const userInfo = await getUserInfo(email)

        if (!userInfo) return

        const orgMembers = userInfo.organisationGroupMembers ?? []
        const orgIdOptions =
          (orgMembers
            .map(({ name, organisationId }) => ({
              name: name ?? '',
              value: organisationId ?? '',
            }))
            .filter(Boolean) as MultiSelectOption[]) ?? []
        const orgId = orgMembers.length === 1 ? orgMembers[0].organisationId ?? null : null
        const orgName = orgMembers.length === 1 ? orgMembers[0].name ?? null : null
        const orgClientId = orgMembers.length === 1 ? orgMembers[0].customerId ?? null : null

        setOrgIdState({ orgId, orgName, orgClientId, orgIdOptions, orgMembers })
      }
    }

    fetchUserInfo()
  }

export const useOrgId = (): UseOrgIdState => {
  const { orgIdState, setOrgIdState } = useContext(OrgIdContext)
  const { connectClearSession, connectSession } = useReapitConnect(reapitConnectBrowserSession)

  const email = connectSession?.loginIdentity.email

  useEffect(handleFetchInitialState(setOrgIdState, orgIdState, email), [email, orgIdState])

  const handleSetOrgIdState = (event: ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault()
    event.stopPropagation()
    const orgId = event.target.value

    if (orgId) {
      setOrgIdState((currentState: OrgIdState) => {
        const { orgMembers } = currentState
        const org = orgMembers.find((member) => member.organisationId === orgId)

        const orgName = org?.name ?? null
        const orgClientId = org?.customerId ?? null

        return {
          ...currentState,
          orgId,
          orgName,
          orgClientId,
        }
      })

      connectClearSession()
    }
  }

  return {
    orgIdState,
    setOrgIdState: handleSetOrgIdState,
  }
}

export const OrgIdStateProvider: FC = ({ children }) => {
  const [orgIdState, setOrgIdState] = useState<OrgIdState>({
    orgId: null,
    orgName: null,
    orgClientId: null,
    orgIdOptions: [],
    orgMembers: [],
  })

  return (
    <Provider
      value={{
        orgIdState: orgIdState,
        setOrgIdState: setOrgIdState,
      }}
    >
      {children}
    </Provider>
  )
}
