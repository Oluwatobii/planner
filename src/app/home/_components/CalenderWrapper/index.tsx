'use client'

import { useState, useCallback } from 'react'

import { CalendarComponent } from '../'

import { View, DateRange } from 'react-big-calendar'

import { startOfWeek, endOfWeek, startOfMonth, endOfMonth, startOfDay, endOfDay } from 'date-fns'

export default function CalendarWrapper() {
  const [startDate, setStartDate] = useState<Date>(startOfWeek(new Date(), { weekStartsOn: 1 }))
  const [endDate, setEndDate] = useState<Date>(endOfWeek(new Date(), { weekStartsOn: 1 }))
  const [currentView, setCurrentView] = useState<View>('week')
  const [currentDate, setCurrentDate] = useState<Date>(new Date())

  const handleNavigate = useCallback((date: Date) => {
    setCurrentDate(date)
    setStartDate(startOfWeek(date, { weekStartsOn: 1 }))
    setEndDate(endOfWeek(date, { weekStartsOn: 1 }))
  }, [])

  const handleViewChange = useCallback(
    (view: View) => {
      setCurrentView(view)
    },
    [setCurrentView]
  )

  const handleRangeChange = (range: DateRange, view: View) => {
    // console.log({ view, range })
    setCurrentView(view)

    switch (view) {
      case 'month':
        setStartDate(startOfMonth(range.start as Date))
        setEndDate(endOfMonth(range.end as Date))
        break
      /*
      case 'year':
        setStartDate(startOfYear(range.start as Date));
        setEndDate(endOfYear(range.end as Date));
        break;
      */
      case 'week':
        setStartDate(startOfWeek(range.start as Date, { weekStartsOn: 1 }))
        setEndDate(endOfWeek(range.end as Date, { weekStartsOn: 1 }))
        break
      case 'day':
        setStartDate(startOfDay(range.start as Date))
        setEndDate(endOfDay(range.end as Date))
        break
      default:
        setStartDate(startOfWeek(range.start as Date, { weekStartsOn: 1 }))
        setEndDate(endOfWeek(range.end as Date, { weekStartsOn: 1 }))
        break
    }
  }

  return (
    <div>
      <CalendarComponent
        startDate={startDate}
        endDate={endDate}
        onRangeChange={handleRangeChange}
        currentView={currentView}
        currentDate={currentDate}
        onNavigate={handleNavigate}
        onView={handleViewChange}
      />
    </div>
  )
}
