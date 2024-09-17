'use client'

import { useContext } from 'react'

import PopupContext from '@/contexts/Popup'

import { IoIosWarning } from 'react-icons/io'

import { MdDangerous } from 'react-icons/md'

import { FaCheckCircle } from 'react-icons/fa'

export type AlertPopupProps = {
  resolver: (data: unknown) => void
  message: string
}

export type ConformOptions = {
  text: string
  type: string
}

export type ConfirmPopupProps = {
  resolver: (data: unknown) => void
  message: string
  options: ConformOptions[]
}

export default function usePopup() {
  const popupContext = useContext(PopupContext)

  if (!popupContext) {
    throw new Error('usePopup must be used within a PopupProvider')
  }

  const { createPopup } = popupContext

  return {
    createPopup,
    popups: {
      alert: ({ resolver, message }: AlertPopupProps) => (
        <div className="flex flex-col items-center p-4 md:p-2.5">
          <div className="mb-4 shadow-lg border border-gray-300 p-4 w-full max-w-lg bg-gray-100 text-center text-base italic rounded-md text-gray-700">
            {message}
          </div>
          <div className="flex justify-around w-full">
            <button
              style={{ backgroundColor: '#16A34A' }} // Tailwind's green-600 color
              className="w-full text-black dark:text-white py-2 rounded-md flex items-center justify-center space-x-2"
              onClick={() => resolver(null)}
            >
              <span className="hidden md:inline-block">
                <FaCheckCircle />
              </span>
              <span>Close</span>
            </button>
          </div>
        </div>
      ),
      confirm: ({ resolver, message, options }: ConfirmPopupProps) => (
        <div className="flex flex-col items-center p-4 md:p-6">
          <div className="mb-4 shadow-lg border border-gray-300 p-4 w-full max-w-lg bg-gray-100 dark:bg-gray-800 text-center text-base italic rounded-md text-gray-700 dark:text-gray-300">
            {message}
          </div>
          <div className="flex flex-row space-x-4 w-full">
            {options.map(({ text, type }, index) => {
              if (type === 'confirm') {
                return (
                  <button
                    key={index}
                    style={{ backgroundColor: '#16A34A' }} // Tailwind's green-600 color
                    className="w-3/4 md:w-full text-black dark:text-white py-2 rounded-md flex items-center justify-center space-x-2"
                    onClick={() => resolver(text)}
                  >
                    <span className="hidden md:inline-block">
                      <FaCheckCircle />
                    </span>
                    <span>{text}</span>
                  </button>
                )
              }

              if (type === 'warning') {
                return (
                  <button
                    key={index}
                    style={{ backgroundColor: '#F59E0B' }} // Tailwind's yellow-500 color
                    className="w-3/4 md:w-full text-black dark:text-white py-2 rounded-md flex items-center justify-center space-x-2"
                    onClick={() => resolver(text)}
                  >
                    <span className="hidden md:inline-block">
                      <IoIosWarning />
                    </span>
                    <span>{text}</span>
                  </button>
                )
              }

              if (type === 'danger') {
                return (
                  <button
                    key={index}
                    style={{ backgroundColor: '#DC2626' }} // Tailwind's red-600 color
                    className="w-3/4 md:w-full text-black dark:text-white py-2 rounded-md flex items-center justify-center space-x-2"
                    onClick={() => resolver(text)}
                  >
                    <span className="hidden md:inline-block">
                      <MdDangerous />
                    </span>
                    <span>{text}</span>
                  </button>
                )
              }

              return (
                <button
                  key={index}
                  style={{ backgroundColor: '#1F2937' }} // Tailwind's gray-800 color
                  className="w-3/4 md:w-full text-black dark:text-white py-2 rounded-md flex items-center justify-center space-x-2"
                  onClick={() => resolver(text)}
                >
                  <span>{text}</span>
                </button>
              )
            })}
          </div>
        </div>
      )
    }
  }
}
