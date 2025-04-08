import { LinkOutlined } from '@ant-design/icons'
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
    <Link href={href} className={`text-blue-600 hover:text-blue-800 ${className}`} {...props}>
      {icon}
      {children ?? href} {/* 如果没有children，则显示href */}
    </Link>
  )
}

export { IconLink }
