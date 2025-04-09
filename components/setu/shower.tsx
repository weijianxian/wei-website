'use client'
import { SetuData } from '@/types/setu'
import { Empty } from 'antd'
import SetuCard from './setuCard'

interface SetuShowerProps {
  data?: SetuData[]
}

export default function SetuShower({ data }: SetuShowerProps) {
  return (
    <div className="flex flex-wrap justify-center gap-2 py-2">
      {data ? data.map(item => <SetuCard key={`${item.pid}_${item.p}`} {...item} />) : <Empty />}
      {data && data.length > 0 && <div className="w-full text-center text-gray-500">共 {data.length} 条数据</div>}
    </div>
  )
}
