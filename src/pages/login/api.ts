import { request } from '@/api/axios'
export interface LoginRequestData {
    username: string
    password: string
}

export type LoginCodeResponseData = ApiResponseData<string>

export type LoginResponseData = ApiResponseData<{ token: string }>


/** 获取登录验证码 */
export function getLoginCodeApi() {
    return request<LoginCodeResponseData>({
        url: 'login/code',
        method: 'get'
    })
}

/** 登录并返回 Token */
export function loginApi(data: LoginRequestData) {
//     return request<LoginResponseData>({
//         url: 'users/login',
//         method: 'post',
//         data
//     })
    return Promise.resolve({
            data: {
                token: 'token-admin',
                user: {
                    id: 1,
                    username: 'testuser'
                }
            }
        })
}