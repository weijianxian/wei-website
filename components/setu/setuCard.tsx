import { SetuData } from '@/types/setu'
import { LinkOutlined } from '@ant-design/icons'
import { Card, Tag } from 'antd'
import Link from 'next/link'

export default function SetuCard(data: SetuData) {
  const { pid, title, author, p, urls, tags } = data

  const MetaData = {
    作者: author,
    pid: pid,
    分p: p,
  }
  const Links = {
    作品主页: `https://pixiv.net/i/${pid}`,
    原图: urls.original,
  }
  return (
    <Card className="w-full md:w-60" hoverable cover={<img src={urls.original} alt={tags?.join(',')} />}>
      {/* 作品标题 */}
      <div className="text-3xl font-bold">{title}</div>

      {/* 作品标签 */}
      <div className="mt-2 flex flex-wrap gap-1">
        {tags?.map((tag, index) => (
          <Tag key={index} color="blue">
            {tag}
          </Tag>
        ))}
      </div>

      {/* 作品元信息 */}
      <div className="mt-2 flex flex-wrap gap-1">
        {Object.entries(MetaData).map(([key, value], index) => (
          <Tag key={index} color="green">
            {key}: {value}
          </Tag>
        ))}
      </div>

      {/* 作品链接 */}
      <div className="flex-warp mt-2 flex gap-1">
        {Object.entries(Links).map(([key, value], index) => (
          <Tag key={index} color="orange">
            <Link href={value} target="_blank">
              <LinkOutlined />
              {key}
            </Link>
          </Tag>
        ))}
      </div>
    </Card>
  )
}
