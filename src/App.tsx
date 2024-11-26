import { ConfigProvider } from 'antd'
import { memo } from 'react'
import AppRouter from './router/AppRouter'
import { globalTheme } from './styles/global.theme.antd'
import { MockDataProvider } from './contexts'

function App() {
  return (
    <div className='app'>
      <ConfigProvider theme={globalTheme}>
        <MockDataProvider>
          <AppRouter />
        </MockDataProvider>
      </ConfigProvider>
    </div>
  )
}

export default memo(App)
