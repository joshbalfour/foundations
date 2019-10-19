import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import Identification, {
  IdentificationFormValues,
  IDENTIFICATION_FORM_DEFAULT_VALUES
} from '@/components/ui/forms/identification'
import { checkListDetailSecondaryIdUpdateData } from '@/actions/checklist-detail'
import { ReduxState } from '@/types/core'
import {
  selectCheckListDetailContact,
  selectCheckListDetailSecondaryId,
  selectCheckListDetailIsSubmitting,
  selectCheckListDetailSecondaryIdUrl
} from '@/selectors/checklist-detail'
import { checkIsDesktopMode } from '@/selectors/auth'

export const SecondaryIdentification = ({
  contactModel,
  initFormValues,
  loading,
  updateIdentification,
  isDesktopMode
}) => (
  <Identification
    isDesktopMode={isDesktopMode}
    loading={loading}
    initFormValues={initFormValues}
    contactModel={contactModel}
    onSaveHandler={updateIdentification}
  />
)

export const mapStateToProps = (state: ReduxState) => {
  const isSubmitting = selectCheckListDetailIsSubmitting(state)
  const contactModel = selectCheckListDetailContact(state)
  const secondaryIdDocument = selectCheckListDetailSecondaryId(state)
  const secondaryIdUrl = selectCheckListDetailSecondaryIdUrl(state)

  const isDesktopMode = checkIsDesktopMode(state)

  let initFormValues = IDENTIFICATION_FORM_DEFAULT_VALUES

  if (secondaryIdDocument) {
    const { typeId, expiry, details } = secondaryIdDocument

    initFormValues = {
      typeId: typeId || '',
      expiry: expiry ? new Date(expiry) : undefined,
      details: details,
      fileUrl: secondaryIdUrl
    } as IdentificationFormValues
  }

  return {
    loading: isSubmitting,
    contactModel,
    initFormValues,
    isDesktopMode
  }
}

export const mapDispatchToProps = (dispatch: Dispatch) => ({
  updateIdentification: (formValues: IdentificationFormValues) =>
    dispatch(checkListDetailSecondaryIdUpdateData(formValues))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SecondaryIdentification)
