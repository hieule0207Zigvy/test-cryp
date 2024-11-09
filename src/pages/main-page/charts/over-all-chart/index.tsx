import { mockData } from '@/assets/mock.data'
import AreaChart from '@/components/area-chart'
import ChartSubtitles from '@/components/common-chart/chart-subtitles'
import ChartTitle from '@/components/common-chart/chart-title'
import ChartYAxisTitle from '@/components/common-chart/chart-y-axis-title'
import CommonChartWrapper from '@/components/common-chart/common-chart-wrapper'
import dayjs from 'dayjs'
import { memo } from 'react'
import { useSearchParams } from 'react-router-dom'

const OverAllChart = () => {
  const data = mockData.map((item) => ({ ...item, time: dayjs(item.time).format('YYYY-MM-DD') }))

  const [searchParams] = useSearchParams()

  return (
    <CommonChartWrapper className='main-page-chart'>
      <ChartTitle tooltipTitle='Tổng Lời&Lỗ = tài sản cuối kỳ - tài sản ban đầu - tiền chuyển ròng nội bộ.'>
        Tổng Lời/Lỗ
      </ChartTitle>

      <ChartSubtitles>
        <ChartYAxisTitle title='Tổng Lời/Lỗ'>0.00 VND</ChartYAxisTitle>
      </ChartSubtitles>

      <AreaChart data={data} from={searchParams.get('from')} to={searchParams.get('to')} />
    </CommonChartWrapper>
  )
}

export default memo(OverAllChart)
