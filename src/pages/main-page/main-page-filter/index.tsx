import { DatePicker, Flex, Segmented } from 'antd'
import dayjs, { Dayjs } from 'dayjs'
import { memo, useState } from 'react'
import './styles.scss'
import { useSearchParams } from 'react-router-dom'

type RangeValueType = [start: Dayjs | null, end: Dayjs | null] | null

type FilterOption = { label: string; value?: RangeValueType }

const filterOptions: { week: FilterOption; month: FilterOption; custom: FilterOption } = {
  week: { label: '7 ngày', value: [dayjs().subtract(6, 'day'), dayjs()] },
  month: { label: '30 ngày', value: [dayjs().subtract(29, 'day'), dayjs()] },
  custom: { label: 'Tùy chỉnh' }
}

const MainPageFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const [quickFilterOption, setQuickFilterOption] = useState(filterOptions.week.label)
  const [dates, setDates] = useState<RangeValueType>(filterOptions.week.value!)

  const handleChangeQuickFilter = (e: string) => {
    setQuickFilterOption(e)

    const option = Object.keys(filterOptions).find(
      (key) => filterOptions[key as keyof typeof filterOptions].label === e
    ) as keyof typeof filterOptions

    const newDates = filterOptions[option]?.value ?? dates
    setDates(newDates)
    setSearchParams({ from: dayjs(newDates![0])?.format('YYYY-MM-DD'), to: dayjs(newDates![1])?.format('YYYY-MM-DD') })
  }

  const handleChangeDates = (e: RangeValueType) => {
    setDates(e)
    setQuickFilterOption(filterOptions.custom.label)
    setSearchParams({ from: dayjs(e![0])?.format('YYYY-MM-DD'), to: dayjs(e![1])?.format('YYYY-MM-DD') })
  }

  return (
    <Flex gap={12} className='main-page-filter'>
      <Segmented
        size='large'
        value={quickFilterOption}
        onChange={handleChangeQuickFilter}
        options={Object.values(filterOptions).map((option) => option.label)}
      />

      <DatePicker.RangePicker
        value={dates}
        separator='-'
        allowClear={false}
        onChange={handleChangeDates}
        format={(value) => (value ? `${value.format('YYYY-MM-DD')} (UTC+0)` : '')}
      />
    </Flex>
  )
}

export default memo(MainPageFilter)
