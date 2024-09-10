'use client'

import { useState } from 'react'

import { CalendarComponent } from '../'

import { View, DateRange } from 'react-big-calendar'

import { startOfWeek, endOfWeek, startOfMonth, endOfMonth, startOfYear, endOfYear } from 'date-fns'

export default function CalendarWrapper() {
  const [startDate, setStartDate] = useState<Date>(startOfWeek(new Date(), { weekStartsOn: 1 }))
  const [endDate, setEndDate] = useState<Date>(endOfWeek(new Date(), { weekStartsOn: 1 }))
  const [currentView, setCurrentView] = useState<View>('week')

  const handleRangeChange = (range: DateRange, view: View) => {
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
      />
    </div>
  )
}
