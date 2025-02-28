import * as React from 'react'
import { mount } from 'enzyme'
import AnalyticsUsageModal, { NewUsageComponent } from '../analytics-usage-modal'
import { MessageProvider } from '../../../../context/message-context'

jest.mock('@reapit/connect-session', () => ({
  ReapitConnectBrowserSession: jest.fn(),
  useReapitConnect: () => ({
    connectSession: {
      loginIdentity: {
        developerId: 'SOME_ID',
      },
    },
  }),
}))

jest.mock('formik', () => ({
  useFormikContext: jest.fn(() => ({ values: { monthlyUsageCap: 5 } })),
}))

describe('AnalyticsUsageModal', () => {
  it('should match a snapshot', () => {
    expect(
      mount(
        <MessageProvider>
          <AnalyticsUsageModal visible handleClose={jest.fn()} />
        </MessageProvider>,
      ),
    ).toMatchSnapshot()
  })
})

describe('NewUsageComponent', () => {
  it('should match a snapshot for an updated usage', () => {
    expect(mount(<NewUsageComponent currentSettings={{ monthlyUsageCap: 2 }} />)).toMatchSnapshot()
  })

  it('should match a snapshot for a non-updated usage', () => {
    expect(mount(<NewUsageComponent currentSettings={{ monthlyUsageCap: 5 }} />)).toMatchSnapshot()
  })
})
