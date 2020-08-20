import React from 'react'
import { FlexContainerBasic, Table, Section, H5 } from '@reapit/elements'
import SetAsAdminModal from './set-as-admin'
import DisableMemberModal from '@/components/ui/disable-member-modal'
import styles from '@/styles/elements/link.scss?mod'
import { useSelector } from 'react-redux'
import { selectOrganisationMembers, selectOrganisationMembersLoading } from '@/selector/developers'
import { selectCurrentMemberData } from '@/selector/current-member'

export const columns = [
  {
    Header: 'Name',
    accessor: 'name',
  },
  {
    Header: 'Job Title',
    accessor: 'jobTitle',
  },
  {
    Header: 'Email',
    accessor: 'email',
  },
  {
    Header: 'User Account',
    accessor: 'role',
  },
  {
    Header: 'Status',
    accessor: 'status',
  },
  {
    accessor: 'action',
    columnProps: {
      style: { minWidth: '120px' },
    },
  },
]

export const prepareData = (
  data,
  currentUserId,
  handleOpenSetAdminModal,
  setSelectedUser,
  setEditStatusModalVisible,
) => {
  return data.map(user => {
    const ableToSetAdmin = user.role === 'user' && user.status === 'active'
    return {
      ...user,
      action:
        currentUserId !== user.id ? (
          <FlexContainerBasic centerContent flexColumn>
            <a
              className={styles.hyperlinked}
              onClick={openDisableMemberModal(setSelectedUser, setEditStatusModalVisible, user)}
            >
              {user.status === 'inactive' ? 'Invite Again' : 'Disable'}
            </a>
            {ableToSetAdmin && (
              <a
                data-test="button-cancel"
                className={styles.hyperlinked}
                onClick={() => {
                  setSelectedUser(user)
                  handleOpenSetAdminModal()
                }}
              >
                Set as Admin
              </a>
            )}
          </FlexContainerBasic>
        ) : null,
    }
  })
}

export const handleToggleVisibleModal = (setModalOpen: React.Dispatch<boolean>, isVisible: boolean) => () => {
  setModalOpen(isVisible)
}

export const closeDisableMemberModal = (
  setDisableMemberModalVisible: React.Dispatch<React.SetStateAction<boolean>>,
) => () => {
  setDisableMemberModalVisible(false)
}

export const openDisableMemberModal = (setSelectedUser, setDisableMemberModalVisible, user) => () => {
  setSelectedUser(user)
  setDisableMemberModalVisible(true)
}

export const Members: React.FC = () => {
  const [isSetAdminModalOpen, setIsSetAdminModalOpen] = React.useState<boolean>(false)
  const [selectedUser, setSelectedUser] = React.useState<any>(null)
  const [disableMemberModalVisible, setDisableMemberModalVisible] = React.useState<boolean>(false)

  const handleOpenSetAdminModal = handleToggleVisibleModal(setIsSetAdminModalOpen, true)
  const handleCloseSetAdminModal = handleToggleVisibleModal(setIsSetAdminModalOpen, false)

  const currentUser = useSelector(selectCurrentMemberData)
  const currentUserId = currentUser.id

  const loading = useSelector(selectOrganisationMembersLoading)
  const members = useSelector(selectOrganisationMembers)

  const data = prepareData(
    members,
    currentUserId,
    handleOpenSetAdminModal,
    setSelectedUser,
    setDisableMemberModalVisible,
  )
  return (
    <Section>
      <H5>Members</H5>
      <Table scrollable loading={loading} data={data} columns={columns} />
      <DisableMemberModal
        visible={disableMemberModalVisible}
        developer={selectedUser}
        onCancel={closeDisableMemberModal(setDisableMemberModalVisible)}
        onSuccess={closeDisableMemberModal(setDisableMemberModalVisible)}
      />
      <SetAsAdminModal visible={isSetAdminModalOpen} onClose={handleCloseSetAdminModal} user={selectedUser} />
    </Section>
  )
}
