import { CalendarEvent } from '@/lib/types'

import { Event as EventForm } from '@/components'

import usePopup from '@/hooks/usePopup'

import { format } from 'date-fns'

import { FaMapMarkerAlt, FaUserClock, FaPen, FaTrash } from 'react-icons/fa'

export default function EventDetails({ resolver, event }: { resolver: (data: unknown) => void; event: CalendarEvent }) {
  const { createPopup, popups } = usePopup()

  const formattedStart = typeof event.start === 'string' ? event.start : format(event.start, 'PPpp')
  const formattedEnd = typeof event.end === 'string' ? event.end : format(event.end, 'PPpp')

  return (
    <div className=" w-full dark:bg-gray-800 rounded-lg">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">{event.title}</h2>

      <div className="text-gray-600 dark:text-gray-300 mb-2">
        <span className="block">
          <strong>Start:</strong> {formattedStart}
        </span>
        <span className="block">
          <strong>End:</strong> {formattedEnd}
        </span>
      </div>

      {event.location && (
        <div className="flex items-center text-gray-600 dark:text-gray-300 mb-2">
          <FaMapMarkerAlt className="mr-2 text-gray-600 dark:text-gray-300" />
          <span>{event.location}</span>
        </div>
      )}

      <div className="flex items-center text-gray-600 dark:text-gray-300 mb-2">
        <FaUserClock className="mr-2 text-gray-600 dark:text-gray-300" />
        <span>{event.busy ? 'Busy' : 'Available'}</span>
      </div>

      <div className="flex items-center text-gray-600 dark:text-gray-300 mb-4">
        <span
          className="inline-block w-3 h-3 rounded-full mr-2"
          style={{ backgroundColor: event.calendar.color }}
        ></span>
        <span>{event.calendar.name}</span>
      </div>

      <div className="flex justify-between">
        <button
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          onClick={async () =>
            await createPopup({
              closeable: true,
              title: `Create Event`,
              content: ({ resolver }: { resolver: (data: unknown) => void }) => (
                <EventForm resolver={resolver} event={event} />
              )
            })
          }
        >
          <FaPen className="mr-2" /> Edit
        </button>
        <button
          className="flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          onClick={async () => {
            const options = [
              {
                text: 'Yes',
                type: 'danger'
              },
              {
                text: 'No',
                type: 'confirm'
              }
            ]

            const confirm = await createPopup({
              closeable: true,
              title: `Delete Event`,
              content: ({ resolver }) =>
                popups.confirm({
                  resolver,
                  message: `Are you sure you want to delete the event ${event.title}? This action cannot be undone.`,
                  options
                })
            })

            if (confirm === options[1].text) return

            console.log('Deleting Event', { confirm })
          }}
        >
          <FaTrash className="mr-2" /> Delete
        </button>
      </div>
    </div>
  )
}
