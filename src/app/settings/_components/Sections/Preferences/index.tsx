import { useState } from 'react'

const timezones = ['GMT', 'UTC', 'EST', 'CST', 'MST', 'PST', 'CET', 'EET', 'IST', 'JST', 'AEST']

export default function Preferences() {
  const [selectedTimezone, setSelectedTimezone] = useState('')

  const handleTimezoneChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTimezone(event.target.value)
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">Preferences</h2>
      <div className="mb-4">
        <label className="block text-gray-700 dark:text-gray-200 mb-2">Select Timezone</label>
        <select
          value={selectedTimezone}
          onChange={handleTimezoneChange}
          className="block w-full p-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-gray-800 dark:text-white"
        >
          <option value="" disabled>
            Select Timezone
          </option>
          {timezones.map((timezone, idx) => (
            <option key={idx} value={timezone}>
              {timezone}
            </option>
          ))}
        </select>
      </div>
      <button className="px-4 py-2 bg-gradient-to-br from-purple-600 via-pink-600 to-purple-800 text-white rounded-md hover:from-purple-700 hover:via-pink-700 hover:to-purple-900">
        Update Timezone
      </button>
    </div>
  )
}
