import React from 'react'

interface SearchBarProps {
  searchIdentifier: string
  setSearchIdentifier: (term: string) => void
  startDate: string
  setStartDate: (date: string) => void
  endDate: string
  setEndDate: (date: string) => void
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  searchIdentifier, 
  setSearchIdentifier, 
  startDate, 
  setStartDate, 
  endDate, 
  setEndDate 
}) => {
  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-xl font-bold mb-4">Buscar Eventos</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="identifier">
            Identificador
          </label>
          <input
            type="text"
            id="identifier"
            placeholder="Buscar por identificador..."
            value={searchIdentifier}
            onChange={(e) => setSearchIdentifier(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="startDate">
            Fecha Inicio
          </label>
          <input
            type="date"
            id="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="endDate">
            Fecha Fin
          </label>
          <input
            type="date"
            id="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
      </div>
    </div>
  )
}

export default SearchBar