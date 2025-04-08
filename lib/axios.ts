// 适用于本应用的后端的API路由的HTTP请求处理函数

import { HttpCode, HttpResponse } from '@/types/http'
import axios, { AxiosError, AxiosResponse } from 'axios'

const request = axios.create()

request.interceptors.response.use(
  response => {
    const { data } = response

    console.log('远程响应原始数据:', data)
    switch (data.code) {
      case HttpCode.SUCCESS:
        return response as AxiosResponse<HttpResponse<unknown>>
      default:
        console.error('Error response:', data)
        return Promise.reject(new Error(data.message))
    }
  },

  (error: AxiosError<unknown, unknown>) => {
    // 处理错误
    if (axios.isAxiosError(error)) {
      console.error('Axios error:', error.response?.data)
    }
    // 必须返回Promise.reject(error)以便继续传递错误
    return Promise.reject(error)
  },
)

export { request }
