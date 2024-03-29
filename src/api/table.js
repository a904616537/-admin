import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/code/code',
    method: 'get',
    params
  })
}

export function delivery(data) {
  return request({
    url: '/code/delivery',
    method: 'put',
    data
  })
}
