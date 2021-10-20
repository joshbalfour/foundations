import React, { useState, useEffect, useCallback, FC, useMemo } from 'react'
import useSWR from 'swr'
import { useHistory, useLocation } from 'react-router'
import { History } from 'history'
import { OfficeGroupModelPagedResult, OfficeGroupModel } from '../../../types/organisations-schema'
import ErrorBoundary from '@/components/hocs/error-boundary'
import { Loader } from '@reapit/elements'
import { toLocalTime, DATE_TIME_FORMAT } from '@reapit/utils-common'
import Routes from '@/constants/routes'
import { URLS } from '../../../constants/api'
import EditOfficeGroupForm from './office-group-edit-form'
import { orgIdEffectHandler } from '../../../utils/org-id-effect-handler'
import { elFadeIn, elMb11, Pagination, PersistantNotification, RowProps, Table, Title } from '@reapit/elements'
import { OfficeModel } from '@reapit/foundations-ts-definitions'
import { cx } from '@linaria/core'

export interface OfficeGroupWithOfficesModel extends OfficeGroupModel {
  offices?: OfficeModel[]
}

export const onPageChangeHandler = (history: History<any>) => (page: number) => {
  const queryString = `?pageNumber=${page}`
  return history.push(`${Routes.OFFICES_GROUPS}${queryString}`)
}

export const mergeOfficesGroups = (officeModels: OfficeModel[], officeGroupModels: OfficeGroupModel[]) =>
  officeGroupModels.map((group) => {
    const groupIds = group.officeIds?.split(',')
    if (groupIds?.length) {
      const officeModelsMatched = groupIds
        .map((groupId) => officeModels.find((office) => office.id === groupId))
        .filter((office) => !!office)
      return {
        ...group,
        offices: officeModelsMatched,
      }
    }
  }) as OfficeGroupWithOfficesModel[]

export const getOfficeQueryFromGroups = (officeGroupModels?: OfficeGroupModel[]): string => {
  if (!officeGroupModels) return ''
  const officeIds = officeGroupModels
    ?.map((group) => {
      const ids = group?.officeIds?.split(',')
      if (ids?.length) return ids
    })
    .flat()
  return (
    officeIds?.reduce((query, id, index) => {
      return `${query}${index ? '&id' : 'id'}=${id}`
    }, '?') ?? ''
  )
}

export const handleSortTableData =
  (officeGroups: OfficeGroupWithOfficesModel[], offices: OfficeModel[], orgId: string, onComplete: () => void) =>
  (): RowProps[] => {
    return officeGroups.map((officeGroup: OfficeGroupWithOfficesModel) => ({
      cells: [
        {
          label: 'Group Name',
          value: officeGroup.name ?? '',
          narrowTable: {
            showLabel: true,
          },
        },
        {
          label: 'Office List',
          value: officeGroup.offices?.map((office) => office.name).join(', ') ?? '',
          narrowTable: {
            showLabel: true,
          },
        },
        {
          label: 'Last Updated',
          value: toLocalTime(officeGroup.modified ?? officeGroup.created, DATE_TIME_FORMAT.DATE_TIME_FORMAT),
          narrowTable: {
            showLabel: true,
          },
        },
      ],
      expandableContent: {
        content: (
          <EditOfficeGroupForm orgId={orgId} offices={offices} officeGroup={officeGroup} onComplete={onComplete} />
        ),
      },
    }))
  }

const OfficesGroupsTab: FC = () => {
  const history = useHistory()
  const location = useLocation()
  const search = location.search
  const onPageChange = useCallback(onPageChangeHandler(history), [history])
  const [orgId, setOrgId] = useState<string | null>(null)
  const [indexExpandedRow, setIndexExpandedRow] = useState<number | null>(null)

  useEffect(orgIdEffectHandler(orgId, setOrgId), [])

  const { data: officeGroupsResponse, mutate } = useSWR<OfficeGroupModelPagedResult>(
    !orgId
      ? null
      : `${URLS.ORGANISATIONS}/${orgId}${URLS.OFFICES_GROUPS}${search ? search + '&pageSize=12' : '?pageSize=12'}`,
  )

  const officeGroups = officeGroupsResponse?._embedded ?? []
  const totalPageCount = officeGroupsResponse?.totalPageCount ?? 0
  const pageNumber = officeGroupsResponse?.pageNumber ?? 0

  const officeIdsQuery = getOfficeQueryFromGroups(officeGroups)

  const { data: officesResponse } = useSWR<OfficeGroupModelPagedResult>(
    !officeIdsQuery ? null : `${URLS.OFFICES}/${officeIdsQuery ? officeIdsQuery + '&pageSize=999' : '?pageSize=999'}`,
  )

  const offices = officesResponse?._embedded ?? []

  const groupsWithOffices: OfficeGroupWithOfficesModel[] =
    officeGroups.length && offices?.length ? mergeOfficesGroups(offices, officeGroups) : officeGroups

  const onComplete = () => {
    mutate()
    setIndexExpandedRow(null)
  }

  const rows = useMemo(handleSortTableData(groupsWithOffices, offices, orgId ?? '', onComplete), [
    groupsWithOffices,
    offices,
  ])

  return (
    <ErrorBoundary>
      <Title>Office Groups</Title>
      {!officeGroups ? (
        <Loader />
      ) : officeGroups.length ? (
        <>
          <Table
            className={cx(elFadeIn, elMb11)}
            rows={rows}
            indexExpandedRow={indexExpandedRow}
            setIndexExpandedRow={setIndexExpandedRow}
          />
          <Pagination callback={onPageChange} numberPages={totalPageCount} currentPage={pageNumber} />
        </>
      ) : (
        <PersistantNotification isFullWidth isExpanded intent="secondary" isInline>
          No results found for your office groups search
        </PersistantNotification>
      )}
    </ErrorBoundary>
  )
}

export default OfficesGroupsTab
