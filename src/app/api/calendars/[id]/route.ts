import { NextResponse } from 'next/server'

import { prisma } from '@/lib/db'

import { getServerSession } from 'next-auth/next'

import { authOptions } from '@/lib/authOptions'

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  console.log({ params })
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user?.id) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 })
    }

    const body = await req.json()
    const data = body

    const { id } = params

    const calendar = await prisma.calendar.findUnique({
      where: { id },
      select: { accountId: true }
    })

    if (!calendar || calendar.accountId !== session.user.id) {
      return new Response(JSON.stringify({ error: 'Forbidden' }), { status: 403 })
    }

    const updatedCalendar = await prisma.calendar.update({
      where: { id },
      data
    })

    return NextResponse.json(updatedCalendar)
  } catch (error) {
    console.error('Error updating calendar:', error)
    return new Response(JSON.stringify({ error: 'Failed to update calendar' }), { status: 500 })
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user?.id) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 })
    }

    const { id } = params

    const calendar = await prisma.calendar.findUnique({
      where: { id },
      select: { accountId: true }
    })

    if (!calendar || calendar.accountId !== session.user.id) {
      return new Response(JSON.stringify({ error: 'Forbidden' }), { status: 403 })
    }

    await prisma.calendar.delete({ where: { id } })

    return NextResponse.json({ message: 'Calendar deleted successfully' })
  } catch (error) {
    console.error('Error deleting calendar:', error)
    return new Response(JSON.stringify({ error: 'Failed to delete calendar' }), { status: 500 })
  }
}
