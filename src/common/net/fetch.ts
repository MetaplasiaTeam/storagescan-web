export type FetchOptions = {
  method?: string
  headers?: any
  credentials?: 'include' | 'omit' | 'same-origin'
  body?: any
  mode?: 'cors' | 'no-cors' | 'same-origin' | 'navigate'
  returnType?: 'json' | 'text' | 'origin'
}

interface InterceptorHooks {
  requestInterceptor: (options: FetchOptions) => FetchOptions
  requestInterceptorCatch: (error: any) => any
  responseInterceptor: (response: Response, options: FetchOptions) => Response
  responseInterceptorCatch: (error: any) => any
}

const contentType = {
  json: 'application/json',
  form: 'application/x-www-form-urlencoded',
  download: 'application/octet-stream',
}

const baseOptions = {
  method: 'GET',
  headers: {
    'Content-Type': contentType.json,
  },
  credentials: 'same-origin',
  mode: 'cors',
  returnType: 'json',
}

export let interceptorHooks: InterceptorHooks = {
  requestInterceptor: (options: FetchOptions) => {
    return options
  },
  requestInterceptorCatch: (error: any) => {
    return error
  },
  responseInterceptor: (response: Response, options: FetchOptions) => {
    return response
  },
  responseInterceptorCatch: (error: any) => {
    return error
  },
}

async function baseFetch<T>(url: string, options: FetchOptions) {
  options = Object.assign(baseOptions, options)

  const { method, body } = options

  if (method === 'GET') {
    const paramsArray: string[] = []
    Object.keys(body).forEach((key) =>
      paramsArray.push(key + '=' + encodeURIComponent(body[key]))
    )
    if (url.search(/\?/) === -1) {
      url += '?' + paramsArray.join('&')
    } else {
      url += '&' + paramsArray.join('&')
    }
    delete options.body
  }

  return new Promise<T>(function (resolve, reject) {
    fetch(url, options)
      .then((res) => {
        const result = interceptorHooks.responseInterceptor(res, options)
        let data: any
        switch (options.returnType) {
          case 'json':
            data = result.json().then((data) => data.data)
            break
          case 'text':
            data = result.text()
            break
          case 'origin':
            data = result
            break
        }
        resolve(data)
      })
      .catch((err) => {
        const error = interceptorHooks.responseInterceptorCatch(err)
        reject(error)
      })
  })
}

export const get = <T = any>(url: string, params: any) => {
  return baseFetch<T>(url, { body: params })
}

export const post = <T = any>(url: string, params: any) => {
  return baseFetch<T>(url, {
    method: 'POST',
    body: JSON.stringify(params),
  })
}

export const put = <T = any>(url: string, params: any) => {
  return baseFetch<T>(url, {
    method: 'PUT',
    body: JSON.stringify(params),
  })
}
