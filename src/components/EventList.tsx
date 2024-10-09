import React from 'react'
import { Event } from '../types'
import { Trash2, UserCheck, Edit2, Printer } from 'lucide-react'

interface EventListProps {
  events: Event[]
  onDeleteEvent: (id: number) => void
  onEditEvent: (event: Event) => void
  onPrintEvents: () => void
}

const EventList: React.FC<EventListProps> = ({ events, onDeleteEvent, onEditEvent, onPrintEvents }) => {
  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Lista de Eventos y Cambios de Turno</h2>
        {events.length > 0 && (
          <button
            onClick={onPrintEvents}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center"
          >
            <Printer size={20} className="mr-2" />
            Imprimir Eventos Filtrados
          </button>
        )}
      </div>
      {events.length === 0 ? (
        <p className="text-gray-600">No hay eventos que coincidan con los criterios de búsqueda.</p>
      ) : (
        <ul className="divide-y divide-gray-200">
          {events.map((event) => (
            <li key={event.id} className="py-4 group relative">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">
                  {event.date} {event.time}
                </span>
                <span className={`font-bold ${event.type === 'shiftChange' ? 'text-green-600' : ''}`}>
                  {event.identifier}
                  {event.type === 'shiftChange' && (
                    <UserCheck size={20} className="inline-block ml-2" />
                  )}
                </span>
              </div>
              <p className="mt-2 text-gray-700">{event.description}</p>
              {event.type === 'event' && (
                <>
                  <p className="mt-1 text-gray-600">Se informa a: {event.informedTo}</p>
                  <p className="mt-1 text-gray-600">Operador: {event.employeeName}</p>
                </>
              )}
              <div className="absolute bottom-2 right-2 hidden group-hover:flex space-x-2">
                <button
                  onClick={() => onEditEvent(event)}
                  className="text-blue-600 hover:text-blue-800"
                  title="Editar"
                >
                  <Edit2 size={20} />
                </button>
                <button
                  onClick={() => onDeleteEvent(event.id)}
                  className="text-red-600 hover:text-red-800"
                  title="Eliminar"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default EventList