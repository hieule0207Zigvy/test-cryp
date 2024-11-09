import { memo, useEffect, useRef } from 'react'
import './styles.scss'
import {
  ChartOptions,
  createChart,
  CrosshairMode,
  DeepPartial,
  HistogramData,
  HistogramSeriesPartialOptions,
  IChartApi,
  Time
} from 'lightweight-charts'
import { themeColors } from '@/styles/global.theme.antd'
import dayjs, { Dayjs } from 'dayjs'

type HistogramChartProps = {
  data: HistogramData<Time>[]
  options?: DeepPartial<ChartOptions>
  histogramOptions?: HistogramSeriesPartialOptions
}

const currentLocale = window.navigator.languages[0]

const vndPriceFormatter = Intl.NumberFormat(currentLocale, {
  style: 'currency',
  currency: 'VND'
}).format

const HistogramChart = (props: HistogramChartProps) => {
  const { data = [], options, histogramOptions } = props

  const chartContainerRef = useRef<HTMLDivElement | null>(null)
  const chartRef = useRef<IChartApi | null>(null)

  useEffect(() => {
    chartRef.current = createChart(chartContainerRef.current!, {
      width: chartContainerRef.current?.clientWidth,
      height: 300,
      layout: {
        background: {
          color: themeColors.transparent
        },
        textColor: themeColors.text
      },
      grid: {
        vertLines: { color: themeColors.transparent },
        horzLines: { color: themeColors.transparent }
      },
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
        priceFormatter: vndPriceFormatter
      },
      ...options
    })

    const histogramSeries = chartRef.current.addHistogramSeries({
      priceScaleId: 'left',
      priceLineVisible: false,
      ...histogramOptions
    })

    if (!data?.length) return

    histogramSeries.setData(data)

    const fromTimestamp = data[data.length - Math.min(60, data.length)].time
    const toTimestamp = data[data.length - 1].time

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
  }, [data, histogramOptions, options])

  return (
    <div className='histogram-chart'>
      <div ref={chartContainerRef}> </div>
    </div>
  )
}

export default memo(HistogramChart)
