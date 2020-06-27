import {request} from './request'

export function getUserList(data) {
  return request({
    url: '/user/list',
    params: {
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

// 获取用户头像
export function getPhoto() {
  return request({
    url: '/user/photo',
  })
}


// 获取到标题和标签
export function getTitleAndTag() {
  return request({
    url: '/release/getTitleAndTag'
  })
}
// 获取到标题和标签
export function getReleaseTable(data) {
  return request({
    url: '/release/getReleaseTable',
    params: {
      content: data.content,
      startDate: data.startDate,
      endDate: data.endDate
    }
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

// 编辑文章
export function updateRelease(data) {
  return request({
    url: '/release/update',
    method: 'post',
    data: {
      content: data.content,
      state: data.state,
      listTag: data.listTag,
      title: data.title,
      id: data.id
    }
  })
}
// 更改文章状态
export function updataState(data) {
  return request({
    url: '/release/state',
    method: 'post',
    data: {
      state: data.state,
      id: data.id
    }
  })
}

// 登入验证
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
export function getSession() {
  return request({
    url: '/get/session',
  })
}

// 获取验证码
export function getKaptcha(t) {
  return request({
    url: '/kaptcha',
    method: 'post',
    params: {
      t
    }
  })
}

// 用户退出
export function clearSession() {
  return request({
    url: '/clear/session',
  })
}


// 获取到上传文件的签名
export function getOSSPolicy() {
  return request({
    url: '/myblog/oss'
  })
}