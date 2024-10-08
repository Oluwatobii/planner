import Image from 'next/image'

import { useSession } from 'next-auth/react'

export default function Account() {
  const { data: session } = useSession()

  const getInitials = (name: string) => {
    const nameParts = name?.split(' ')
    const initials = nameParts?.map(part => part.charAt(0)).join('')
    return initials?.toUpperCase() || ''
  }

  /** Image: session?.user?.image */
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">Profile</h2>
      <div className="flex items-center space-x-4">
        {/* <Image src={''} alt="Profile" width={80} height={80} className="rounded-full" /> */}
        <div className="bg-purple-600 text-white rounded-full flex items-center justify-center h-20 w-20 text-3xl font-bold">
          {getInitials(session?.user?.name || 'Unknown')}
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">{session?.user?.name}</h3>
          <p className="text-gray-600 dark:text-gray-300">{session?.user?.email}</p>
        </div>
      </div>
    </div>
  )
}
