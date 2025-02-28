export const useAppState = jest.fn(() => {
  return {
    appState: {
      currentLat: null,
      currentLng: null,
      hasGeoLocation: false,
      time: 'TODAY',
      travelMode: 'DRIVING',
      destinationLat: null,
      destinationLng: null,
      appointmentId: null,
      appointment: null,
      tab: 'LIST',
      routeInformation: null,
      destinationAddress: null,
      locationAddress: null,
      mapRefs: null,
      locationQueryAddress: null,
      locationQueryResults: [],
      contactDrawerOpen: false,
      contactDrawerType: 'ATTENDEE',
      contactId: null,
      vendors: [],
      landlords: [],
      hasAmlApp: true,
    },
    setAppState: jest.fn(),
  }
})
