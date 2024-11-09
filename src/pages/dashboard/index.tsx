import { histogramData, mockData } from '@/assets/mock.data'
import AreaChart from '@/components/area-chart'
import HistogramChart from '@/components/histogram-chart'
import { Button, Input } from 'antd'
import dayjs from 'dayjs'
import { memo } from 'react'

const Dashboard = () => {
  return (
    <>
      <Button shape='round'>hihi</Button>
      <Button shape='round' type='primary'>
        haha
      </Button>
      <Input />

      <AreaChart data={mockData.map((item) => ({ ...item, time: dayjs(item.time).format('YYYY-MM-DD') }))} />
      <HistogramChart data={histogramData.map((item) => ({ ...item, time: dayjs(item.time).format('YYYY-MM-DD') }))} />
    </>
  )
}

export default memo(Dashboard)
