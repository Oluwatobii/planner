'use client'

import { createContext } from 'react'

import { PopupContextType } from '@/lib/types'

const PopupContext = createContext<PopupContextType | null>(null)

export default PopupContext
