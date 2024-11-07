import { memo } from 'react'
import './information.scss'
import { Tabs, TabsProps, Tooltip } from 'antd'

const InformationTab: React.FC = () => {
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: <span className='tab-item'>{'USDT-M Futures'}</span>
    },
    {
      key: '2',
      label: <span className='tab-item'>{'Coin-M Futures'}</span>
    },
    {
      key: '3',
      label: <span className='tab-item'>{'USDC-M Futures'}</span>
    }
  ]

  const profitContentToday = `* Lời&Lỗ hôm nay = tài sản hiện tại - tài sản khi chụp nhanh vào 00:00 (UTC+0) hôm nay - tiền chuyển ròng nội bộ hôm nay.
* Bảo trì dữ liệu diễn ra từ 00:00 đến 7:00 mỗi ngày. Dữ liệu sẽ không được cập nhật trong khoảng thời gian này.`
  const profitContentWeek = `* Lời&Lỗ 7 ngày = tài sản hiện tại - tài sản khi chụp nhanh vào 00:00 (UTC+0) 7 ngày trước - tiền chuyển ròng nội bộ 7 ngày.
* Bảo trì dữ liệu diễn ra từ 00:00 đến 7:00 mỗi ngày. Dữ liệu sẽ không được cập nhật trong khoảng thời gian này.`
  const profitContentMonth = `* Lời&Lỗ 30 ngày = tài sản hiện tại - tài sản khi chụp nhanh vào 00:00 (UTC+0) 30 ngày trước - tiền chuyển ròng nội bộ 30 ngày.
* Bảo trì dữ liệu diễn ra từ 00:00 đến 7:00 mỗi ngày. Dữ liệu sẽ không được cập nhật trong khoảng thời gian này.`
  return (
    <div className='information-session'>
      <div className='currency-list-session'>
        <Tabs defaultActiveKey='1' items={items} className='tab' />
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
        <span className='current-amount-label'>{'0.00 BTC'}</span>
        <span className='current-amount-sub-label'>{`≈ 0.00 VND`}</span>
        <div className='profit-session'>
          <div className='profit-item'>
            <div className='profit-title'>
              <Tooltip placement='top' title={profitContentToday}>
                <button className='profit-item-label'>Lời&Lỗ hôm nay</button>
              </Tooltip>
            </div>
            <span className='profit-value'>{'0.00 VND'}</span>
          </div>
          <div className='profit-item'>
            <div className='profit-title'>
              <Tooltip placement='top' title={profitContentWeek}>
                <button className='profit-item-label'>Lời/Lỗ 7 ngày</button>
              </Tooltip>
            </div>
            <span className='profit-value'>{'0.00 VND'}</span>
          </div>
          <div className='profit-item'>
            <div className='profit-title'>
              <Tooltip placement='top' title={profitContentMonth}>
                <button className='profit-item-label'>Lời/Lỗ 30 ngày</button>
              </Tooltip>
            </div>
            <span className='profit-value'>{'0.00 VND'}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default memo(InformationTab)
