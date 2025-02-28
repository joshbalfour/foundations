import React from 'react'
import { shallow } from 'enzyme'
import { RegisterConfirm, handleUseEffect } from '../register-confirm'
import Routes from '@/constants/routes'

jest.mock('react-router-dom', () => ({
  // ...(jest.requireActual('react-router-dom') as Object), // use actual for all non-hook parts
  useLocation: () => ({ location: { search: '?userName=mockUserName@gmail.com&verificationCode=123' } }),
  useHistory: () => ({ replace: jest.fn() }),
}))

jest.mock('@/services/cognito-identity', () => ({
  confirmRegistration: jest.fn().mockResolvedValue('success'),
}))

describe('register-confirm', () => {
  it('should match snapshot', () => {
    const wrapper = shallow(<RegisterConfirm />)
    expect(wrapper).toMatchSnapshot()
  })

  describe('handleUseEffect', () => {
    const mockParams = {
      userName: 'mockUserName@gmail.com',
      verificationCode: '123',
      replace: jest.fn(),
    }
    const replaceSpy = jest.spyOn(mockParams, 'replace')

    it('should call replace on success with correct params', async () => {
      const fn = handleUseEffect(mockParams)
      fn()
      await new Promise((resolve) => resolve(fn()))
      expect(replaceSpy).toHaveBeenCalledWith(`${Routes.LOGIN}?isSuccess=1`)
    })
  })
})
