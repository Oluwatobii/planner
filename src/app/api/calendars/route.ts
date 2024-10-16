import { NextResponse } from 'next/server'

import { prisma } from '@/lib/db'

import { getServerSession } from 'next-auth/next'

import { authOptions } from '@/lib/authOptions'

import { z } from 'zod'

const calendarSchema = z.object({
  name: z.string().min(1, 'Calendar name is required'),
  color: z.string().regex(/^#([0-9A-F]{3}){1,2}$/i, 'Calendar color must be a valid hex code')
})

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const calendars = await prisma.calendar.findMany({
      where: {
        accountId: session.user.id
      }
    })

    return NextResponse.json(calendars)
  } catch (error) {
    console.error('Error fetching calendars:', error)
    return new Response(JSON.stringify({ error: 'Failed to fetch calendars' }), { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const validation = calendarSchema.safeParse(body)

    if (!validation.success) {
      return NextResponse.json({ error: validation.error.errors }, { status: 400 })
    }

    const newCalendar = await prisma.calendar.create({
      data: {
        name: body.name,
        color: body.color,
        accountId: session.user.id
      }
    })

    return NextResponse.json(newCalendar, { status: 201 })
  } catch (error) {
    console.error('Error creating calendar:', error)
    return new Response(JSON.stringify({ error: 'Failed to create calendar' }), { status: 500 })
  }
}
