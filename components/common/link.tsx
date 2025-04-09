'use client'

import { LinkOutlined } from '@ant-design/icons'
import { Popover } from 'antd'

import Link from 'next/link'

function IconLink({
  href,
  children,
  icon = <LinkOutlined />,
  className,
  ...props
}: {
  href: string
  children?: React.ReactNode
  icon?: React.ReactNode
  className?: string
} & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <Popover content={href} title="点击前往" trigger="hover">
      <Link href={href} className={`text-blue-600 hover:text-blue-800 ${className}`} {...props}>
        {icon}
        {children ?? href} {/* 如果没有children，则显示href */}
      </Link>
    </Popover>
  )
}

export { IconLink }
