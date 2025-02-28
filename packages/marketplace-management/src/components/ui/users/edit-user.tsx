import React, { FC, useCallback } from 'react'
import useSWR from 'swr'
import qs from 'query-string'
import { UserModel, GroupModelPagedResult } from '../../../types/organisations-schema'
import { URLS } from '../../../constants/api'
import { addMemberToGroup, removeMemberFromGroup } from '../../../services/user'
import { toastMessages } from '../../../constants/toast-messages'
import { prepareUserGroupOptions } from '../../../utils/prepare-options'
import {
  BodyText,
  Button,
  ButtonGroup,
  elFadeIn,
  elMb11,
  elP8,
  FormLayout,
  InputWrapFull,
  Loader,
  MultiSelectInput,
  PersistantNotification,
  Subtitle,
  useSnack,
} from '@reapit/elements'
import { cx } from '@linaria/core'
import { useForm } from 'react-hook-form'

export interface EditUserFormProps {
  onComplete: () => void
  orgId: string
  user: UserModel
}

interface UpdateUserModel {
  groupIds: string
}

export const sortAddRemoveGroups = (user: UserModel, groupIds: string) => {
  const currentGroups = user.groups ?? []
  const removeIds = currentGroups.filter((group) => !groupIds.includes(group)).filter(Boolean)
  const addIds = groupIds
    .split(',')
    .filter((group) => !currentGroups.includes(group))
    .filter(Boolean)

  return {
    removeIds,
    addIds,
  }
}

export const onHandleSubmit =
  (onComplete: () => void, user: UserModel, success: (message: string) => void, error: (message: string) => void) =>
  async (params: UpdateUserModel) => {
    const { groupIds } = params
    const userId = user?.id
    if (!user || !userId) return null

    const { removeIds, addIds } = sortAddRemoveGroups(user, groupIds)
    const totalUpdates = removeIds.length + addIds.length

    const updateUserRes = await Promise.all([
      ...removeIds.map((id) => removeMemberFromGroup({ id, userId })),
      ...addIds.map((id) => addMemberToGroup({ id, userId })),
    ])

    const positiveResponses = updateUserRes.filter((res) => Boolean(res))

    if (positiveResponses && positiveResponses.length === totalUpdates) {
      success(toastMessages.CHANGES_SAVE_SUCCESS)

      return onComplete()
    }

    error(toastMessages.FAILED_TO_EDIT_USER)
  }

export const EditUserForm: FC<EditUserFormProps> = ({ onComplete, user, orgId }) => {
  const groupIdQuery = qs.stringify({ id: window.reapit.config.groupIdsWhitelist }, { indices: false })
  const { data } = useSWR<GroupModelPagedResult | undefined>(
    !orgId ? null : `${URLS.USERS_GROUPS}?${groupIdQuery}&pageSize=999&organisationId=${orgId}`,
  )
  const userGroups = user.groups?.filter((group) => window.reapit.config.groupIdsWhitelist.includes(group))
  const { success, error } = useSnack()
  const onSubmit = useCallback(onHandleSubmit(onComplete, user, success, error), [user])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ groupIds: string }>({
    defaultValues: {
      groupIds: userGroups ? userGroups.join(',') : '',
    },
  })

  if (!data) return <Loader />
  const { _embedded: listUserGroup } = data
  const userGroupOptions = prepareUserGroupOptions(listUserGroup ?? [])

  return (
    <form className={elP8} onSubmit={handleSubmit(onSubmit)}>
      <FormLayout className={cx(elFadeIn, elMb11)}>
        <InputWrapFull>
          <Subtitle>Edit User</Subtitle>
          <BodyText hasGreyText>Please use the section below to manage which groups this user belongs to:</BodyText>
        </InputWrapFull>
        <InputWrapFull>
          <MultiSelectInput
            id={`user-groups-ids-${user.id}`}
            noneSelectedLabel="No groups selected for this user"
            defaultValues={userGroups ? [...new Set(userGroups)] : []}
            options={userGroupOptions}
            {...register('groupIds')}
          />
          {errors.groupIds && (
            <PersistantNotification isFullWidth isExpanded intent="danger" isInline>
              {errors.groupIds.message}
            </PersistantNotification>
          )}
        </InputWrapFull>
        <InputWrapFull>
          <ButtonGroup alignment="right">
            <Button intent="secondary" onClick={onComplete} type="button">
              Cancel
            </Button>
            <Button intent="primary" type="submit">
              Submit
            </Button>
          </ButtonGroup>
        </InputWrapFull>
      </FormLayout>
    </form>
  )
}

export default EditUserForm
