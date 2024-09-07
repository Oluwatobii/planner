'use client'

import { useState, useContext } from 'react'

import { useTheme } from 'next-themes'

import { BsSunFill } from 'react-icons/bs'

import { FaMoon, FaSearch, FaUserCircle } from 'react-icons/fa'

import Image from 'next/image'

import { AppContext } from '@/contexts/Application'

export default function Header() {
  const user = false

  const [menuOpen, setMenuOpen] = useState(false)

  const context = useContext(AppContext)

  if (user)
    return (
      <nav className="bg-white dark:bg-gray-900 p-[5px] shadow-md dark:shadow-dark-md">
        <div className="px-4 mx-auto flex items-center justify-between relative">
          <div className="flex items-center space-x-1">
            <Image src="/planner.png" alt="Logo" width={50} height={50} className="mx-auto" />
            <div className="text-lg font-bold text-gray-900 dark:text-white">Planner</div>
          </div>

          <div className="hidden md:flex md:flex-1 md:mx-4 md:px-8">
            <div className="relative w-full">
              <FaSearch className="absolute left-3 top-3 text-gray-400 dark:text-gray-600" />
              <input
                type="search"
                placeholder="Search..."
                onChange={evt => context && context.setSearchQuery(evt.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none"
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <FaUserCircle
                className="text-2xl text-gray-900 dark:text-white cursor-pointer"
                onClick={() => setMenuOpen(!menuOpen)}
              />
              {menuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-md z-20">
                  <ul className="py-1">
                    <li className="px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                      Profile
                    </li>
                    <li className="px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                      Settings
                    </li>
                    <li className="px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                      Logout
                    </li>
                  </ul>
                </div>
              )}
            </div>
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
  const { setTheme, resolvedTheme } = useTheme()

  return (
    <div
      className="relative w-16 h-8 flex items-center bg-teal-500 dark:bg-gray-900 cursor-pointer rounded-full p-1"
      onClick={() => {
        if (resolvedTheme === 'dark') {
          setTheme('light')
        } else {
          setTheme('dark')
        }
      }}
    >
      <FaMoon className="text-white" size={18} />
      <div
        className={`absolute bg-white w-6 h-6 rounded-full shadow-md transform transition-transform duration-300`}
        style={{
          transform: resolvedTheme === 'dark' ? 'translateX(35px)' : 'translateX(0px)'
        }}
      ></div>
      <BsSunFill className="ml-auto text-yellow-400" size={18} />
    </div>
  )
}
