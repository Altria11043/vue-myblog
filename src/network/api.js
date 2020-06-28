import http from './http'
/**
 *  @parms resquest 请求地址 例如：http://197.82.15.15:8088/request/...
 *  @param '/testIp'代表vue-cil中config，index.js中配置的代理
 */
let resquest = "/testIp/request/"

// get请求
export function getListAPI(params){
    return http.get(`${resquest}/getList.json`,params)
}
// post请求
export function postFormAPI(params){
    return http.post(`${resquest}/postForm.json`,params)
}
// put 请求
export function putSomeAPI(params){
    return http.put(`${resquest}/putSome.json`,params)
}
// delete 请求
export function deleteListAPI(params){
    return http.delete(`${resquest}/deleteList.json`,params)
}

// 查询用户列表
export function getUserList(data) {
  return http.get('/user/list', data)
}
// 删除用户
export function delectByid(id) {
  return http.post('/user/delect', id)
}
// 新增用户
export function addUser(user) {
  return http.post('/user/add', user)
}
// 编辑用户
export function updateById(user) {
  return http.post('/user/update', user)
}
// 通过id查询用户信息
export function getUserByid(data) {
  return http.get('/user/id', data)
}

// 文章
// 获取到文章基本数据
export function getTitleAndTag() {
  return http.get('/release/getTitleAndTag')
}
// 获取到文章的基本数据
export function getReleaseTable(data) {
  return http.get('/release/getReleaseTable', data)
}
// 更改文章状态
export function updataState(data) {
  return http.post('/release/state', data)
}
// 通过id获取到文章
export function getRelease(id) {
  return http.get('/release/get', id)
}
// 新增文章内容
export function addRelease(data) {
  return http.post('/release/add', data)
}
// 编辑文章内容
export function updateRelease(data) {
  return http.post('/release/update', data)
}

// 验证登入
export function login(data) {
  return http.get('/login', data)
}
// 获取session
export function getSession() {
  return http.get('/get/session')
}
// 退出并清理掉session中的数据
export function clearSession() {
  return http.get('/clear/session')
}
// 获取到图片上传的签名
export function getOSSPolicy() {
  return http.get('/myblog/oss')
}