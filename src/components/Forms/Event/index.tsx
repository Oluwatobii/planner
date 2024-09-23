'use client'

import React, { useState, useEffect, useCallback, useMemo } from 'react'

import { stringOrDate } from 'react-big-calendar'

import { FaTimes, FaSave } from 'react-icons/fa'

import { format } from 'date-fns'

import { CalendarEvent } from '@/lib/types'

function formatDate(date: stringOrDate | undefined): string {
  return date ? (typeof date === 'string' ? date : format(date, "yyyy-MM-dd'T'HH:mm")) : ''
}

const useInitializeFormData = (event: CalendarEvent | undefined, calendars: { id: string }[]) =>
  useCallback(() => {
    return {
      title: event?.title || '',
      startDate: formatDate(event?.start),
      endDate: formatDate(event?.end),
      location: event?.location || '',
      isBusy: event?.busy || false,
      calendar: event?.calendar?.id || calendars[0]?.id || ''
    }
  }, [event, calendars])

export default function EventDetails({
  resolver,
  event
}: {
  resolver: (data: unknown) => void
  event?: CalendarEvent
}) {
  const calendars = useMemo(
    () => [
      { id: 'random-1-uuid', name: 'My Calender', color: '#20a793' },
      { id: 'random-2-uuid', name: 'Family', color: '#3f20a7' }
    ],
    []
  )

  const initializeFormData = useInitializeFormData(event, calendars)

  const [formData, setFormData] = useState(() => initializeFormData())

  const handleDurationChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const duration = event.target.value

    if (formData.startDate) {
      // Parse the startDate as a UTC date
      const start = new Date(formData.startDate)

      // Add the duration to the UTC start date
      let end: Date
      switch (duration) {
        case '15mins':
          end = new Date(start.getTime() + 15 * 60 * 1000) // Add 15 minutes
          break
        case '30mins':
          end = new Date(start.getTime() + 30 * 60 * 1000) // Add 30 minutes
          break
        case '1hr':
          end = new Date(start.getTime() + 60 * 60 * 1000) // Add 1 hour
          break
        case '5hrs':
          end = new Date(start.getTime() + 5 * 60 * 60 * 1000) // Add 5 hours
          break
        default:
          end = start // No change or custom logic
      }

      // Ensure the end date is formatted correctly for `datetime-local` input
      const endDateFormatted = end.toISOString().slice(0, 16)

      // Set the form data with the formatted end date (in UTC)
      setFormData(formData => ({
        ...formData,
        endDate: endDateFormatted // Format to `YYYY-MM-DDTHH:MM` (still UTC)
      }))
    }
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = event.target

    // Handle checkboxes separately
    const checked = type === 'checkbox' ? (event.target as HTMLInputElement).checked : undefined

    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // Handle form submission logic here
    console.log({
      formData
    })
  }

  useEffect(() => {
    setFormData(initializeFormData())
  }, [initializeFormData])

  return (
    <form className="p-2 dark:bg-gray-800 rounded-lg  mx-auto" onSubmit={handleSubmit}>
      <div className="mb-2">
        <label htmlFor="calendar" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Select Calendar
        </label>
        <select
          id="calendar"
          name="calender"
          value={formData.calendar}
          onChange={handleInputChange}
          className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        >
          {calendars.map(calendar => (
            <option key={calendar.id} value={calendar.id}>
              {calendar.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-2">
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Event
        </label>
        <input
          id="title"
          type="text"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>

      <div className="flex flex-col sm:flex-row sm:space-x-4 mb-2">
        <div className="flex-grow">
          <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Start Date
          </label>
          <input
            id="startDate"
            name="startDate"
            type="datetime-local"
            value={formData.startDate}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        <div className="flex-grow">
          <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            End Date
          </label>
          <input
            id="endDate"
            name="endDate"
            type="datetime-local"
            value={formData.endDate}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        <div className="flex-grow">
          <label htmlFor="duration" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Duration
          </label>
          <select
            id="duration"
            onChange={handleDurationChange}
            className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          >
            <option value="">Custom</option>
            <option value="15mins">15 mins</option>
            <option value="30mins">30 mins</option>
            <option value="1hr">1 hour</option>
            <option value="5hrs">5 hours</option>
          </select>
        </div>
      </div>

      <div className="mb-2">
        <label htmlFor="location" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Location
        </label>
        <input
          id="location"
          name="location"
          type="text"
          value={formData.location}
          onChange={handleInputChange}
          className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>

      <div className="flex items-center mb-2">
        <input
          id="isBusy"
          name="isBusy"
          type="checkbox"
          checked={formData.isBusy}
          onChange={handleInputChange}
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600 rounded"
        />
        <label htmlFor="isBusy" className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
          Mark as Busy
        </label>
      </div>

      <div className="flex justify-between mt-6">
        <button
          type="submit"
          className="flex items-center px-2 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm sm:px-4 sm:py-2 sm:text-base"
        >
          <FaSave className="hidden sm:inline mr-2" />
          <span>Save</span>
        </button>
        <button
          type="button"
          onClick={() => resolver(null)}
          className="flex items-center ml-auto px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 text-sm sm:px-4 sm:py-2 sm:text-base"
        >
          <FaTimes className="hidden sm:inline mr-2" />
          <span>Cancel</span>
        </button>
      </div>
    </form>
  )
}
