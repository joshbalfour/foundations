import React, { useState, SetStateAction } from 'react'
import { H3, Table, getDate, Loader } from '@reapit/elements'
import { selectDeveloperId } from '@/selector/auth'
import { useSelector, useDispatch } from 'react-redux'
import { developerFetchSubscriptions, developerDeleteSubscription } from '@/actions/developer'
import { selectSubscriptions, selectSubscriptionsLoading } from '@/selector'
import styles from '@/styles/elements/link.scss?mod'
import { SubscriptionModel } from '@/services/subscriptions'
import { Dispatch } from 'redux'
import ConfirmModal from './delete-confirm'

export const TimeCell = ({ cell: { value } }) => <p>{getDate(value)}</p>
export const StatusCell = ({ cell: { value } }) => <p>{value ? 'Cancelled' : 'Active'}</p>

export const columns = [
  {
    Header: 'Type',
    accessor: 'type',
    columnProps: {
      className: 'capitalize',
    },
  },
  {
    Header: 'Summary',
    accessor: 'summary',
  },
  {
    Header: 'Start Date',
    accessor: 'created',
    Cell: TimeCell,
  },
  {
    Header: 'Renewal Date',
    accessor: 'renews',
    Cell: TimeCell,
  },
  {
    Header: 'Frequency',
    accessor: 'frequency',
    columnProps: {
      className: 'capitalize',
    },
  },
  {
    Header: 'Cost',
    accessor: 'cost',
  },
  {
    Header: 'Status',
    accessor: 'cancelled',
    Cell: StatusCell,
  },
  {
    accessor: 'cancel',
    columnProps: {
      width: '60px',
    },
  },
]

export const genarateTableData = (subscriptions: SubscriptionModel[] = [], onCancel) => {
  return subscriptions.map(subscription => ({
    ...subscription,
    cancel: !subscription.cancelled && (
      <a className={styles.hyperlinked} data-test="button-cancel" onClick={() => onCancel(subscription.id)}>
        Cancel
      </a>
    ),
  }))
}

export const handleFetchSubscriptions = (dispatch: Dispatch, developerId: string) => () => {
  dispatch(developerFetchSubscriptions({ developerId }))
}

export const handleDeleteSubscription = (dispatch: Dispatch, id: string, handleCloseModal: () => void) => () => {
  dispatch(developerDeleteSubscription(id))
  handleCloseModal()
}

export const handleOpenConfirmModal = (
  setIsConfirmModalOpen: React.Dispatch<SetStateAction<boolean>>,
  setSubscriptionIdToCancel: React.Dispatch<SetStateAction<string>>,
) => (id: string) => {
  setIsConfirmModalOpen(true)
  setSubscriptionIdToCancel(id)
}

export const handleCloseConfirmModal = setIsConfirmModalOpen => () => {
  setIsConfirmModalOpen(false)
}

export const Subcriptions: React.FC = () => {
  const dispatch = useDispatch()

  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)
  const [subscriptionIdToCancel, setSubscriptionIdToCancel] = useState('')

  const handleCloseModal = handleCloseConfirmModal(setIsConfirmModalOpen)

  const subscriptions = useSelector(selectSubscriptions)
  const loading = useSelector(selectSubscriptionsLoading)
  const developerId = useSelector(selectDeveloperId) || ''

  React.useEffect(handleFetchSubscriptions(dispatch, developerId), [dispatch, developerId])

  const { data } = subscriptions
  const subscriptionsData = genarateTableData(
    data,
    handleOpenConfirmModal(setIsConfirmModalOpen, setSubscriptionIdToCancel),
  )

  return (
    <div>
      <H3>Subscriptions</H3>
      {loading ? <Loader /> : <Table scrollable columns={columns} data={subscriptionsData} loading={false} bordered />}
      <ConfirmModal
        visible={isConfirmModalOpen}
        title="Cancel Confirm"
        subtitle="Are you sure to cancel this subscription?"
        onCancel={handleCloseModal}
        onConfirm={handleDeleteSubscription(dispatch, subscriptionIdToCancel, handleCloseModal)}
      />
    </div>
  )
}

export default Subcriptions
