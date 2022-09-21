
import request from "../utils/request"

/**
 * 登录方法
 */
export const login = (data = {}) => {
  return request({
    url : '/admin/login',
    method : "POST",
    data
  })
}

/**
 * 获取用户信息接口
 * @returns {AxiosPromise}
 */
export const userInfo = () => {
  return request({
    url : '/admin/getUserInfo',
    method : "GET"
  })
}
