'use client'
import { SetuData } from '@/types/setu'
import SetuCard from './setuCard'

interface SetuShowerProps {
  data?: SetuData[]
}

export default function SetuShower({ data }: SetuShowerProps) {
  return (
    <div className="flex flex-wrap justify-center gap-2 py-2">
      {data ? (
        data.map((item, index) => <SetuCard key={index} {...item} />)
      ) : (
        <p className="m-10 text-gray-500">没有数据</p>
      )}
      {data && data.length > 0 && <div className="w-full text-center text-gray-500">共 {data.length} 条数据</div>}
    </div>
  )
}
