import { memo, useContext, useEffect, useRef } from 'react'
import './styles.scss'
import { Button, ConfigProvider, Form, Input, theme } from 'antd'
import { useForm } from 'react-hook-form'
import ControlledInput from '@/components/controlled-input'
import { MockDataContext, MockDataProvider } from '@/contexts'
import { formatDateMockData, generateChartData, toJsonMockData } from '@/utils'
import MainPage from '../main-page'
import { globalTheme } from '@/styles/global.theme.antd'
import { MockingDataFromForm, MockingValue } from '@/types/general.type'

const ConfigPage: React.FC = () => {
  const initValues = {}
  const { handleSubmit, control } = useForm({}) // initvalues

  const { mockData, setMockData, isAlreadySetDataToContext } = useContext(MockDataContext)

  const iframeRef = useRef<HTMLIFrameElement | null>(null)

  const sendDataToIframe = (data: any) => {
    if (iframeRef.current) {
      iframeRef.current.contentWindow?.postMessage({ data }, '*')
    }
  }

  // useEffect(() => {
  //   const handleBeforeUnload = (event: any) => {
  //     // Optional: Warn user about unsaved changes
  //     event.preventDefault()
  //     event.returnValue = '' // Modern browsers display a generic message
  //   }

  //   window.addEventListener('beforeunload', handleBeforeUnload)

  //   return () => {
  //     window.removeEventListener('beforeunload', handleBeforeUnload)
  //   }
  // }, [])
  return (
    <div className='config-page-wrapper'>
      <div className='content'>
        <div className='left-side'>
          <ConfigProvider
            theme={{ components: { Input: { colorBgContainer: 'white' } }, algorithm: theme.defaultAlgorithm }}
          >
            <Form
              layout='vertical'
              className='form-input'
              onFinish={handleSubmit((values) => {
                const payload = {
                  ...values,
                  profitByDateChartData: generateChartData(values.profitByDateChart, 'histogram'),
                  profitTrendChartData: generateChartData(values.profitTrendChart, 'area'),
                  totalProfitChartData: generateChartData(values.totalProfitChart, 'area')
                }
                setMockData(payload)
                sendDataToIframe(payload)
              })}
            >
              <h1>Tài sản</h1>
              <div className='input-row'>
                <ControlledInput
                  className='text-input'
                  control={control}
                  name='totalSubstance'
                  inputType='number'
                  label='Tài sản ước tính'
                  // rules={{ required: true }}
                />
                <ControlledInput
                  className='text-input'
                  control={control}
                  name='profitToday'
                  inputType='number'
                  label='Lời&Lỗ hôm nay'
                />
              </div>
              <div className='input-row'>
                <ControlledInput
                  className='text-input'
                  control={control}
                  name='profitByWeek'
                  inputType='number'
                  label='Lời/Lỗ 7 ngày'
                />
                <ControlledInput
                  className='text-input'
                  control={control}
                  name='profitByMonth'
                  inputType='number'
                  label='Lời/Lỗ 30 ngày'
                />
              </div>

              <h1>Tổng Lời/Lỗ</h1>
              <ControlledInput
                className='text-input'
                control={control}
                name='totalProfitChart'
                inputType='number'
                label='Tổng Lời/Lỗ'
                // rules={{ required: true }}
              />
              {/* <ControlledInput
                className='area-input'
                control={control}
                name='totalProfitChartData'
                inputType='textArea'
                label='Lời/Lỗ 30 ngày - chart'
              /> */}
              <span>{`Sample Data:[ { "value" : 16, "time":"2024-09-12"},{ "value" : -17, "time":"2024-09-13", "color": "red"} ] `}</span>
              <h1>Lời/Lỗ ngày</h1>
              <ControlledInput
                className='text-input'
                control={control}
                name='profitByDateChart'
                inputType='number'
                label='Lời&Lỗ hôm nay'
                // rules={{ required: true }}
              />
              {/* <ControlledInput
                className='area-input'
                control={control}
                name='profitByDateChartData'
                inputType='textArea'
                label='Lời/Lỗ 30 ngày - chart'
              /> */}
              <span>{`Sample Data:[ { "value" : 16, "time":"2024-09-12"},{ "value" : -17, "time":"2024-09-13", "color": "red"} ] `}</span>
              <h1>Xu hướng tài sản</h1>
              <ControlledInput
                className='text-input'
                control={control}
                name='profitTrendChart'
                inputType='number'
                label='Tài sản hôm nay'
                // rules={{ required: true }}
              />
              {/* <ControlledInput
                className='area-input'
                control={control}
                name='profitTrendChartData'
                inputType='textArea'
                label='Lời/Lỗ 30 ngày - chart'
              /> */}
              <span>{`Sample Data:[ { "value" : 16, "time":"2024-09-12"},{ "value" : -17, "time":"2024-09-13", "color": "red"} ] `}</span>
              <Button className='submit-button' htmlType='submit'>
                Submit
              </Button>
            </Form>
          </ConfigProvider>
        </div>
        {/* <div className='right-side'>
          <span className='preview-label'>Preview</span>
          <iframe src='http://localhost:3000' className='iframe-item' ref={iframeRef} />
        </div> */}
        <div className='iphone-screen'>
          <div className='status-bar'>
            <span className='time'>17:58</span>
            <div className='icons'>
              <div className='img-wrapper'>
                <span className='signal'>
                  <img
                    // class='gb-image'
                    alt='ios15-dual-sim-status-bar-icon'
                    src='/cellularconnection.png'
                    className='image-icon-cellular'
                    // style={{ maxWidth: 'min(100%,69px)', width: '100%', height: '18px' }}
                  />
                </span>
              </div>
              <div className='img-wrapper'>
                <span className='wifi'>
                  <img
                    // class='gb-image'
                    alt='ios15-wifi-icon'
                    src='/wifi.png'
                    className='image-icon-wifi'
                    // height='72'
                    // width='138'
                    // style={{ maxWidth: 'min(100%,69px)', width: '100%', height: '20px' }}
                  />
                </span>
              </div>
              <div className='img-wrapper-battery'>
                <span className='battery'>
                  <img
                    // class='gb-image'
                    alt='ios15-alarm-status-icon'
                    src='/battery.png'
                    className='image-icon-battery'
                    // style={{ maxWidth: 'min(100%,69px)', width: '100%', height: '28px' }}
                  />
                </span>
              </div>
            </div>
          </div>

          <div className='content'>
            <iframe src='http://localhost:3000' sandbox='allow-same-origin allow-scripts' ref={iframeRef}></iframe>
          </div>
          <div className='home-bar'></div>
        </div>
      </div>
    </div>
  )
}

export default memo(ConfigPage)
