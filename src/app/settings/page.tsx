'use client'

import { useState } from 'react'

import { FaUser, FaCalendarAlt, FaCog, FaLifeRing } from 'react-icons/fa'

import { Account, Calendars, Preferences, Help } from './_components'

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState('account')

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex flex-col md:flex-row w-full">
      {/* Left Sidebar for Desktop, Dropdown for Mobile */}
      <div className="w-full md:w-1/5 p-6 bg-gray-50 dark:bg-gray-800 md:flex md:flex-col md:items-start md:h-auto">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6 hidden md:block">Settings</h2>

        {/* Mobile Dropdown */}
        <div className="block md:hidden mb-6">
          <select
            value={activeSection}
            onChange={e => setActiveSection(e.target.value)}
            className="block w-full p-3 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md"
          >
            <option value="account">Account</option>
            <option value="calendars">Calendars</option>
            <option value="preferences">Preferences</option>
            <option value="help">Help Center</option>
          </select>
        </div>

        {/* Sidebar for Desktop */}
        <ul className="hidden md:block space-y-4">
          <li
            className={`flex items-center space-x-3 cursor-pointer ${
              activeSection === 'account' ? 'text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-300'
            }`}
            onClick={() => setActiveSection('account')}
          >
            <FaUser className="text-lg" />
            <span
              className={`${
                activeSection === 'account'
                  ? 'bg-clip-text text-transparent bg-gradient-to-br from-purple-600 via-pink-600 to-purple-800'
                  : ''
              }`}
            >
              Account
            </span>
          </li>
          <li
            className={`flex items-center space-x-3 cursor-pointer ${
              activeSection === 'calendars' ? 'text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-300'
            }`}
            onClick={() => setActiveSection('calendars')}
          >
            <FaCalendarAlt className="text-lg" />
            <span
              className={`${
                activeSection === 'calendars'
                  ? 'bg-clip-text text-transparent bg-gradient-to-br from-purple-600 via-pink-600 to-purple-800'
                  : ''
              }`}
            >
              Calendars
            </span>
          </li>
          <li
            className={`flex items-center space-x-3 cursor-pointer ${
              activeSection === 'preferences' ? 'text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-300'
            }`}
            onClick={() => setActiveSection('preferences')}
          >
            <FaCog className="text-lg" />
            <span
              className={`${
                activeSection === 'preferences'
                  ? 'bg-clip-text text-transparent bg-gradient-to-br from-purple-600 via-pink-600 to-purple-800'
                  : ''
              }`}
            >
              Preferences
            </span>
          </li>
          <hr className="border-t border-gray-300 dark:border-gray-700" />
          <li
            className={`flex items-center space-x-3 cursor-pointer ${
              activeSection === 'help' ? 'text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-300'
            }`}
            onClick={() => setActiveSection('help')}
          >
            <FaLifeRing className="text-lg" />
            <span
              className={`${
                activeSection === 'help'
                  ? 'bg-clip-text text-transparent bg-gradient-to-br from-purple-600 via-pink-600 to-purple-800'
                  : ''
              }`}
            >
              Help Center
            </span>
          </li>
        </ul>
      </div>

      <div className="w-full md:w-5/5 p-6">
        {activeSection === 'account' && <Account />}

        {activeSection === 'calendars' && <Calendars />}

        {activeSection === 'preferences' && <Preferences />}

        {activeSection === 'help' && <Help />}
      </div>
    </div>
  )
}
