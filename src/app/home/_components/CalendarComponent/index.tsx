'use client'

import { useCallback, SyntheticEvent } from 'react'

import { Calendar, dateFnsLocalizer, Views, EventPropGetter } from 'react-big-calendar'

import usePopup from '@/hooks/usePopup'

import { Event as CreateEventForm } from '@/components'

// import { getEventsForWeek } from '@/actions/getEventsForWeek';

import { CalendarEvent, CalendarComponentProps, SlotSelection, EventDropArgs } from '@/lib/types'

import { EventDetails } from '@/components'

import { format, parse, startOfWeek, getDay } from 'date-fns'

import enUS from 'date-fns/locale/en-US'

import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'

import 'react-big-calendar/lib/css/react-big-calendar.css'

import 'react-big-calendar/lib/addons/dragAndDrop/styles.css'

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

const events: CalendarEvent[] = [
  {
    title: 'Orientation',
    start: new Date('2024-09-17T15:30:00'),
    end: new Date('2024-09-17T18:30:00'),
    location: 'Conference Room 1',
    busy: true,
    calendar: { id: 'random-1-uuid', name: 'Company', color: '#28a720' }
  },
  {
    title: 'REL-S47 Rollout',
    start: new Date('2024-09-18T11:00:00'),
    end: new Date('2024-09-18T12:30:00'),
    busy: true,
    calendar: { id: 'random-2-uuid', name: 'Company', color: '#28a720' }
  },
  {
    title: 'Dinner',
    start: new Date('2024-09-21T19:30:00'),
    end: new Date('2024-09-21T21:30:00'),
    busy: true,
    calendar: { id: 'random-3-uuid', name: 'Family', color: '#3f20a7' }
  },
  {
    title: 'Help Desk',
    start: new Date('2024-09-16T09:30:00'),
    end: new Date('2024-09-16T10:00:00'),
    busy: true,
    calendar: { id: 'random-4-uuid', name: 'My Calender', color: '#20a793' }
  }
]

export default function CalendarComponent({
  startDate,
  endDate,
  onNavigate,
  onView,
  currentView,
  currentDate
}: CalendarComponentProps) {
  // const events = await getEventsForWeek(startDate, endDate);

  const ReactBigCalendar = withDragAndDrop(Calendar)

  const { createPopup } = usePopup()

  const eventStyleGetter: EventPropGetter<object> = event => {
    const calendarEvent = event as CalendarEvent
    const backgroundColor = calendarEvent.calendar.color || '#3174ad'

    return {
      style: { backgroundColor }
    }
  }

  const handleSelectSlot = useCallback(
    async ({ start, end }: SlotSelection) => {
      await createPopup({
        closeable: true,
        title: `Create New Event`,
        content: ({ resolver }: { resolver: (data: unknown) => void }) => {
          // console.log('Slot Selected', { start, end })

          return (
            <CreateEventForm
              resolver={resolver}
              event={{
                title: '',
                busy: false,
                calendar: { id: '', name: '', color: '' },
                start,
                end
              }}
            />
          )
        }
      })
    },
    [createPopup]
  )

  const handleSelectEvent = useCallback(
    async (event: object, e: SyntheticEvent<HTMLElement, Event>) => {
      const calendarEvent = event as CalendarEvent

      await createPopup({
        closeable: true,
        content: ({ resolver }: { resolver: (data: unknown) => void }) => {
          // console.log('Event Selected', { event: calendarEvent })
          return <EventDetails resolver={resolver} event={calendarEvent} />
        }
        /*
        style: {
          width: '20%'
        }
        */
      })
    },
    [createPopup]
  )

  const handleEventDrop = useCallback(async ({ event, start, end, isAllDay }: EventDropArgs) => {
    console.log('On Event Drag Drop', { event, start, end, isAllDay })
    console.log('Updating Start and End Date for Event: ', { event })
  }, [])

  const handleEventResize = useCallback(async ({ event, start, end, isAllDay }: EventDropArgs) => {
    console.log('On Event Resize', { event, start, end, isAllDay })
    console.log('Updating Start or End Date for Event: ', { event })
  }, [])

  return (
    <div style={{ height: '88vh' }}>
      <ReactBigCalendar
        localizer={localizer}
        events={events}
        draggableAccessor={event => true}
        eventPropGetter={eventStyleGetter}
        onSelectEvent={handleSelectEvent}
        onEventDrop={handleEventDrop}
        onEventResize={handleEventResize}
        onSelectSlot={handleSelectSlot}
        selectable
        onNavigate={onNavigate}
        onView={onView}
        view={currentView}
        date={currentDate}
        defaultView={Views.WEEK}
      />
    </div>
  )
}
