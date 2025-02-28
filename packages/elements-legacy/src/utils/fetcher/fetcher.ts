import { FetcherParams } from '../../types/core'

export class FetchError extends Error {
  public name: string
  public status: number

  constructor(public message: string, public response?: Response) {
    super(message)

    Object.setPrototypeOf(this, new.target.prototype) // restore prototype chain
    this.name = (this.constructor as any).name
    this.status = (this.constructor as any).status
    this.message = message

    if (Error.captureStackTrace && typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, this.constructor)
    }

    this.response = response
  }
}

export const genErr = async (res: Response, { method, url }: Partial<FetcherParams<any>>) => {
  const genErrResponse = async () => {
    try {
      const response = await res.json()
      return response
    } catch (err) {
      return res
    }
  }

  const errRes = await genErrResponse()
  const error = new FetchError(
    `Foundations API error: Status: ${res.status} Method: ${method} Path: ${url} ${JSON.stringify(errRes)}`,
  )
  error.status = res.status
  error.response = errRes
  return error
}
/**
 * allow fetch from raw url string (instead of api - base domal, url - path)
 */
export const fetcherWithRawUrl = async <T, B>({
  url,
  method,
  body,
  headers,
}: Omit<FetcherParams<B>, 'api'>): Promise<any | FetchError> => {
  const res = await fetch(url, {
    headers,
    method,
    body: JSON.stringify(body),
  } as RequestInit)

  if (res.status < 400) {
    const jsonRes = await res.json()
    return jsonRes as T
  }

  const err = await genErr(res, { url, method })
  throw err
}

/**
 * return headers of responose
 */
export const fetcherWithReturnHeader = async <B>({
  api,
  url,
  method,
  body,
  headers,
}: FetcherParams<B>): Promise<Headers | FetchError> => {
  const path = `${api}${url}`

  const res = await fetch(path, {
    headers,
    method,
    body: JSON.stringify(body),
  } as RequestInit)

  if (res.status < 400) {
    return res.headers
  }

  const err = await genErr(res, { url, method })
  throw err
}

export const fetcherWithBlob = async <B>({
  api,
  url,
  method,
  body,
  headers,
}: FetcherParams<B>): Promise<Blob | FetchError> => {
  const path = `${api}${url}`

  const res = await fetch(path, {
    headers,
    method,
    body: JSON.stringify(body),
  } as RequestInit)

  if (res.status < 400) {
    try {
      const blob = await res.blob()
      return blob
    } catch (err) {
      const error = new FetchError("Can't convert response to blob. Error:", err.message)
      console.error(error.message)
      throw error
    }
  }

  const err = await genErr(res, { url, method })
  throw err
}

export const fetcher = async <T, B>({
  api,
  url,
  method,
  body,
  headers,
}: FetcherParams<B>): Promise<any | FetchError> => {
  const path = `${api}${url}`

  const res = await fetch(path, {
    headers,
    method,
    body: JSON.stringify(body),
  } as RequestInit)

  if (res.status < 400) {
    try {
      const jsonVal = await res.json()
      return jsonVal as T
    } catch (err) {
      return res.ok
    }
  }

  const err = await genErr(res, { url, method })
  throw err
}
