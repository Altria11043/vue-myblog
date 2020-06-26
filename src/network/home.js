import {request} from './request'

export function getUserList(data) {
  return request({
    url: '/user/list',
    method: 'post',
    data: {
      content: data.content,
      startDate: data.startDate,
      endDate: data.endDate
    }
  })
}

export function getUserByid(id) {
  return request({
    url: '/user/id',
    params: {
      id
    }
  })
}

export function updateById(user) {
  return request({
    url: '/user/update',
    method: 'post',
    data: {
      id: user.id,
      userName: user.userName,
      email: user.email,
      phone: user.phone,
      photo: user.photo,
      comment: user.comment,
      status: user.status
    }
  })
}

export function addUser(user) {
  return request({
    url: '/user/add',
    method: 'post',
    data: {
      id: user.id,
      userName: user.userName,
      password: user.password,
      email: user.email,
      phone: user.phone,
      photo: user.photo,
      comment: user.comment,
      status: user.status
    }
  })
}

export function delectByid(id) {
  return request({
    url: '/user/delect',
    method: 'post',
    params: {
      id
    },

  })
}

// 获取到上传文件的签名
export function getOSSPolicy() {
  return request({
    url: '/myblog/oss'
  })
}

export function addRelease(data) {
  return request({
    url: '/release/add',
    method: 'post',
    data: {
      content: data.content,
      state: data.state,
      listTag: data.listTag,
      title: data.title
    }
  })
}

// 获取到标题和标签
export function getTitleAndTag() {
  return request({
    url: '/release/getTitleAndTag'
  })
}
// 获取到标题和标签
export function getReleaseTable() {
  return request({
    url: '/release/getReleaseTable'
  })
}

// 获取文章内容
export function getRelease(Id) {
  return request({
    url: '/release/get',
    params: {
      Id
    }
  })
}

export function updateRelease(data) {
  return request({
    url: '/release/update',
    method: 'post',
    data: {
      content: data.content,
      state: data.state,
      listTag: data.listTag,
      title: data.title
    }
  })
}

export function login(data) {
  return request({
    url: '/login',
    method: 'post',
    data: {
      name: data.name,
      pass: data.pass,
      kap: data.kap
    }
  })
}

// 获取文章内容
export function getKaptcha(t) {
  return request({
    url: '/kaptcha',
    method: 'post',
    params: {
      t
    }
  })
}
// 获取文章内容
export function getSession() {
  return request({
    url: '/get/session',
  })
}
// 获取用户头像
export function getPhoto() {
  return request({
    url: '/user/photo',
  })
}
// 用户退出
export function clearSession() {
  return request({
    url: '/clear/session',
  })
}