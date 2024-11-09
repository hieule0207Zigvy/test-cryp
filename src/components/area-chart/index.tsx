import { themeColors } from '@/styles/global.theme.antd'
import dayjs, { Dayjs } from 'dayjs'
import {
  AreaData,
  AreaSeriesPartialOptions,
  ChartOptions,
  createChart,
  CrosshairMode,
  DeepPartial,
  IChartApi,
  LineType,
  Time,
  WhitespaceData
} from 'lightweight-charts'
import { memo, useEffect, useRef } from 'react'
import './styles.scss'

type AreaChartProps = {
  data: (AreaData<Time> | WhitespaceData<Time>)[]
  options?: DeepPartial<ChartOptions>
  areaOptions?: AreaSeriesPartialOptions
  from?: string | null
  to?: string | null
}

// Get the current users primary locale
const currentLocale = window.navigator.languages[0]
// Create a number format using Intl.NumberFormat
const myPriceFormatter = Intl.NumberFormat(currentLocale, {
  style: 'currency',
  currency: 'VND' // Currency for data points
}).format

const AreaChart = (props: AreaChartProps) => {
  const { data, options, areaOptions, from, to } = props

  const chartContainerRef = useRef<HTMLDivElement | null>(null)
  const chartRef = useRef<IChartApi | null>(null)

  useEffect(() => {
    chartRef.current = createChart(chartContainerRef.current!, {
      width: chartContainerRef.current?.clientWidth,
      height: 278,
      layout: { background: { color: themeColors.transparent }, textColor: themeColors.text },
      grid: { vertLines: { color: themeColors.transparent }, horzLines: { color: themeColors.transparent } },
      crosshair: { mode: CrosshairMode.Normal },
      rightPriceScale: { visible: false },
      leftPriceScale: {
        visible: true,
        borderVisible: false,
        scaleMargins: {
          top: 0.1,
          bottom: 0
        },
        autoScale: false
      },
      timeScale: {
        borderColor: themeColors.text,
        tickMarkFormatter: (time: Dayjs) => dayjs(time).format('MM-DD')
      },
      autoSize: true,
      localization: {
        priceFormatter: myPriceFormatter
      },
      ...options
    })

    const areaSeries = chartRef.current.addAreaSeries({
      lineType: LineType.Curved,
      lineColor: themeColors.primary,
      topColor: themeColors.primary,
      bottomColor: themeColors.transparent,
      ...areaOptions
    })

    if (!data?.length) return

    areaSeries.setData(data)

    const fromTimestamp = from ?? data[data.length - Math.min(10, data.length)].time
    const toTimestamp = to ?? data[data.length - 1].time

    chartRef.current.timeScale().setVisibleRange({
      from: fromTimestamp,
      to: toTimestamp
    })

    return () => {
      if (chartRef.current) {
        chartRef.current.remove()
        chartRef.current = null
      }
    }
  }, [areaOptions, data, from, options, to])

  return <div ref={chartContainerRef} />
}

export default memo(AreaChart)
