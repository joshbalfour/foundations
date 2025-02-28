import * as React from 'react'
import { shallow } from 'enzyme'

import Swagger, { handleOnComplete, fetchInterceptor, InterceptorParams } from '../swagger'

jest.mock('../../../../core/store')
jest.mock('@/utils/session')
jest.mock('swagger-ui-react')
/*
  Skipping Swagger test for now as new version of SwaggerUI fixes a security issue however, introduces an issue where 
  the tests fail because of an old version of core JS. Should re-introduce test when Swagger UI has upgraded CoreJS.
*/
describe('Swagger', () => {
  it('should match a snapshot', () => {
    expect(shallow(<Swagger />)).toMatchSnapshot()
  })

  it('should have a fetchInterceptor that adds a token when the url is not swagger', () => {
    window.reapit.config.platformApiUrl = 'https://some-url.com'
    const request = {
      url: 'https://some-other-url.com/docs',
      headers: {
        'Content-Type': 'application/json',
      },
    } as InterceptorParams
    const token = 'SOME_TOKEN'
    const result = fetchInterceptor(request, token)
    const output = {
      ...request,
      headers: {
        ...request.headers,
        'api-version': '2020-01-31',
        Authorization: `Bearer ${token}`,
      },
    }
    expect(result).toEqual(output)
  })

  it('should have a fetchInterceptor that returns the params when the url is swagger', async () => {
    window.reapit.config.platformApiUrl = 'https://some-url.com'
    const request = {
      url: 'https://some-url.com/docs',
      headers: {
        'Content-Type': 'application/json',
      },
    } as InterceptorParams
    const token = 'SOME_TOKEN'
    const result = await fetchInterceptor(request, token)
    expect(result).toEqual(request)
  })

  it('handles onComplete', () => {
    ;(global as any).document.querySelector = jest.fn(() => ({
      innerHTML: '<span>text</span>',
    }))
    const setLoading = jest.fn()
    const fn = handleOnComplete(setLoading)
    fn()
    const spy = jest.spyOn(document, 'querySelector')
    expect(spy).toBeCalledWith('a[href="https://dev.platform.reapit.cloud/docs"]')
    expect(setLoading).toBeCalledWith(false)
  })
})
