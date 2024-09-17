import { View, stringOrDate } from 'react-big-calendar'

export type PopupComponent = {
  title?: string
  content: React.FC<{ resolver: (data: unknown) => void }>
  className?: string
  style?: React.CSSProperties
  closeable?: boolean
  resolver: (data: unknown) => void
  key: number
}

export type PopupContainerProps = {
  popupComponents: PopupComponent[]
}

export type CreatePopupFunction = (popup: Omit<PopupComponent, 'key' | 'resolver'>) => Promise<unknown>

export type PopupContextType = {
  createPopup: CreatePopupFunction
}

export type CalendarComponentProps = {
  startDate: Date
  endDate: Date
  onRangeChange: (range: { start: Date; end: Date }, view: View) => void
  currentView: View
  currentDate: Date
  onNavigate: (date: Date) => void
  onView: (view: View) => void
}

export type CalendarEvent = {
  title: string
  start: stringOrDate
  end: stringOrDate
  location?: string
  busy: boolean
  calendar: {
    id: string
    name: string
    color: string
  }
  [key: string]: any
}

export type SlotSelection = {
  start: stringOrDate
  end: stringOrDate
}

export type EventDropArgs = {
  event: any
  start: stringOrDate
  end: stringOrDate
  isAllDay?: boolean
  resourceId?: any
}
