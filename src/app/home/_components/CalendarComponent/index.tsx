'use client'

import { Calendar as ReactBigCalendar, dateFnsLocalizer, View } from 'react-big-calendar'

// import { getEventsForWeek } from '@/actions/getEventsForWeek';

import format from 'date-fns/format'

import parse from 'date-fns/parse'

import startOfWeek from 'date-fns/startOfWeek'

import getDay from 'date-fns/getDay'

import enUS from 'date-fns/locale/en-US'

import 'react-big-calendar/lib/css/react-big-calendar.css'

const locales = {
  'en-US': enUS
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales
})

type CalendarComponentProps = {
  startDate: Date
  endDate: Date
  onRangeChange: (range: { start: Date; end: Date }, view: View) => void
  currentView: View
}

export default function CalendarComponent({ startDate, endDate, onRangeChange, currentView }: CalendarComponentProps) {
  // const events = await getEventsForWeek(startDate, endDate);

  const eventStyleGetter = (event: any) => {
    const backgroundColor = event.calendar.color
    return {
      style: { backgroundColor }
    }
  }

  return (
    <div style={{ height: '500px' }}>
      <ReactBigCalendar
        localizer={localizer}
        events={[]}
        startAccessor="start"
        endAccessor="end"
        eventPropGetter={eventStyleGetter}
        style={{ height: '990px' }}
        // onRangeChange={onRangeChange}
        onView={(view: View) => onRangeChange({ start: startDate, end: endDate }, view)}
        view={currentView}
      />
    </div>
  )
}

/**
 * 
 * 
 *  title: event.title,
    start: new Date(event.start),
    end: new Date(event.end),
    calendar: event.calendar,
 * 
 * 
 */
