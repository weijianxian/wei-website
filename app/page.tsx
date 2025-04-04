'use client'
import { AppContainer, TabBar } from '@/components/common'
export default function Home() {
  return (
    <>
      <TabBar title="首页" />
      <AppContainer>
        <div className="flex flex-col items-center justify-center">
          <p className="m-5 text-gray-500">这是一个空白的 Next.js 应用</p>
        </div>
      </AppContainer>
    </>
  )
}
