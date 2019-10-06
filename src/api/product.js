import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/product',
    method: 'get',
    params
  })
}

export function post(data) {
  return request({
    url: '/product',
    method: 'post',
    data
  })
}
