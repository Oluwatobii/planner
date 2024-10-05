'use client'

import React, { useState } from 'react'

import { FaTrash, FaChevronDown, FaChevronUp } from 'react-icons/fa'

import usePopup from '@/hooks/usePopup'

type Calendar = {
  id: string
  name: string
  color: string
}

export default function Calendars() {
  const { createPopup, popups } = usePopup()

  const [showCalendars, setShowCalendars] = useState(false)

  const [calendars, setCalendars] = useState<Calendar[]>([
    { id: '1', name: 'National Holiday', color: '#00ff00' },
    { id: '2', name: 'Personal', color: '#1d3dbf' },
    { id: '3', name: 'Work', color: '#ff0000' }
  ])

  /** Create New Calender */
  const [formData, setFormData] = useState({ name: '', color: '' })

  const handleCreateCalendar = (e: React.FormEvent) => {
    e.preventDefault()

    if (formData.name.trim()) {
      const newCalendar: Calendar = {
        id: Math.random().toString(36),
        ...formData
      }

      setCalendars([...calendars, newCalendar])
      setFormData({ name: '', color: '' })
    }
  }

  const handleUpdateCalendar = ({ id, data }: { id: string; data: Partial<Calendar> }) => {
    console.log({ id, data })
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">Create New Calendar</h2>
      <form onSubmit={handleCreateCalendar} className="mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-200">Calendar Name</label>
          <input
            type="text"
            className="mt-1 block w-full p-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-gray-800 dark:text-white"
            placeholder="Enter calendar name"
            value={formData.name}
            onChange={e => setFormData(formData => ({ ...formData, name: e.target.value }))}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-200">Calendar Color</label>
          <input
            type="color"
            className="mt-1 block w-16 h-10 p-1 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md"
            value={formData.color}
            onChange={e => setFormData(formData => ({ ...formData, color: e.target.value }))}
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-gradient-to-br from-purple-600 via-pink-600 to-purple-800 text-white rounded-md hover:from-purple-700 hover:via-pink-700 hover:to-purple-900"
        >
          Create Calendar
        </button>
      </form>

      <hr />

      <div className="bg-white dark:bg-gray-800 p-6 mt-4">
        <div
          onClick={() => setShowCalendars(!showCalendars)}
          className="cursor-pointer flex justify-between items-center text-xl font-semibold text-gray-800 dark:text-white"
        >
          <h3>Your Calendars</h3>
          {showCalendars ? <FaChevronUp /> : <FaChevronDown />}
        </div>

        <ul
          className={`mt-4 overflow-hidden transition-max-height duration-500 ease-in-out ${
            showCalendars ? 'max-h-screen' : 'max-h-0'
          }`}
        >
          {calendars.map(({ id, name, color }) => (
            <li key={id} className="mb-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <input
                    type="text"
                    value={name}
                    onChange={evt =>
                      setCalendars(prevCalendars =>
                        prevCalendars.map(calendar =>
                          calendar.id === id ? { ...calendar, name: evt.target.value } : calendar
                        )
                      )
                    }
                    onBlur={evt => handleUpdateCalendar({ id, data: { name: evt.target.value } })}
                    className="block w-full p-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-gray-800 dark:text-white"
                  />

                  <input
                    type="color"
                    value={color}
                    onChange={evt =>
                      setCalendars(prevCalendars =>
                        prevCalendars.map(calendar =>
                          calendar.id === id ? { ...calendar, color: evt.target.value } : calendar
                        )
                      )
                    }
                    onBlur={evt => handleUpdateCalendar({ id, data: { color: evt.target.value } })}
                    className="ml-4 w-10 h-10 p-1 border border-gray-300 dark:border-gray-600 rounded-md"
                  />
                </div>

                <div>
                  <button
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
                        title: `Delete Calendar`,
                        content: ({ resolver }) =>
                          popups.confirm({
                            resolver,
                            message: `Are you sure you want to delete the Calendar: "${name}"? This action cannot be undone and will delete all events associated with the calendar.`,
                            options
                          })
                      })

                      if (confirm === options[1].text) return

                      setCalendars(prevCalendars => prevCalendars.filter(calendar => calendar.id !== id))
                    }}
                    className="px-2 py-1 bg-red-600 text-white rounded-md hover:bg-red-700"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
