import { Dropdown, MenuProps } from 'antd'
import { memo } from 'react'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import './heading.scss'

dayjs.extend(utc)
dayjs.extend(timezone)

const dropdownItem: MenuProps['items'] = [
  {
    key: '1',
    label: <span className='dropdown-item-label'>{'Phân tích Lời/Lỗ Spot'}</span>
  },
  {
    key: '2',
    label: <span className='dropdown-item-label'>{'Phân tích Lời&Lỗ tài khoản ký quỹ'}</span>
  },
  {
    key: '3',
    label: <span className='dropdown-item-label'>{'Phân tích Lời&Lỗ tài khoản futures'}</span>
  }
]
const Heading: React.FC = () => {
  return (
    <div className='heading-session'>
      <div className='label-session'>
        <div className='label-with-dropdown'>
          <span className='main-label'>{'Phân tích Lời&Lỗ tài khoản futures'}</span>
          <Dropdown menu={{ items: dropdownItem }} placement='bottomRight'>
            <div>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 22'
                fill='currentColor'
                aria-hidden='true'
                className='dropdown-svg'
              >
                <path d='M16.835 9.517A.976.976 0 0016.025 8h-8.05a.976.976 0 00-.81 1.517l4.025 6.048a.973.973 0 001.62 0l4.025-6.048z'></path>
              </svg>
            </div>
          </Dropdown>
        </div>
        <span className='sub-label'>{`Đã cập nhật: ${dayjs(dayjs()).utc().format('YYYY-MM-DD HH:mm:ss (UTC+0)')} `}</span>
      </div>
      <div className='right-session'>
        <div>
          <button className='new-page-button'>{'Lời&Lỗ đã đóng'}</button>
        </div>
        <div>
          <button className='modal-icon'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 22'
              fill='currentColor'
              aria-hidden='true'
              width='16'
              height='14'
            >
              <path
                style={{ textAlign: 'center', height: 20, width: 20 }}
                d='M19.5 2.25H6.75a3 3 0 00-3 3V21a.75.75 0 00.75.75H18a.75.75 0 100-1.5H5.25a1.5 1.5 0 011.5-1.5H19.5a.75.75 0 00.75-.75V3a.75.75 0 00-.75-.75zm-8.25 1.5h4.5v6.75l-1.8-1.35a.75.75 0 00-.9 0l-1.8 1.35V3.75zm7.5 13.5h-12c-.527 0-1.044.138-1.5.402V5.25a1.5 1.5 0 011.5-1.5h3V12a.75.75 0 001.2.6l2.55-1.912 2.55 1.912a.75.75 0 001.2-.6V3.75h1.5v13.5z'
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

export default memo(Heading)
