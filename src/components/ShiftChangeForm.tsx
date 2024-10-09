import React, { useState } from 'react'
import { ShiftChange } from '../types'

interface ShiftChangeFormProps {
  onAddShiftChange: (shiftChange: ShiftChange) => void
}

const ShiftChangeForm: React.FC<ShiftChangeFormProps> = ({ onAddShiftChange }) => {
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
  const [employeeName, setEmployeeName] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (date && time && employeeName) {
      const shiftChangeData: ShiftChange = {
        id: Date.now(),
        date,
        time,
        employeeName,
      }
      onAddShiftChange(shiftChangeData)
      resetForm()
    }
  }

  const resetForm = () => {
    setDate(getCurrentDate())
    setTime(getCurrentTime())
    setEmployeeName('')
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-2xl font-bold mb-4">Registro de Cambio de Turno</h2>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="shiftDate">
          Fecha
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="shiftDate"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="shiftTime">
          Hora de Ingreso
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="shiftTime"
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="employeeName">
          Nombre del Empleado
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="employeeName"
          type="text"
          value={employeeName}
          onChange={(e) => setEmployeeName(e.target.value)}
          required
        />
      </div>
      <div className="flex items-center justify-between">
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Registrar Cambio de Turno
        </button>
      </div>
    </form>
  )
}

export default ShiftChangeForm