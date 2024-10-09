import React, { useState, useEffect } from 'react'
import { Event } from '../types'
import { Clock, ChevronLeft } from 'lucide-react'

interface EventFormProps {
  onAddEvent: (event: Event) => void
  onUpdateEvent: (event: Event) => void
  editingEvent: Event | null
  currentOperator: string
}

const EventForm: React.FC<EventFormProps> = ({ onAddEvent, onUpdateEvent, editingEvent, currentOperator }) => {
  const getCurrentDate = () => {
    const now = new Date()
    return now.toISOString().split('T')[0]
  }

  const getCurrentTime = () => {
    const now = new Date()
    return now.toTimeString().slice(0, 5)
  }

  const [date, setDate] = useState(getCurrentDate())
  const [time, setTime] = useState(getCurrentTime())
  const [identifier, setIdentifier] = useState('')
  const [description, setDescription] = useState('')
  const [informedTo, setInformedTo] = useState('')
  const [operator, setOperator] = useState(currentOperator)

  useEffect(() => {
    if (editingEvent) {
      setDate(editingEvent.date)
      setTime(editingEvent.time)
      setIdentifier(editingEvent.identifier)
      setDescription(editingEvent.description)
      setInformedTo(editingEvent.informedTo)
      setOperator(editingEvent.employeeName || '')
    } else {
      setOperator(currentOperator)
    }
  }, [editingEvent, currentOperator])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (date && time && identifier && description && informedTo) {
      const eventData: Event = {
        id: editingEvent ? editingEvent.id : Date.now(),
        date,
        time,
        identifier,
        description,
        informedTo,
        type: 'event',
        employeeName: operator
      }
      if (editingEvent) {
        onUpdateEvent(eventData)
      } else {
        onAddEvent(eventData)
      }
      resetForm()
    }
  }

  const resetForm = () => {
    setDate(getCurrentDate())
    setTime(getCurrentTime())
    setIdentifier('')
    setDescription('')
    setInformedTo('')
    setOperator(currentOperator)
  }

  const updateTimeToNow = () => {
    setTime(getCurrentTime())
  }

  const setDateToPreviousDay = () => {
    const currentDate = new Date(date)
    currentDate.setDate(currentDate.getDate() - 1)
    setDate(currentDate.toISOString().split('T')[0])
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date">
          Fecha
        </label>
        <div className="flex items-center">
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2"
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
          <button
            type="button"
            onClick={setDateToPreviousDay}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
          >
            <ChevronLeft size={20} />
          </button>
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="time">
          Hora
        </label>
        <div className="flex items-center">
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2"
            id="time"
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />
          <button
            type="button"
            onClick={updateTimeToNow}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
          >
            <Clock size={20} />
          </button>
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="identifier">
          Identificador (3-4 letras)
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="identifier"
          type="text"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value.toUpperCase())}
          maxLength={4}
          minLength={3}
          pattern="[A-Za-z]{3,4}"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
          Descripción
        </label>
        <textarea
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="informedTo">
          Se informa a
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="informedTo"
          type="text"
          value={informedTo}
          onChange={(e) => setInformedTo(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="operator">
          Operador Actual
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="operator"
          type="text"
          value={operator}
          onChange={(e) => setOperator(e.target.value)}
          required
        />
      </div>
      <div className="flex items-center justify-between">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          {editingEvent ? 'Actualizar Evento' : 'Agregar Evento'}
        </button>
      </div>
    </form>
  )
}

export default EventForm