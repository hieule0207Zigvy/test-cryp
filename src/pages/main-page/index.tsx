import { memo } from 'react'
import DailyProfitLossChart from './charts/daily-profit-loss-chart'
import OverAllChart from './charts/over-all-chart'
import TendencyChart from './charts/tendency-chart'
import Heading from './heading'
import Information from './information'
import './styles.scss'
import MainPageFilter from './main-page-filter'

const MainPage: React.FC = () => {
  return (
    <div className='main-page-wrapper'>
      <Heading />
      <Information />

      <MainPageFilter />

      <div className='main-page-chart-layout'>
        <OverAllChart />
        <DailyProfitLossChart />
        <TendencyChart />
      </div>
    </div>
  )
}
export default memo(MainPage)
