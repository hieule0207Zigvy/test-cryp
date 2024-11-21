import { Button } from 'antd'
import dayjs, { Dayjs } from 'dayjs'
import { Dispatch, memo, RefObject, SetStateAction, useEffect, useRef, useState } from 'react'
import './styles.scss'

const dayFormat = 'YYYY-MM-DD'
const formattedDay = (day: Dayjs) => dayjs(day).format(dayFormat)

type MobileDatePickerProps = {
  dateType: 'start' | 'end'
  toggleDrawer: () => void
  setMobileChangeQuickOption: React.Dispatch<React.SetStateAction<string>>
  drawerRangeValue: [start: dayjs.Dayjs | null, end: dayjs.Dayjs | null] | null
  setDrawerRangeValue: Dispatch<SetStateAction<[start: dayjs.Dayjs | null, end: dayjs.Dayjs | null] | null>>
}

const MobileDatePicker = (props: MobileDatePickerProps) => {
  const { dateType, toggleDrawer, drawerRangeValue, setDrawerRangeValue, setMobileChangeQuickOption } = props

  const [day, setDay] = useState(1)
  const [month, setMonth] = useState(1)

  const dayRef = useRef<HTMLDivElement>(null)
  const dayWrapperRef = useRef<HTMLDivElement>(null)

  const [weekStart, weekEnd] = [dayjs().subtract(6, 'day'), dayjs()]

  const from = drawerRangeValue![0] ?? formattedDay(weekStart)
  const to = drawerRangeValue![1] ?? formattedDay(weekEnd)
  const date = dateType === 'start' ? from : to

  const initDayIndex = dayjs(date, dayFormat).date() - 1
  const initMonthIndex = dayjs(date, dayFormat).month()

  const { handleTouchStart: handleDayTouchStartItem, handleTouchEnd: handleDayTouchEndItem } = useTouchScroll(
    dayRef,
    dayWrapperRef,
    setDay,
    initDayIndex
  )

  const monthRef = useRef<HTMLDivElement>(null)
  const monthWrapperRef = useRef<HTMLDivElement>(null)
  const { handleTouchStart: handleMonthTouchStartItem, handleTouchEnd: handleMonthTouchEndItem } = useTouchScroll(
    monthRef,
    monthWrapperRef,
    setMonth,
    initMonthIndex
  )

  const handleSubmit = () => {
    const newDate = dayjs()
      .year(dayjs().year())
      .month(month)
      .date(day + 1)

    if (dateType === 'start') {
      setDrawerRangeValue((prev) => [newDate, prev![1]])
    } else {
      setDrawerRangeValue((prev) => [prev![1], newDate])
    }

    setMobileChangeQuickOption('custom')

    toggleDrawer()
  }

  return (
    <div className='filter-picker-wrapper'>
      <div className='main-page-filter-customer-date-picker-wrapper'>
        <div className='grid-item'>
          <div className='year-wrapper item'>{dayjs().year()}</div>
        </div>

        <div className='grid-item' ref={monthWrapperRef}>
          <div className='month-wrapper' ref={monthRef}>
            {Array.from({ length: 12 }, (_, index) => {
              return (
                <div
                  key={index}
                  className='item'
                  onTouchStart={handleMonthTouchStartItem}
                  onTouchEnd={handleMonthTouchEndItem(index)}
                >
                  {index + 1}
                </div>
              )
            })}
          </div>
        </div>

        <div className='grid-item' ref={dayWrapperRef}>
          <div className='day-wrapper' ref={dayRef}>
            {Array.from({ length: dayjs().month(month).daysInMonth() }, (_, index) => {
              return (
                <div
                  key={index}
                  className='item'
                  onTouchStart={handleDayTouchStartItem}
                  onTouchEnd={handleDayTouchEndItem(index)}
                >
                  {index + 1}
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <Button shape='round' color='default' variant='solid' onClick={handleSubmit}>
        OK
      </Button>
    </div>
  )
}

export default memo(MobileDatePicker)

//

//

//

const ITEM_HEIGHT = 47

const useTouchScroll = (
  ref: RefObject<HTMLDivElement>,
  wrapperRef: RefObject<HTMLDivElement>,
  setIndex: Dispatch<React.SetStateAction<number>>,
  initIndex: number
) => {
  const lastRef = useRef(Infinity)
  const positionRef = useRef(0)
  const startRef = useRef(0)
  const saveRef = useRef(0)

  const [shouldInit, setShouldInit] = useState(true)

  useEffect(() => {
    if (shouldInit && ref.current) {
      const position = (wrapperRef.current!.getBoundingClientRect().height - ITEM_HEIGHT) / 2 - initIndex * ITEM_HEIGHT
      ref.current!.style.transform = `translateY(${position}px)`
      saveRef.current = position

      setIndex(initIndex)

      setShouldInit(() => false)
    }
  }, [initIndex, ref, setIndex, shouldInit, wrapperRef])

  useEffect(() => {
    const current = ref.current!
    const wrapper = wrapperRef.current!

    const wrapperHeight = wrapper.getBoundingClientRect().height

    const center = wrapperHeight - ITEM_HEIGHT

    const max = center / 2

    const touchMoveHandler = (e: TouchEvent) => {
      if (lastRef.current === Infinity) lastRef.current = e.touches[0].clientY

      const min = -(current.getBoundingClientRect().height - (wrapperHeight + ITEM_HEIGHT) / 2)

      positionRef.current = e.touches[0].clientY - lastRef.current + saveRef.current
      positionRef.current = Math.max(min, Math.min(max, positionRef.current))

      current.style.transition = `ease 0s`
      current.style.transform = `translateY(${positionRef.current}px)`
    }

    const touchEndHandler = () => {
      lastRef.current = Infinity

      const itemIndex = Math.round(Math.abs(positionRef.current - center / 2) / ITEM_HEIGHT)
      const position = -(itemIndex * ITEM_HEIGHT) + center / 2
      saveRef.current = position

      setIndex(itemIndex)

      current.style.transition = `ease 0.2s`
      current.style.transform = `translateY(${position}px)`
    }

    current.addEventListener('touchmove', touchMoveHandler)
    current.addEventListener('touchend', touchEndHandler)

    return () => {
      current.removeEventListener('touchmove', touchMoveHandler)
      current.removeEventListener('touchend', touchEndHandler)
    }
  }, [ref, setIndex, wrapperRef])

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    startRef.current = e.changedTouches[0].clientY
    ref.current!.style.transition = `ease 0.2s`
  }

  const handleTouchEnd = (index: number) => (e: React.TouchEvent<HTMLDivElement>) => {
    if (Math.abs(e.changedTouches[0].clientY - startRef.current) > 20) return

    const position = (wrapperRef.current!.getBoundingClientRect().height - ITEM_HEIGHT) / 2 - index * ITEM_HEIGHT
    ref.current!.style.transform = `translateY(${position}px)`
    saveRef.current = position

    setIndex(index)
  }

  return { handleTouchStart, handleTouchEnd }
}
