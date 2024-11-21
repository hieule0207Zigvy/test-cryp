import { histogramData } from '@/assets/mock.data'
import ChartSubtitles from '@/components/common-chart/chart-subtitles'
import ChartTitle from '@/components/common-chart/chart-title'
import ChartYAxisTitle from '@/components/common-chart/chart-y-axis-title'
import CommonChartWrapper from '@/components/common-chart/common-chart-wrapper'
import HistogramChart from '@/components/histogram-chart'
import { MockingDataFromForm } from '@/types/general.type'
import dayjs from 'dayjs'
import { HistogramData, Time } from 'lightweight-charts'
import { isEmpty } from 'lodash-es'
import { memo, useEffect, useState } from 'react'

const DailyProfitLossChart = () => {
  const [receivedData, setReceivedData] = useState<MockingDataFromForm>()

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // Check the origin for security purposes if necessary
      if (event.origin === window.location.origin) {
        const { data } = event.data
        if (data) {
          setReceivedData(data)
        }
      }
    }

    window.addEventListener('message', handleMessage)

    // Clean up the event listener
    return () => {
      window.removeEventListener('message', handleMessage)
    }
  }, [])
  const data = !isEmpty(receivedData)
    ? (receivedData.profitByDateChartData as HistogramData<Time>[])
    : histogramData.map((item) => ({ ...item, time: dayjs(item.time).format('YYYY-MM-DD') }))
  return (
    <CommonChartWrapper className='main-page-chart'>
      <ChartTitle tooltipTitle='Lời&Lỗ ngày = tài sản cuối kỳ - tài sản khi chụp nhanh vào 00:00 (UTC+0) trong ngày - tiền chuyển ròng nội bộ trong ngày.'>
        Lời/Lỗ ngày
      </ChartTitle>

      <ChartSubtitles>
        <ChartYAxisTitle title='Lời&Lỗ hôm nay'>{`${!isEmpty(receivedData) ? receivedData.profitByDateChart : '0.00'} VND`}</ChartYAxisTitle>
      </ChartSubtitles>

      <HistogramChart data={data} />
    </CommonChartWrapper>
  )
}

export default memo(DailyProfitLossChart)
