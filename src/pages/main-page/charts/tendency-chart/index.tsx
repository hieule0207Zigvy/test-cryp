import { mockData } from '@/assets/mock.data'
import AreaChart from '@/components/area-chart'
import ChartSubtitles from '@/components/common-chart/chart-subtitles'
import ChartTitle from '@/components/common-chart/chart-title'
import ChartYAxisTitle from '@/components/common-chart/chart-y-axis-title'
import CommonChartWrapper from '@/components/common-chart/common-chart-wrapper'
import dayjs from 'dayjs'
import { memo } from 'react'

const TendencyChart = () => {
  return (
    <CommonChartWrapper className='main-page-chart'>
      <ChartTitle tooltipTitle='Biến động tài sản trong tài khoản futures, bao gồm cả Lời&Lỗ chưa ghi nhận'>
        Xu hướng tài sản
      </ChartTitle>

      <ChartSubtitles>
        <ChartYAxisTitle title='Tài sản hôm nay'>0.00 VND</ChartYAxisTitle>
      </ChartSubtitles>

      <AreaChart data={mockData.map((item) => ({ ...item, time: dayjs(item.time).format('YYYY-MM-DD') }))} />
    </CommonChartWrapper>
  )
}

export default memo(TendencyChart)
