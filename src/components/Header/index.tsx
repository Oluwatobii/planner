'use client'

import { useState, useEffect } from 'react'

import { BsSunFill } from 'react-icons/bs'

import { FaMoon, FaSearch, FaUserCircle, FaCalendarAlt } from 'react-icons/fa'

export default function Header() {
  const user = true

  if (user)
    return (
      <nav className="bg-white dark:bg-dark p-2 shadow-md dark:shadow-dark-md">
        <div className="px-8 mx-auto flex">
          <div className="flex items-center space-x-4">
            <FaCalendarAlt className="text-xl text-gray-900 dark:text-white" />
            <div className="text-lg font-bold text-gray-900 dark:text-white">Planner</div>
          </div>

          <div className="flex-1 mx-4 px-8">
            <div className="relative">
              <FaSearch className="absolute left-3 top-3 text-gray-400 dark:text-gray-600" />
              <input
                type="search"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none"
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <FaUserCircle className="text-2xl text-gray-900 dark:text-white" />
            <ThemeToggle />
          </div>
        </div>
      </nav>
    )

  /*
  return (
    <nav className="bg-white dark:bg-gray-900 p-2">
      <div className="px-8 mx-auto flex">
        <div className="flex-1 flex justify-center">
          <FaCalendarAlt className="text-2xl text-gray-900 dark:text-white" />
        </div>
      </div>
    </nav>
  )
  */
  return null
}

function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme')

    if (storedTheme) {
      setTheme(storedTheme as 'light' | 'dark')
      document.documentElement.classList.add(storedTheme)
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark')
      document.documentElement.classList.add('dark')
    }
  }, [])

  return (
    <div
      className="relative w-16 h-8 flex items-center dark:bg-gray-900 bg-teal-500 cursor-pointer rounded-full p-1"
      onClick={() => {
        if (theme === 'dark') {
          document.documentElement.classList.remove('dark')
          localStorage.setItem('theme', 'light')
          setTheme('light')
        } else {
          document.documentElement.classList.add('dark')
          localStorage.setItem('theme', 'dark')
          setTheme('dark')
        }
      }}
    >
      <FaMoon className="text-white" size={18} />
      <div
        className="absolute bg-white w-6 h-6 rounded-full shadow-md transform transition-transform durattion-300"
        style={theme === 'dark' ? { left: '2px' } : { right: '2px' }}
      ></div>
      <BsSunFill className="ml-auto text-yellow-400 " size={18} />
    </div>
  )
}
