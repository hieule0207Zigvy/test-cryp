import ControlledInput from '@/components/controlled-input'
import { MockDataContext } from '@/contexts'
import { MockingValue } from '@/types/general.type'
import { formatDateMockData, toJsonMockData } from '@/utils'
import { Button, ConfigProvider, Form, theme } from 'antd'
import { memo, useContext, useRef } from 'react'
import { useForm } from 'react-hook-form'
import './styles.scss'

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
                console.log('TCL - file: index.tsx:28 - values:', values)
                const toJsonProfitByDateChartData = toJsonMockData(values.profitByDateChartData)
                const toJsonProfitTrendChartData = toJsonMockData(values.profitTrendChartData)
                const toJsonTotalProfitChartData = toJsonMockData(values.totalProfitChartData)
                const formattedDateProfitByDateChartData: MockingValue[] =
                  formatDateMockData(toJsonProfitByDateChartData)
                const formattedDateToJsonProfitTrendChartData = formatDateMockData(toJsonProfitTrendChartData)
                const formattedDateToJsonTotalProfitChartData = formatDateMockData(toJsonTotalProfitChartData)
                const payload = {
                  ...values,
                  profitByDateChartData: formattedDateProfitByDateChartData,
                  profitTrendChartData: formattedDateToJsonProfitTrendChartData,
                  totalProfitChartData: formattedDateToJsonTotalProfitChartData
                }
                console.log('TCL - file: index.tsx:35 - onFinish={handleSubmit - payload:', payload)
                setMockData(payload)
                sendDataToIframe(payload)
              })}
            >
              <h1>Tài sản</h1>
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

              <h1>Tổng Lời/Lỗ</h1>
              <ControlledInput
                className='text-input'
                control={control}
                name='totalProfitChart'
                inputType='number'
                label='Tổng Lời/Lỗ'
                // rules={{ required: true }}
              />
              <ControlledInput
                className='area-input'
                control={control}
                name='totalProfitChartData'
                inputType='textArea'
                label='Lời/Lỗ 30 ngày - chart'
              />
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
              <ControlledInput
                className='area-input'
                control={control}
                name='profitByDateChartData'
                inputType='textArea'
                label='Lời/Lỗ 30 ngày - chart'
              />
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
              <ControlledInput
                className='area-input'
                control={control}
                name='profitTrendChartData'
                inputType='textArea'
                label='Lời/Lỗ 30 ngày - chart'
              />
              <span>{`Sample Data:[ { "value" : 16, "time":"2024-09-12"},{ "value" : -17, "time":"2024-09-13", "color": "red"} ] `}</span>
              <Button className='submit-button' htmlType='submit'>
                Submit
              </Button>
            </Form>
          </ConfigProvider>
        </div>
        <div className='right-side'>
          <span className='preview-label'>Preview</span>
          <iframe src='http://localhost:3000' className='iframe-item' ref={iframeRef} />
        </div>
      </div>
    </div>
  )
}

export default memo(ConfigPage)
