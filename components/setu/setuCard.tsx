import { IconLink } from '@/components/common/link'
import place_holder from '@/public/setu/place_holder.svg'
import { SetuData } from '@/types/setu'
import { Card, Tag } from 'antd'
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

  console.log(place_holder)

  return (
    <Card
      className="w-full md:w-60"
      hoverable
      cover={
        <img
          src={urls.original}
          alt={tags?.join(',')}
          onError={e => {
            e.currentTarget.onerror = null // 防止循环触发
            e.currentTarget.src = place_holder.src // 替换为默认占位图
          }}
        />
      }
    >
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
            <IconLink href={value} target="_blank">
              {key}
            </IconLink>
          </Tag>
        ))}
      </div>
    </Card>
  )
}
