'use client'

import { useState, useContext } from 'react'

import timezones from 'timezones-list'

import { AppContext } from '@/contexts/Application'

export default function Preferences() {
  const context = useContext(AppContext)

  const [timezone, setTimezone] = useState(context?.timezone)

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">Preferences</h2>
      <div className="mb-4">
        <label className="block text-gray-700 dark:text-gray-200 mb-2">Select Timezone</label>
        <select
          value={timezone}
          disabled={true}
          onChange={event => setTimezone(event.target.value)}
          className="block w-full p-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-gray-800 dark:text-white"
        >
          <option value="" disabled>
            Select Timezone
          </option>
          {timezones.map(({ label, tzCode, name, utc }, idx) => (
            <option key={idx} value={tzCode}>
              {label}
            </option>
          ))}
        </select>
      </div>
      <button
        disabled={true}
        className="px-4 py-2 bg-gradient-to-br from-purple-600 via-pink-600 to-purple-800 text-white rounded-md hover:from-purple-700 hover:via-pink-700 hover:to-purple-900"
      >
        Update Timezone
      </button>
    </div>
  )
}
