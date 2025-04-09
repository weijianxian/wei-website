'use client'

import Icon from '@/public/ico/favicon.ico'
import { FileImageOutlined, GithubOutlined, MenuOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Drawer } from 'antd'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const SHORT_LINKS = [
  {
    name: '色图',
    Icon: <FileImageOutlined />,
    href: '/setu',
  },
  {
    name: '关于',
    Icon: <UserOutlined />,
    href: '/about',
  },
  {
    name: 'Github',
    Icon: <GithubOutlined />,
    href: 'https://www.github.com/weijianxian',
  },
]

export default function TabBar({ title }: { title?: string }) {
  const [isOpen, setIsOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  // 确保组件只在客户端渲染后才能显示 Drawer
  useEffect(() => {
    setIsMounted(true)
  }, [])

  const handleToggle = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="flex h-16 items-center bg-white px-4 shadow-md">
      <span onClick={() => window.open('/', '_self')} className="cursor-pointer">
        <Image src={Icon} alt="Logo" width={40} height={40} />
      </span>
      <div className="flex flex-1 items-start p-4 text-2xl">
        <span>{title}</span>
      </div>

      {/* 窄屏设备 */}
      <nav className="flex gap-4 md:hidden">
        <MenuOutlined onClick={handleToggle} />
        {isMounted && (
          <Drawer onClose={handleToggle} open={isOpen} width={9000}>
            {SHORT_LINKS.map((link, index) => (
              <Button
                key={index}
                type="text"
                className="flex w-full rounded-md hover:border hover:border-gray-300"
                onClick={() => {
                  window.open(link.href, '_self')
                }}
              >
                {link.Icon}
                {link.name}
              </Button>
            ))}
          </Drawer>
        )}
      </nav>

      {/* 宽屏设备 */}
      <nav className="hidden gap-4 md:flex">
        {SHORT_LINKS.map((link, index) => (
          <Link
            key={index}
            href={link.href}
            target="_self"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-gray-700 hover:text-blue-500"
          >
            {link.Icon}
            {link.name}
          </Link>
        ))}
      </nav>
    </div>
  )
}
