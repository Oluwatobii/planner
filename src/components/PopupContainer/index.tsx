import { useContext } from 'react'

import { IoMdClose } from 'react-icons/io'

import PopupContext from '@/contexts/Popup'

import { PopupContainerProps, PopupContextType } from '@/lib/types'

export default function PopupContainer({ popupComponents }: PopupContainerProps) {
  const popupContext = useContext(PopupContext) as PopupContextType

  if (!popupContext) {
    console.error('PopupContainer must be used within a PopupProvider')
    return null
  }

  return (
    <div className={`fixed inset-0 z-[10000000] bg-black bg-opacity-50 ${popupComponents.length ? 'block' : 'hidden'}`}>
      {popupComponents.map((component, index) => (
        <div
          className={`absolute w-[90%] md:w-[40rem] left-1/2 transform -translate-x-1/2 top-20 md:top-40 overflow-hidden rounded-md bg-gray-100 dark:bg-gray-800 ${
            index === 0 ? 'block' : 'hidden'
          } ${component.className || ''}`}
          style={component.style || {}}
          key={component.key}
        >
          <div className="flex justify-between bg-gradient-to-br from-purple-600 via-pink-600 to-purple-800 text-black dark:text-white px-4 py-4 font-bold text-lg">
            <h2>{component.title}</h2>
            <div className="cursor-pointer">
              {component.closeable ? <IoMdClose onClick={() => component.resolver(null)} /> : null}
            </div>
          </div>
          <div className="overflow-y-auto p-4 max-h-[calc(100vh-10rem)] md:max-h-[calc(100vh-15rem)]">
            {<component.content resolver={component.resolver} />}
          </div>
        </div>
      ))}
    </div>
  )
}
