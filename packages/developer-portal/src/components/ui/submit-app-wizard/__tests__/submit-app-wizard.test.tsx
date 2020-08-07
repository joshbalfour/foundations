import React from 'react'
import { SubmitAppWizard, handleSubmit, CustomCreateAppModel } from '../submit-app-wizard'
import { shallow } from 'enzyme'
import { FormikHelpers } from '@reapit/elements'
import AuthFlow from '@/constants/app-auth-flow'

jest.mock('react-redux', () => ({
  useSelector: () => false,
  useDispatch: jest.fn(),
}))

describe('SubmitAppWizard', () => {
  test('handleSubmit should run correctly when authFlow = clientCredentials', () => {
    const dispatch = jest.fn()
    const setWizardStep = jest.fn()
    const values = {
      // should be trimmed, and empty value should be removed
      redirectUris: 'link1 , link2 ,',
      signoutUris: 'link1 , link2 ,',
      authFlow: AuthFlow.CLIENT_SECRET,
      successCallback: expect.any(Function),
    }
    const actions = {
      setErrors: jest.fn(),
      setFieldValue: jest.fn(),
    }
    handleSubmit({
      dispatch,
      setWizardStep,
    })(values, (actions as unknown) as FormikHelpers<CustomCreateAppModel>)
    expect(dispatch).toHaveBeenCalledWith({
      data: {
        authFlow: values.authFlow,
        successCallback: expect.any(Function),
      },
      type: 'CREATE_APP',
    })
  })
  test('handleSubmit should run correctly when authFlow = authorisationCode', () => {
    const dispatch = jest.fn()
    const setWizardStep = jest.fn()
    const values = {
      // should be trimem, and empty value should be removed
      redirectUris: 'link1 , link2 ,',
      signoutUris: 'link1 , link2 ,',
      authFlow: AuthFlow.USER_SESSION,
      successCallback: expect.any(Function),
    }
    const actions = {
      setFieldValue: jest.fn(),
      setErrors: jest.fn(),
    }
    handleSubmit({
      dispatch,
      setWizardStep,
    })(values, (actions as unknown) as FormikHelpers<CustomCreateAppModel>)
    expect(dispatch).toHaveBeenCalledWith({
      data: {
        redirectUris: ['link1', 'link2'],
        signoutUris: ['link1', 'link2'],
        authFlow: AuthFlow.USER_SESSION,
        successCallback: expect.any(Function),
      },
      type: 'CREATE_APP',
    })
  })
  it('should match snapshot when visible = true', () => {
    const mockOnClose = jest.fn()
    const wrapper = shallow(<SubmitAppWizard onClose={mockOnClose} />)
    expect(wrapper).toMatchSnapshot()
  })
})
