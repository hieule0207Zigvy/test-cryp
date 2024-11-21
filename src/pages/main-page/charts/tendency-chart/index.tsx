import { mockData } from '@/assets/mock.data'
import AreaChart from '@/components/area-chart'
import ChartSubtitles from '@/components/common-chart/chart-subtitles'
import ChartTitle from '@/components/common-chart/chart-title'
import ChartYAxisTitle from '@/components/common-chart/chart-y-axis-title'
import CommonChartWrapper from '@/components/common-chart/common-chart-wrapper'
import { MockingDataFromForm } from '@/types/general.type'
import dayjs from 'dayjs'
import { AreaData, Time, WhitespaceData } from 'lightweight-charts'
import { isEmpty } from 'lodash-es'
import { memo, useEffect, useState } from 'react'

const TendencyChart = () => {
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
    ? (receivedData.profitTrendChartData as (AreaData<Time> | WhitespaceData<Time>)[])
    : mockData.map((item) => ({ ...item, time: dayjs(item.time).format('YYYY-MM-DD') }))
  return (
    <CommonChartWrapper className='main-page-chart'>
      <ChartTitle tooltipTitle='Biến động tài sản trong tài khoản futures, bao gồm cả Lời&Lỗ chưa ghi nhận'>
        Xu hướng tài sản
      </ChartTitle>

      <ChartSubtitles>
        <ChartYAxisTitle title='Tài sản hôm nay'>
          {`${!isEmpty(receivedData) ? receivedData.profitTrendChart : '0.00'} VND`}
        </ChartYAxisTitle>
      </ChartSubtitles>

      <AreaChart data={data} />
    </CommonChartWrapper>
  )
}

export default memo(TendencyChart)
