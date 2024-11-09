import { InfoIcon } from '@/assets/info.icon'
import { Flex, Tooltip } from 'antd'
import { memo, PropsWithChildren } from 'react'
import './styles.scss'

type ChartTitleProps = PropsWithChildren & { tooltipTitle?: string }

const ChartTitle = (props: ChartTitleProps) => {
  const { children, tooltipTitle = '' } = props

  return (
    <Flex align='center' gap={8} className='chart-title'>
      {children}

      <Tooltip className='chart-title-tooltip' placement='topLeft' title={tooltipTitle}>
        <div>
          <InfoIcon />
        </div>
      </Tooltip>
    </Flex>
  )
}

export default memo(ChartTitle)
