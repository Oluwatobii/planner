'use client'

import usePopup from '@/hooks/usePopup'

import { Event as CreateEventForm } from '@/components'

export default function CreateEvent() {
  const { createPopup } = usePopup()

  return (
    <div className="flex justify-center">
      <button
        className="w-3/4 md:w-full text-white py-2 rounded-md bg-gradient-to-br from-purple-600 via-pink-600 to-purple-800 hover:from-purple-700 hover:via-pink-700 hover:to-purple-900"
        onClick={async () => {
          await createPopup({
            closeable: true,
            title: `Create Event`,
            content: ({ resolver }: { resolver: (data: unknown) => void }) => <CreateEventForm resolver={resolver} />
          })
        }}
      >
        New Event
      </button>
    </div>
  )
}
