import { mockData } from '@/assets/mock.data'
import AreaChart from '@/components/area-chart'
import ChartSubtitles from '@/components/common-chart/chart-subtitles'
import ChartTitle from '@/components/common-chart/chart-title'
import ChartYAxisTitle from '@/components/common-chart/chart-y-axis-title'
import CommonChartWrapper from '@/components/common-chart/common-chart-wrapper'
import { MockingDataFromForm } from '@/types/general.type'
import dayjs from 'dayjs'
import { AreaData, Time, WhitespaceData } from 'lightweight-charts'
import { isEmpty } from 'lodash'
import { memo, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

const OverAllChart = () => {
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
    ? (receivedData.totalProfitChartData as (AreaData<Time> | WhitespaceData<Time>)[])
    : mockData.map((item) => ({ ...item, time: dayjs(item.time).format('YYYY-MM-DD') }))

  const [searchParams] = useSearchParams()

  return (
    <CommonChartWrapper className='main-page-chart'>
      <ChartTitle tooltipTitle='Tổng Lời&Lỗ = tài sản cuối kỳ - tài sản ban đầu - tiền chuyển ròng nội bộ.'>
        Tổng Lời/Lỗ
      </ChartTitle>

      <ChartSubtitles>
        <ChartYAxisTitle title='Tổng Lời/Lỗ'>{`${!isEmpty(receivedData) ? receivedData.totalProfitChart : '0.00'} VND`}</ChartYAxisTitle>
      </ChartSubtitles>

      <AreaChart data={data} from={searchParams.get('from')} to={searchParams.get('to')} />
    </CommonChartWrapper>
  )
}

export default memo(OverAllChart)
