'use client'

import { R18Enum, SetuParams } from '@/types/setu'
import { Affix, Button, Checkbox, Collapse, DatePicker, Input, InputNumber, Popover, Radio, Slider } from 'antd'
import locale from 'antd/es/date-picker/locale/zh_CN'
import { useCallback, useState } from 'react'

interface SetuControllerProps {
  initialParams?: SetuParams
  onSearch?: (params: SetuParams) => Promise<void>
}
const ProxyPlaceHplder = {
  pid: '作品pid',
  p: '作品所在页',
  uid: '作者uid',
  ext: '图片扩展名 (original)',
  path: '图片地址的相对路径',
  datePath: '相对路径中的日期部分',
}

export default function SetuController({ initialParams, onSearch }: SetuControllerProps) {
  const [params, setParams] = useState<SetuParams>(initialParams || {})
  const [isSearching, setIsSearching] = useState(false)

  const ProConfiger = useCallback(
    () => (
      <>
        <div className="flex flex-col gap-2">
          {/* 作者UID */}
          <Input
            placeholder="UID，多个用逗号分隔"
            value={params.uid?.join(',')}
            onChange={e => {
              const uids = e.target.value.split(',').map(uid => Number(uid.trim()))
              setParams({ ...params, uid: uids })
            }}
          />

          {/* 图片规格 */}
          <Input
            placeholder="图片规格，多个用逗号分隔"
            value={params.size?.join(',')}
            onChange={e => {
              const sizes = e.target.value.split(',').map(size => size.trim())
              setParams({ ...params, size: sizes })
            }}
          />

          {/* 代理地址 */}
          <Input
            placeholder="代理地址"
            value={params.proxy}
            onChange={e => {
              setParams({ ...params, proxy: e.target.value })
            }}
          />

          {/* 快捷插入占位符 */}
          <div className="gap-2">
            <span>插入占位符:</span>
            {Object.entries(ProxyPlaceHplder).map(([key, value]) => (
              <Popover content={value} trigger="hover" key={key}>
                <Button
                  type="text"
                  onClick={() => {
                    setParams({ ...params, proxy: (params.proxy || '') + `{{${key}}}` })
                  }}
                  key={key}
                >
                  {key}
                </Button>
              </Popover>
            ))}
          </div>

          {/* 发布日期限制 */}
          <DatePicker.RangePicker
            locale={locale}
            showTime
            allowEmpty={[false, false]}
            onChange={(_, dateStrings) => {
              const [start, end] = dateStrings
              setParams({
                ...params,
                dateAfter: start ? new Date(start).getTime() : undefined,
                dateBefore: end ? new Date(end).getTime() : undefined,
              })
            }}
          />

          {/* 缩写转化 */}
          <Checkbox
            checked={params.dsc}
            onChange={e => {
              setParams({ ...params, dsc: e.target.checked })
            }}
          >
            禁用缩写转换
          </Checkbox>
          <Input
            placeholder="请输入图片长宽比（如 16:9）"
            value={params.aspectRatio}
            onChange={e => {
              setParams({ ...params, aspectRatio: e.target.value })
            }}
          />
        </div>
      </>
    ),
    [params],
  )

  return (
    <Affix offsetTop={0}>
      <div className="flex flex-col gap-4 rounded-lg bg-white p-4 shadow-md">
        {/* 上半 搜索框 提交按钮 */}
        <div className="mb-4 flex flex-1 items-center justify-between gap-2">
          <Input
            placeholder="请输入标签,多个用逗号分隔"
            value={params.tag?.join(',')}
            onChange={e => {
              const tags = e.target.value.split(',').map(tag => tag.trim())
              setParams({ ...params, tag: tags })
            }}
          />
          <Button
            type="primary"
            loading={isSearching}
            onClick={async () => {
              if (onSearch) {
                setIsSearching(true)
                console.log('params', params)
                await onSearch(params)
                setIsSearching(false)
              }
            }}
          >
            搜索
          </Button>
        </div>
        {/* 下半 R18控制 排除ai作品 数量 */}
        <div className="flex flex-wrap items-center gap-2">
          <Radio.Group
            value={params.r18}
            options={[
              { value: R18Enum.NotR18, label: '非 R18' },
              { value: R18Enum.R18, label: 'R18' },
              { value: R18Enum.Mixed, label: '混合' },
            ]}
            optionType="button"
            buttonStyle="solid"
            onChange={e => {
              setParams({ ...params, r18: e.target.value })
            }}
          ></Radio.Group>
          <Checkbox
            checked={params.excludeAI}
            onChange={e => {
              setParams({ ...params, excludeAI: e.target.checked })
            }}
          >
            排除 AI 作品
          </Checkbox>

          <Slider
            min={1}
            max={20}
            defaultValue={1}
            className="min-w-1/5 flex-1"
            value={params.num}
            onChange={value => {
              setParams({ ...params, num: value as number })
            }}
          />

          <InputNumber
            min={1}
            max={20}
            defaultValue={1}
            value={params.num}
            onChange={value => {
              setParams({ ...params, num: value as number })
            }}
            formatter={(value?: number) => `${value ?? 0} 张`}
            parser={(value?: string) => (value ? Number(value.replace('张', '')) : 0)}
            placeholder="数量"
            keyboard
          />
        </div>
        {/* 展开 高级控制 */}
        <Collapse
          ghost
          items={[
            {
              key: '1',
              label: '高级设置(可能会发生错误,谨慎修改)',
              children: ProConfiger(),
            },
          ]}
        />
      </div>
    </Affix>
  )
}
