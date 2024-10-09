import React, { useState, useRef, useCallback } from 'react'
import EventForm from './components/EventForm'
import EventList from './components/EventList'
import SearchBar from './components/SearchBar'
import ShiftChangeForm from './components/ShiftChangeForm'
import { Event, ShiftChange } from './types'
import { Download, Upload } from 'lucide-react'

function App() {
  const [events, setEvents] = useState<Event[]>([])
  const [searchIdentifier, setSearchIdentifier] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [editingEvent, setEditingEvent] = useState<Event | null>(null)
  const [currentOperator, setCurrentOperator] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const addEvent = useCallback((newEvent: Event) => {
    setEvents(prevEvents => [...prevEvents, newEvent])
    setCurrentOperator(newEvent.employeeName || '')
  }, [])

  const updateEvent = useCallback((updatedEvent: Event) => {
    setEvents(prevEvents => prevEvents.map(event => 
      event.id === updatedEvent.id ? updatedEvent : event
    ))
    setEditingEvent(null)
  }, [])

  const deleteEvent = useCallback((id: number) => {
    setEvents(prevEvents => prevEvents.filter(event => event.id !== id))
  }, [])

  const addShiftChange = useCallback((shiftChange: ShiftChange) => {
    const shiftChangeEvent: Event = {
      ...shiftChange,
      identifier: 'TURNO',
      description: shiftChange.employeeName,
      informedTo: 'Sistema',
      type: 'shiftChange'
    }
    setEvents(prevEvents => [...prevEvents, shiftChangeEvent])
    setCurrentOperator(shiftChange.employeeName)
  }, [])

  const startEditingEvent = useCallback((event: Event) => {
    setEditingEvent(event)
  }, [])

  const filteredEvents = events.filter(event => {
    const matchesIdentifier = event.identifier.toLowerCase().includes(searchIdentifier.toLowerCase())
    const eventDate = new Date(event.date)
    const isAfterStartDate = !startDate || eventDate >= new Date(startDate)
    const isBeforeEndDate = !endDate || eventDate <= new Date(endDate)
    return matchesIdentifier && isAfterStartDate && isBeforeEndDate
  })

  const downloadEvents = () => {
    const eventText = events.map(event => {
      if (event.type === 'shiftChange') {
        return `${event.date} ${event.time} - TURNO: ${event.description}`
      } else {
        return `${event.date} ${event.time} - ${event.identifier}: ${event.description} (Informado a: ${event.informedTo}, Operador: ${event.employeeName})`
      }
    }).join('\n')

    const blob = new Blob([eventText], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'eventos.txt'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const uploadEvents = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const content = e.target?.result as string
        const lines = content.split('\n')
        const newEvents: Event[] = lines.map((line, index) => {
          const [dateTime, rest] = line.split(' - ')
          const [date, time] = dateTime.split(' ')
          const [identifier, description] = rest.split(': ')
          
          if (identifier === 'TURNO') {
            return {
              id: Date.now() + index,
              date,
              time,
              identifier,
              description: description.trim(),
              informedTo: 'Sistema',
              type: 'shiftChange'
            }
          } else {
            const match = description.match(/(.+) \(Informado a: (.+), Operador: (.+)\)/)
            if (match) {
              const [, desc, informedTo, employeeName] = match
              return {
                id: Date.now() + index,
                date,
                time,
                identifier,
                description: desc,
                informedTo,
                employeeName,
                type: 'event'
              }
            }
            return {
              id: Date.now() + index,
              date,
              time,
              identifier,
              description: description,
              informedTo: 'Desconocido',
              employeeName: 'Desconocido',
              type: 'event'
            }
          }
        })
        setEvents(prevEvents => [...prevEvents, ...newEvents])
      }
      reader.readAsText(file)
    }
  }

  const printEvents = () => {
    const printContent = filteredEvents.map(event => {
      if (event.type === 'shiftChange') {
        return `${event.date} ${event.time} - TURNO: ${event.description}`
      } else {
        return `${event.date} ${event.time} - ${event.identifier}: ${event.description} (Informado a: ${event.informedTo}, Operador: ${event.employeeName})`
      }
    }).join('\n')

    const printWindow = window.open('', '_blank')
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Eventos Filtrados</title>
            <style>
              body { font-family: Arial, sans-serif; }
              pre { white-space: pre-wrap; }
            </style>
          </head>
          <body>
            <h1>Eventos Filtrados</h1>
            <pre>${printContent}</pre>
          </body>
        </html>
      `)
      printWindow.document.close()
      printWindow.print()
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center text-blue-600">
          Sistema de Registro de Eventos y Maniobras
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <EventForm 
              onAddEvent={addEvent} 
              editingEvent={editingEvent}
              onUpdateEvent={updateEvent}
              currentOperator={currentOperator}
            />
            <ShiftChangeForm onAddShiftChange={addShiftChange} />
          </div>
          <div>
            <SearchBar 
              searchIdentifier={searchIdentifier} 
              setSearchIdentifier={setSearchIdentifier}
              startDate={startDate}
              setStartDate={setStartDate}
              endDate={endDate}
              setEndDate={setEndDate}
            />
            <div className="mb-4 flex justify-end space-x-2">
              <button
                onClick={downloadEvents}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center"
              >
                <Download size={20} className="mr-2" />
                Descargar Eventos
              </button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={uploadEvents}
                className="hidden"
                accept=".txt"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center"
              >
                <Upload size={20} className="mr-2" />
                Cargar Eventos
              </button>
            </div>
            <EventList 
              events={filteredEvents} 
              onEditEvent={startEditingEvent}
              onDeleteEvent={deleteEvent}
              onPrintEvents={printEvents}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App