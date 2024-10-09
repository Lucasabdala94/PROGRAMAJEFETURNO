export interface Event {
  id: number
  date: string
  time: string
  identifier: string
  description: string
  informedTo: string
  type: 'event' | 'shiftChange'
  employeeName?: string
}

export interface ShiftChange {
  id: number
  date: string
  time: string
  employeeName: string
}