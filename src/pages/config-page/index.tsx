import { memo } from 'react'
import './styles.scss'

const ConfigPage: React.FC = () => {
  return (
    <div className='config-page-wrapper'>
      <div className='content'>
        <div className='left-side'></div>
        <div className='right-side'>
          <span className='preview-label'>Preview</span>
          <iframe src='http://localhost:3000' className='iframe-item'></iframe>
        </div>
      </div>
    </div>
  )
}

export default memo(ConfigPage)
