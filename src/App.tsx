import { ConfigProvider } from 'antd'
import { memo } from 'react'
import AppRouter from './router/AppRouter'
import { globalTheme } from './styles/global.theme.antd'

function App() {
  return (
    <div className='app'>
      <ConfigProvider theme={globalTheme}>
        <AppRouter />
      </ConfigProvider>
    </div>
  )
}

export default memo(App)
