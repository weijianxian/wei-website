'use client'

import { SetuController, SetuShower } from '@/components/setu'
import { getSetu } from '@/lib/setu'
import { SetuData, SetuParams } from '@/types/setu'
import { useCallback, useState } from 'react'
import { toast } from 'react-toastify'

export default function SetuPage() {
  const [data, setData] = useState<SetuData[]>()

  const fetchData = useCallback(async (params: SetuParams) => {
    try {
      const data = await getSetu(params)
      setData(data)
      toast.success('获取数据成功')
    } catch (err: unknown) {
      const error = err as Error

      console.error('Error fetching data:', error)
      toast.error('获取数据失败: ' + error.message)
    } finally {
    }
  }, [])

  return (
    <>
      <SetuController
        onSearch={fetchData}
        initialParams={{
          num: 20,
        }}
      />
      <SetuShower data={data} />
    </>
  )
}
