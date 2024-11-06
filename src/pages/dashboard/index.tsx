import { Button, Input } from 'antd'
import { memo } from 'react'

const Dashboard = () => {
  return (
    <>
      <Button shape='round'>hihi</Button>
      <Button shape='round' type='primary'>
        haha
      </Button>
      <Input />
    </>
  )
}

export default memo(Dashboard)
