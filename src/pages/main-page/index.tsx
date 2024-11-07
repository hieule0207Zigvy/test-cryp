import { memo } from 'react'

import './styles.scss'
import Heading from './heading'
import Information from './information'

const MainPage: React.FC = (props) => {
  return (
    <div className='main-page-wrapper'>
      <Heading />
      <Information />
    </div>
  )
}
export default memo(MainPage)
