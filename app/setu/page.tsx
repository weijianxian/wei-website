'use client'

import { SetuController, SetuShower } from '@/components/setu'
import { getSetu } from '@/lib/setu'
import { SetuData, SetuParams } from '@/types/setu'
import { useCallback, useState } from 'react'
import { toast } from 'react-toastify'

export default function SetuPage() {
  const [data, setData] = useState<SetuData[]>()

  const fetchData = useCallback(async (params: SetuParams) => {
    setData(undefined) // 清空数据
    try {
      const data = await getSetu(params)
      if (data.length === 0) {
        toast.warning('没有找到,你的xp有点奇怪')
      } else {
        setData(data)
        toast.success('获取数据成功')
      }
    } catch (err: unknown) {
      toast.error('获取数据失败: ' + (err as Error).message)
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
