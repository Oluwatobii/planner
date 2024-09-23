'use client'

import { useState, useEffect, useCallback } from 'react'

import { CalendarComponent } from '../'

import { View, Views } from 'react-big-calendar'

const isMobile = () => typeof window !== 'undefined' && window.innerWidth < 768

export default function CalendarWrapper() {
  const [currentView, setCurrentView] = useState<View>(isMobile() ? Views.DAY : 'week')
  const [currentDate, setCurrentDate] = useState<Date>(new Date())

  const [isMobileView, setIsMobileView] = useState(isMobile())

  const handleNavigate = useCallback((date: Date) => {
    setCurrentDate(date)
  }, [])

  const handleViewChange = useCallback(
    (view: View) => {
      setCurrentView(view)
    },
    [setCurrentView]
  )

  useEffect(() => {
    const handleResize = () => {
      const mobile = isMobile()
      setIsMobileView(mobile)

      const validMobileViews: Array<'day' | 'agenda'> = [Views.DAY, Views.AGENDA]

      if (mobile && !validMobileViews.includes(currentView as 'day' | 'agenda')) {
        setCurrentView(Views.DAY)
      }
    }

    window.addEventListener('resize', handleResize)
    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, [currentView])

  /**
   * TODO: Calculate the events to request for based on the currentView
   * e.g: if currentView is week,
   * then the start and end day for the events to request for should be the
   * start of the week and end of the week.
   * */
  // console.log({ currentDate, currentView })
  return (
    <div>
      <CalendarComponent
        isMobileView={isMobileView}
        currentView={currentView}
        currentDate={currentDate}
        onNavigate={handleNavigate}
        onView={handleViewChange}
      />
    </div>
  )
}
