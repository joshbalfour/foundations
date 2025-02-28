import React, { Dispatch, FC, SetStateAction } from 'react'
import { ExtendedAppointmentModel } from '../../../types/global'
import { ListItemModel } from '@reapit/foundations-ts-definitions'
import { AppState } from '../../../core/app-state'
import { AttendeeItem } from './attendee-item'
import { PropertyItem } from './property-item'
import { ContactDrawerType } from '../contact-drawer'
import { VendorItem } from './vendor-item'
import { LandlordItem } from './landlord-item'

export type RenderIconItemsProps = {
  appointment: ExtendedAppointmentModel
}

export type AppointmentTileProps = {
  appointment: ExtendedAppointmentModel
  nextAppointment?: ExtendedAppointmentModel
}

export type RenderModalTitleParams = {
  appointmentType?: ListItemModel
  heading: string
}

export const handleOpenContactDrawer =
  (
    setAppState: Dispatch<SetStateAction<AppState>>,
    appointment: ExtendedAppointmentModel,
    contactDrawerType: ContactDrawerType,
    contactId: string | null,
  ) =>
  () => {
    const isDeskop = Boolean(window['__REAPIT_MARKETPLACE_GLOBALS__'])
    setAppState((currentState) => ({
      ...currentState,
      appointment,
      appointmentId: appointment.id ?? null,
      contactDrawerOpen: isDeskop ? false : true,
      contactDrawerType,
      contactId,
    }))

    if (isDeskop && contactId) {
      const entity = contactDrawerType === ContactDrawerType.PROPERTY ? 'properties' : 'contacts'
      window.location.href = `agencycloud://${entity}/${contactId}`
    }
  }

export const AppointmentItems: FC<RenderIconItemsProps> = ({ appointment }) => {
  return (
    <>
      <PropertyItem appointment={appointment} />
      <AttendeeItem appointment={appointment} />
      <VendorItem appointment={appointment} />
      <LandlordItem appointment={appointment} />
    </>
  )
}
