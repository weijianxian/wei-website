'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function NotFound() {
  const router = useRouter()
  const [countdown, setCountdown] = useState(5)

  // 倒计时自动返回首页
  useEffect(() => {
    if (countdown <= 0) {
      router.push('/')
      return
    }

    const timer = setTimeout(() => {
      setCountdown(countdown - 1)
    }, 1000)

    return () => clearTimeout(timer)
  }, [countdown, router])

  return (
    <div className="from-background-light to-background-default flex h-screen items-center justify-center bg-gradient-to-b px-4">
      <div className="text-center">
        {/* 大号404文字带动画 */}
        <h1 className="text-primary-500 animate-pulse text-9xl font-bold">404</h1>

        {/* 错误信息 */}
        <h2 className="text-text-primary mt-4 mb-8 text-3xl font-semibold">页面走丢了</h2>

        {/* 说明文字 */}
        <p className="text-text-secondary mx-auto mb-8 max-w-md text-lg">
          很抱歉，您访问的页面不存在或已被移除。
          <br />
          <span className="text-accent-500">{countdown} 秒后自动返回首页...</span>
        </p>

        {/* 按钮组 */}
        <div className="flex items-center justify-center sm:flex-row">
          <button
            onClick={() => router.back()}
            className="hover:bg-secondary-600 rounded-lg px-6 py-3 transition-colors"
          >
            返回上一页
          </button>
          |
          <Link href="/" className="hover:bg-primary-600 rounded-lg px-6 py-3 transition-colors">
            返回首页
          </Link>
        </div>
      </div>
    </div>
  )
}
