import { memo, useContext, useEffect, useState } from 'react'
import './information.scss'
import { Tabs, TabsProps, Tooltip } from 'antd'
import { CurrencyType, CurrencyTypeName, ProfitContent, ProfitLabel } from '@/enums/currency-type.enums'
import { useSearchParams } from 'react-router-dom'
import { SearchParams } from '@/enums/param.enums'
import { mockDataInformation } from '@/assets/mock.data'
import { formatCurrency } from '@/utils'
import { MockDataContext } from '@/contexts'
import { isEmpty } from 'lodash'
import { MockingDataFromForm } from '@/types/general.type'

const InformationTab: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const { mockData: testMockData } = useContext(MockDataContext)
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
  const items: TabsProps['items'] = Object.keys(CurrencyTypeName).map((currency: string) => {
    return {
      key: currency,
      label: <span className='tab-item'>{CurrencyTypeName[currency as keyof typeof CurrencyType]}</span>
    }
  })
  const currencyType = searchParams.get(SearchParams.currency) ?? CurrencyType.Coin_M_Futures

  const profitData = !isEmpty(receivedData)
    ? {
        total: receivedData.totalSubstance,
        profitByToday: receivedData.profitToday,
        profitByWeek: receivedData.profitByWeek,
        profitBytMonth: receivedData.profitByMonth
      }
    : mockDataInformation[currencyType] || {}

  useEffect(() => {
    console.log('TCL - file: index.tsx:36 - mockData:', testMockData)
  }, [testMockData])

  return (
    <div className='information-session'>
      <div className='currency-list-session'>
        <Tabs
          defaultActiveKey='1'
          items={items}
          className='tab'
          onChange={(v) => {
            setSearchParams({ [SearchParams.currency]: v })
          }}
        />
      </div>
      <div className='content-information-session'>
        <div className='title-session'>
          <span className='title'>{'Tài sản ước tính'}</span>
          <div className='hide-content-button'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='currentColor'
              className='eye-svg'
              viewBox='0 0 24 24'
              aria-hidden='true'
            >
              <path d='M23.185 11.696c-.032-.074-.827-1.835-2.592-3.6C18.241 5.742 15.27 4.5 12 4.5c-3.27 0-6.24 1.243-8.593 3.595C1.642 9.861.844 11.625.815 11.696a.75.75 0 000 .61c.032.074.827 1.834 2.592 3.6C5.759 18.256 8.73 19.5 12 19.5c3.27 0 6.24-1.243 8.593-3.594 1.765-1.766 2.56-3.526 2.592-3.6a.75.75 0 000-.61zM12 18c-2.886 0-5.407-1.05-7.493-3.117A12.511 12.511 0 012.344 12a12.499 12.499 0 012.163-2.883C6.593 7.05 9.114 6 12 6s5.407 1.05 7.493 3.117A12.507 12.507 0 0121.661 12c-.676 1.262-3.62 6-9.661 6zm0-10.5a4.5 4.5 0 100 9 4.5 4.5 0 000-9zm0 7.5a3 3 0 110-5.999A3 3 0 0112 15z'></path>
            </svg>
          </div>
        </div>
        <span className='current-amount-label'>{`${profitData.total} BTC`}</span>
        <span className='current-amount-sub-label'>{`≈ ${formatCurrency(profitData.total * 2329587253.39)} VND`}</span>
        <div className='profit-session'>
          <div className='profit-item'>
            <div className='profit-title'>
              <Tooltip placement='top' title={ProfitContent.profitByToday}>
                <button className='profit-item-label'>{ProfitLabel.profitByToday}</button>
              </Tooltip>
            </div>
            <span className='profit-value'>{`${formatCurrency(profitData.profitByToday)} VND`}</span>
          </div>
          <div className='profit-item'>
            <div className='profit-title'>
              <Tooltip placement='top' title={ProfitContent.profitByWeek}>
                <button className='profit-item-label'>{ProfitLabel.profitByWeek}</button>
              </Tooltip>
            </div>
            <span className='profit-value'>{`${formatCurrency(profitData.profitByWeek)} VND`}</span>
          </div>
          <div className='profit-item'>
            <div className='profit-title'>
              <Tooltip placement='top' title={ProfitContent.profitBytMonth}>
                <button className='profit-item-label'>{ProfitLabel.profitBytMonth}</button>
              </Tooltip>
            </div>
            <span className='profit-value'>{`${formatCurrency(profitData.profitBytMonth)} VND`}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default memo(InformationTab)
