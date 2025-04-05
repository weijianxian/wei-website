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
      const newData = await getSetu(params)
      // 合并数据，筛选掉pid_p相同的项目，并只保留最新的100条数据
      setData(
        [...newData, ...(data || [])]
          .filter((item, index, self) => {
            return index === self.findIndex(t => `${t.pid}_${t.p}` === `${item.pid}_${item.p}`)
          })
          .slice(0, 100),
      )
      toast.success(`成功获取到 ${newData.length} 条数据`)
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
