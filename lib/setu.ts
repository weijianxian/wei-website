import { SetuData, SetuParams, SetuResponse } from '@/types/setu'
import { requestWithApifox } from './api_fox_forward'

export async function getSetu(params: SetuParams): Promise<SetuData[]> {
  const response = await requestWithApifox<SetuResponse>({
    url: 'https://api.lolicon.app/setu/v2',
    method: 'POST',
    data: params as Record<string, unknown>,
    timeout: 30000,
  })
  return response.data
}
