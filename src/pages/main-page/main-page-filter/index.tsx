import { Button, DatePicker, Drawer, Flex, Grid, Segmented } from 'antd'
import dayjs, { Dayjs } from 'dayjs'
import { memo, useCallback, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import MobileDatePicker from './mobile-date-picker'
import './styles.scss'

type RangePickerValueType = [start: Dayjs | null, end: Dayjs | null] | null

const filterOptions = [
  { label: '7 ngày', value: 'week' },
  { label: '30 ngày', value: 'month' },
  { label: 'Tùy chỉnh', value: 'custom' }
]

const responsiveFilterOptions = [
  { label: '7 ngày qua', value: 'week' },
  { label: '30 ngày gần nhất', value: 'month' }
]

const rangePickerOptions = {
  week: [dayjs().subtract(6, 'day'), dayjs()],
  month: [dayjs().subtract(29, 'day'), dayjs()]
}

const [weekStart, weekEnd] = rangePickerOptions.week

const dayFormat = 'YYYY-MM-DD'

const formattedDay = (day: Dayjs) => dayjs(day).format(dayFormat)

const MainPageFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const { lg, sm } = Grid.useBreakpoint()
  const [openRangePicker, setOpenRangePicker] = useState(false)

  const quickFilterValue = (searchParams.get('filterType') ?? 'week') as string

  const rangePickerValue = useMemo(() => {
    const from = searchParams.get('from')
    const to = searchParams.get('to')

    const start = from ? dayjs(from) : weekStart
    const end = to ? dayjs(to) : weekEnd

    return [start, end] as RangePickerValueType
  }, [searchParams])

  const handleChangeQuickFilter = useCallback(
    (e: string) => {
      const newRangePickerValue = rangePickerOptions[e as keyof typeof rangePickerOptions]

      if (!newRangePickerValue) {
        return setSearchParams({
          filterType: e,
          from: searchParams.get('from') ?? formattedDay(weekStart),
          to: searchParams.get('to') ?? formattedDay(weekEnd)
        })
      }

      const [newRangeStart, newRangeEnd] = newRangePickerValue

      setSearchParams({
        filterType: e,
        from: formattedDay(newRangeStart),
        to: formattedDay(newRangeEnd)
      })
    },
    [searchParams, setSearchParams]
  )

  const handleChangeRangePicker = (e: RangePickerValueType) => {
    setSearchParams({
      filterType: 'custom',
      from: formattedDay(e![0]!),
      to: formattedDay(e![1]!)
    })
    setOpenRangePicker(false)
  }

  const [openDrawer, setOpenDrawer] = useState(false)
  const toggleDrawer = () => setOpenDrawer(!openDrawer)

  const [openStartPickerDrawer, setOpenStartPickerDrawer] = useState(false)
  const [openEndPickerDrawer, setOpenEndPickerDrawer] = useState(false)

  const toggleStartPickerDrawer = () => setOpenStartPickerDrawer((prev) => !prev)
  const toggleEndPickerDrawer = () => setOpenEndPickerDrawer((prev) => !prev)

  return (
    <Flex gap={12} className='main-page-filter'>
      {lg && (
        <Segmented
          size='large'
          value={quickFilterValue}
          onChange={handleChangeQuickFilter}
          options={filterOptions as unknown as string[]}
        />
      )}

      {sm && (
        <DatePicker.RangePicker
          separator='-'
          allowClear={false}
          open={openRangePicker}
          value={rangePickerValue}
          onOpenChange={setOpenRangePicker}
          onChange={handleChangeRangePicker}
          popupClassName='main-profile-filter-range-picker-popup'
          format={(value) => (value ? `${value.format(dayFormat)} (UTC+0)` : '')}
          presets={responsiveFilterOptions.map((option) => ({
            label: option.label,
            value: rangePickerOptions[option.value as keyof typeof rangePickerOptions] as any
          }))}
        />
      )}

      <Button shape='round' onClick={toggleDrawer}>
        Tùy chỉnh
      </Button>

      <Drawer
        title='Lọc'
        push={false}
        open={openDrawer}
        placement='bottom'
        onClose={toggleDrawer}
        className='main-page-filter-drawer'
      >
        <div>Thời gian</div>
        <Segmented
          block
          size='large'
          value={quickFilterValue}
          onChange={handleChangeQuickFilter}
          options={filterOptions as unknown as string[]}
        />

        <div>Ngày bắt đầu</div>
        <DatePicker
          open={false}
          size='large'
          inputReadOnly
          value={rangePickerValue![0]}
          onClick={toggleStartPickerDrawer}
        />

        <div>Ngày kết thúc</div>
        <DatePicker
          open={false}
          size='large'
          inputReadOnly
          value={rangePickerValue![1]}
          onClick={toggleEndPickerDrawer}
        />

        <Drawer
          height={420}
          destroyOnClose
          placement='bottom'
          open={openStartPickerDrawer}
          onClose={toggleStartPickerDrawer}
          className='main-page-filter-drawer'
        >
          <MobileDatePicker dateType='start' />
        </Drawer>

        <Drawer
          height={420}
          destroyOnClose
          placement='bottom'
          open={openEndPickerDrawer}
          onClose={toggleEndPickerDrawer}
          className='main-page-filter-drawer'
        >
          <MobileDatePicker dateType='end' />
        </Drawer>
      </Drawer>
    </Flex>
  )
}

export default memo(MainPageFilter)
