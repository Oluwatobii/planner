export type PopupComponent = {
  title: string
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
