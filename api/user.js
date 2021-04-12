import { request } from "@/plugins/request";

// 用户登录
export const login = (data) => {
  return request({
    method: 'POST',
    url: '/api/users/login',
    data,
  })
}

// 用户注册
export const register = (data) => {
  return request({
    method: 'POST',
    url: '/api/users',
    data,
  })
}

export const updateUserInfo = (data) => {
  return request({
    method: 'PUT',
    url: '/api/user',
    data
  })
}

export const getProfilesInfo = (data) => {
  return request({
    method: 'GET',
    url: `/api/profiles/${data}`
  })
}

export const followUser = (data) => {
  return request({
    method: 'POST',
    url: `/api/profiles/${data}/follow`
  })
}

export const unFollowUser = (data) => {
  return request({
    method: 'DELETE',
    url: `/api/profiles/${data}/follow`
  })
}