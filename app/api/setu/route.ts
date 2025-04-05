import { HttpCode, HttpResponse } from '@/types/http'
import { SetuData } from '@/types/setu'
import axios from 'axios'
import { NextResponse } from 'next/server'
export const runtime = 'edge'

export async function POST(body: Request) {
  try {
    // 发送数据到远程API
    const response = await axios.post('https://api.lolicon.app/setu/v2', await body.json(), {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    // 返回数据
    return NextResponse.json({
      code: HttpCode.SUCCESS,
      message: '成功',
      data: response.data.data,
    } as HttpResponse<SetuData[]>)
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error:', error.response?.data)
      switch (error.response?.status) {
        case 429:
          return NextResponse.json({
            code: HttpCode.SERVER_TOO_MANY,
            message: '请求过于频繁',
          } as HttpResponse<[]>)
        default:
          return NextResponse.json({
            code: HttpCode.SERVER_ERROR,
            message: '服务端出现异常',
          } as HttpResponse<[]>)
      }
    }
  }
}
