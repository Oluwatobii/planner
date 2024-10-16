'use client'

import React, { useState } from 'react'

import useSWR from 'swr'

import useSWRMutation from 'swr/mutation'

import { FaTrash, FaChevronDown, FaChevronUp } from 'react-icons/fa'

import { fetcher } from '@/utils/helpers'

import usePopup from '@/hooks/usePopup'

import { z } from 'zod'

import { Calendar } from '@/lib/types'

const calendarSchema = z.object({
  name: z.string().min(1, 'Calendar name is required'),
  color: z.string().regex(/^#([0-9A-F]{3}){1,2}$/i, 'Calendar color must be a valid hex code')
})

export default function Calendars() {
  const { createPopup, popups } = usePopup()

  const [formData, setFormData] = useState({ name: '', color: '#0000' })
  const [showCalendars, setShowCalendars] = useState(false)

  const [editingCalendar, setEditingCalendar] = useState<{
    id: string
    name: string
    color: string
  } | null>(null)

  const { data: calendars = [], mutate } = useSWR<Calendar[]>('/api/calendars', fetcher)

  const createCalendar = async (url: string, { arg }: { arg: { name: string; color: string } }) => {
    const validation = calendarSchema.safeParse(arg)
    if (!validation.success) {
      throw new Error(validation.error.errors[0].message)
    }

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(arg)
    })

    if (!response.ok) {
      throw new Error('Failed to create calendar')
    }

    return response.json()
  }

  const { trigger: createTrigger } = useSWRMutation('/api/calendars', createCalendar, {
    populateCache: (newCalendar, calendars) => [...(calendars || []), newCalendar],
    revalidate: false,
    onError: error => console.error('Error creating calendar:', error)
  })

  const { trigger: updateTrigger } = useSWRMutation(
    '/api/calendars',
    (url: string, { arg }: { arg: { id: string; data: Partial<Calendar> } }) =>
      fetcher(`${url}/${arg.id}`, 'PUT', arg.data)
  )

  const { trigger: deleteTrigger } = useSWRMutation('/api/calendars', (url: string, { arg }: { arg: { id: string } }) =>
    fetcher(`${url}/${arg.id}`, 'DELETE')
  )

  const handleCreateCalendar = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const newCalendar: Calendar = await createTrigger({ name: formData.name, color: formData.color })
      mutate([...calendars, newCalendar], false)
      setFormData({ name: '', color: '#000000' })
    } catch (err) {
      console.error('Error creating calendar:', err)
    }
  }

  const handleUpdateCalendar = async ({ id, data }: { id: string; data: Partial<Calendar> }) => {
    try {
      await updateTrigger({ id, data })

      mutate(
        calendars.map(calendar => (calendar.id === id ? { ...calendar, ...data } : calendar)),
        false
      )
    } catch (error) {
      console.error('Error updating calendar:', error)
    }
  }

  const handleDeleteCalendar = async (id: string) => {
    try {
      await deleteTrigger({ id })

      mutate(
        calendars.filter(calendar => calendar.id !== id),
        false
      )
    } catch (error) {
      console.error('Error deleting calendar:', error)
    }
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
                    value={editingCalendar?.id === id ? editingCalendar.name : name}
                    onChange={e => {
                      setEditingCalendar(prev => {
                        if (!prev || prev.id !== id) {
                          return { id, name: e.target.value, color }
                        }

                        return { ...prev, name: e.target.value }
                      })
                    }}
                    onBlur={async () => {
                      if (editingCalendar) {
                        handleUpdateCalendar({
                          id: editingCalendar.id,
                          data: { name: editingCalendar.name, color: editingCalendar.color }
                        })
                      }
                    }}
                    className="block w-full p-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-gray-800 dark:text-white"
                  />

                  <input
                    type="color"
                    value={editingCalendar?.id === id ? editingCalendar.color : color}
                    onChange={e => {
                      setEditingCalendar(prev => {
                        if (!prev || prev.id !== id) {
                          return { id, name, color: e.target.value }
                        }

                        return { ...prev, color: e.target.value }
                      })
                    }}
                    onBlur={async () => {
                      if (editingCalendar) {
                        handleUpdateCalendar({
                          id: editingCalendar.id,
                          data: { name: editingCalendar.name, color: editingCalendar.color }
                        })
                      }
                    }}
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

                      await handleDeleteCalendar(id)
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
