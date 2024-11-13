import { histogramData, mockData } from '@/assets/mock.data'
import AreaChart from '@/components/area-chart'
import ChartSubtitles from '@/components/common-chart/chart-subtitles'
import ChartTitle from '@/components/common-chart/chart-title'
import ChartYAxisTitle from '@/components/common-chart/chart-y-axis-title'
import CommonChartWrapper from '@/components/common-chart/common-chart-wrapper'
import HistogramChart from '@/components/histogram-chart'
import dayjs from 'dayjs'
import { memo } from 'react'

const DailyProfitLossChart = () => {
  return (
    <CommonChartWrapper className='main-page-chart'>
      <ChartTitle tooltipTitle='Lời&Lỗ ngày = tài sản cuối kỳ - tài sản khi chụp nhanh vào 00:00 (UTC+0) trong ngày - tiền chuyển ròng nội bộ trong ngày.'>
        Lời/Lỗ ngày
      </ChartTitle>

      <ChartSubtitles>
        <ChartYAxisTitle title='Lời&Lỗ hôm nay'>0.00 VND</ChartYAxisTitle>
      </ChartSubtitles>

      <HistogramChart data={histogramData.map((item) => ({ ...item, time: dayjs(item.time).format('YYYY-MM-DD') }))} />
    </CommonChartWrapper>
  )
}

export default memo(DailyProfitLossChart)
