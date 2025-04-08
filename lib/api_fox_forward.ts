// 使用apifox代理转发HTTP请求

import axios from 'axios'

/**
 * 使用 Apifox 代理发送请求
 * @param url 目标 URL (不包含查询参数)
 * @param method HTTP 方法
 * @param data 请求体数据
 * @param params URL 参数
 * @param timeout 超时时间(毫秒)
 * @returns 返回响应数据
 */
export async function requestWithApifox<T>({
  url,
  method = 'GET',
  data,
  params,
  timeout = 30000,
}: {
  url: string
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  data?: Record<string, unknown>
  params?: Record<string, string | number | boolean>
  timeout?: number
}) {
  // 构建完整 URL（带查询参数）
  if (params && Object.keys(params).length > 0) {
    const searchParams = new URLSearchParams()

    for (const [key, value] of Object.entries(params)) {
      searchParams.append(key, String(value))
    }

    url = `${url}?${searchParams.toString()}`
  }

  // 发送请求到 Apifox 代理
  const response = await axios.post(
    'https://web-proxy.apifox.cn/api/v1/request',
    data, // 请求体数据
    {
      headers: {
        'api-u': url, // 目标 URL
        'api-o0': `method=${method}, timings=true, timeout=${timeout}, rejectUnauthorized=false, followRedirect=true`,
        'Content-Type': 'application/json',
      },
    },
  )

  // 返回响应数据
  return response.data as T
}
