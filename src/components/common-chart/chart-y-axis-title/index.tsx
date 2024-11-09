import { Flex } from 'antd'
import { memo, PropsWithChildren } from 'react'
import './styles.scss'

type ChartSubtitlePartProps = PropsWithChildren & { title?: string }

const ChartSubtitlePart = (props: ChartSubtitlePartProps) => {
  const { children, title } = props

  return (
    <Flex gap={4} vertical className='chart-y-axis-title'>
      <div className='chart-y-axis-title-subtitle'>{title}</div>
      <div className='chart-y-axis-title-content'>{children}</div>
    </Flex>
  )
}

export default memo(ChartSubtitlePart)
