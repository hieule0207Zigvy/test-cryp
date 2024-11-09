import { HTMLAttributes, memo, PropsWithChildren } from 'react'
import './styles.scss'
import classNames from 'classnames'

type CommonChartWrapperProps = PropsWithChildren<HTMLAttributes<HTMLDivElement>>

const CommonChartWrapper = (props: CommonChartWrapperProps) => {
  const { children, className, ...rest } = props

  return (
    <div {...rest} className={classNames('common-chart-wrapper', className)}>
      {children}
    </div>
  )
}

export default memo(CommonChartWrapper)
