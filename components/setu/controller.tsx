'use client'

import { R18Enum, SetuParams } from '@/types/setu'
import { Affix, Button, Checkbox, Input, InputNumber, Radio, Slider } from 'antd'
import { useState } from 'react'
interface SetuControllerProps {
  initialParams?: SetuParams
  onSearch?: (params: SetuParams) => Promise<void>
}

export default function SetuController({ initialParams, onSearch }: SetuControllerProps) {
  const [params, setParams] = useState<SetuParams>(initialParams || {})
  const [isSearching, setIsSearching] = useState(false)

  return (
    <Affix offsetTop={0}>
      <div className="flex flex-col gap-4 rounded-lg bg-white p-4 shadow-md">
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
      </div>
    </Affix>
  )
}
