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

  const [drawerRangeValue, setDrawerRangeValue] = useState(rangePickerValue)

  const [mobileChangeQuickOption, setMobileChangeQuickOption] = useState(quickFilterValue)

  const handleMobileChangeQuickOption = (e: string) => {
    const newRangePicker = rangePickerOptions[e as keyof typeof rangePickerOptions]

    setMobileChangeQuickOption(e)

    if (!newRangePicker) {
      const newFrom = searchParams.get('from') ?? formattedDay(weekStart)
      const newTo = searchParams.get('to') ?? formattedDay(weekEnd)

      setDrawerRangeValue([dayjs(newFrom, dayFormat), dayjs(newTo, dayFormat)])

      return
    }

    const [newRangeStart, newRangeEnd] = newRangePicker

    setDrawerRangeValue([newRangeStart, newRangeEnd])
  }

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
        className='main-page-filter-drawer'
        onClose={() => {
          toggleDrawer()
          setDrawerRangeValue(rangePickerValue)
          setMobileChangeQuickOption(searchParams.get('filterType') ?? 'week')
        }}
      >
        <div>Thời gian</div>
        <Segmented
          block
          size='large'
          value={mobileChangeQuickOption}
          onChange={handleMobileChangeQuickOption}
          options={filterOptions as unknown as string[]}
        />

        <div>Ngày bắt đầu</div>
        <DatePicker
          open={false}
          size='large'
          inputReadOnly
          allowClear={false}
          value={drawerRangeValue![0]}
          onClick={toggleStartPickerDrawer}
        />

        <div>Ngày kết thúc</div>
        <DatePicker
          open={false}
          size='large'
          inputReadOnly
          allowClear={false}
          value={drawerRangeValue![1]}
          onClick={toggleEndPickerDrawer}
        />

        <Flex gap={12} className='mobile-filter-action-buttons'>
          <Button block shape='round' onClick={() => handleMobileChangeQuickOption('week')}>
            Đặt lại
          </Button>

          <Button
            block
            shape='round'
            color='default'
            variant='solid'
            onClick={() => {
              toggleDrawer()

              const params = {
                filterType: mobileChangeQuickOption,
                to: formattedDay(drawerRangeValue![1]!),
                from: formattedDay(drawerRangeValue![0]!)
              }

              setSearchParams(params)
            }}
          >
            Xác nhận
          </Button>
        </Flex>

        <Drawer
          height={420}
          destroyOnClose
          title='Chọn ngày'
          placement='bottom'
          open={openStartPickerDrawer}
          onClose={toggleStartPickerDrawer}
          className='main-page-filter-drawer'
        >
          <MobileDatePicker
            dateType='start'
            drawerRangeValue={drawerRangeValue}
            toggleDrawer={toggleStartPickerDrawer}
            setDrawerRangeValue={setDrawerRangeValue}
            setMobileChangeQuickOption={setMobileChangeQuickOption}
          />
        </Drawer>

        <Drawer
          height={420}
          destroyOnClose
          title='Chọn ngày'
          placement='bottom'
          open={openEndPickerDrawer}
          onClose={toggleEndPickerDrawer}
          className='main-page-filter-drawer'
        >
          <MobileDatePicker
            dateType='end'
            drawerRangeValue={drawerRangeValue}
            toggleDrawer={toggleEndPickerDrawer}
            setDrawerRangeValue={setDrawerRangeValue}
            setMobileChangeQuickOption={setMobileChangeQuickOption}
          />
        </Drawer>
      </Drawer>
    </Flex>
  )
}

export default memo(MainPageFilter)
