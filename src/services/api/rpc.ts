import http from '@utils/http.ts'

type Props = {
  e: string
  method: string
  params: any
}

export const rpc = async ({ e, method, params }: Props) => {
  let body = null
  const bodyRequire = ['POST', 'PUT', 'PATCH']
  if (params && bodyRequire.includes(method)) {
    body = JSON.stringify(params)
  }
  //append e to params as a query string
  if (e) {
    params = { ...params, e }
  }
  switch (method) {
    case 'GET':
      return http
        .get('/', {
          params,
        })
        .then((response) => {
          return response.data
        })
    case 'POST':
      return http
        .post('/', body, {
          params,
        })
        .then((response) => {
          return response.data
        })

    case 'PUT':
      return http
        .put('/', body, {
          params,
        })
        .then((response) => {
          return response.data
        })

    case 'PATCH':
      return http
        .patch('/', body, {
          params,
        })
        .then((response) => {
          return response.data
        })

    case 'DELETE':
      return http
        .delete('/', {
          params,
        })
        .then((response) => {
          return response.data
        })

    default:
      return http
        .get('/', {
          params,
        })
        .then((response) => {
          return response.data
        })
  }
}
