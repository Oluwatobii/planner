import { redirect } from 'next/navigation'

import { getServerSession } from 'next-auth/next'

import { authOptions } from '@/lib/authOptions'

export default async function HomePage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/')
  }

  return (
    <div>
      <h1>Welcome to Your Scheduler (Planner)</h1>
      {/* JSX Here */}
    </div>
  )
}
