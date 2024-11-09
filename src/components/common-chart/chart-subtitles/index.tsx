import { memo, PropsWithChildren } from 'react'
import './styles.scss'

type ChartSubtitleProps = PropsWithChildren

const ChartSubtitles = (props: ChartSubtitleProps) => {
  const { children } = props

  return <div className='chart-subtitle'>{children}</div>
}

export default memo(ChartSubtitles)
