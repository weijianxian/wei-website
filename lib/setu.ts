import { request } from '@/lib/http'
import { HttpResponse } from '@/types/http'
import { SetuData, SetuParams } from '@/types/setu'

export async function getSetu(params: SetuParams): Promise<SetuData[]> {
  const response = await request.post<HttpResponse<SetuData[]>>('/api/setu', params, {
    headers: {
      'Content-Type': 'application/json',
    },
  })

  return response.data.data
}
