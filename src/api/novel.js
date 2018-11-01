import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/novel/list',
    method: 'get',
    params
  })
}

export function getDetail(id) {
  return request({
    url: '/novel/get/' + id,
    method: 'get'
  })
}

export function guess(params) {
  return request({
    url: '/novel/guess',
    method: 'get',
    params
  })
}

export function addNovel(params) {
  return request({
    url: '/novel/add',
    method: 'post',
    params
  })
}

export function editNovel(params) {
  return request({
    url: '/novel/edit',
    method: 'put',
    params
  })
}

export function disableNovel(id, isdel) {
  return request({
    url: '/novel/modify/' + id + '/' + isdel,
    method: 'post'
  })
}

export function deleteNovel(id) {
  return request({
    url: '/novel/delete/' + id,
    method: 'delete'
  })
}

export function followNovel(novelId, flag) {
  return request({
    url: '/novel/follow/' + novelId + '/' + flag,
    method: 'post'
  })
}
