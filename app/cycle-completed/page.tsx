'use client'

import { Container } from '@/components'
import { useState } from 'react'

interface Distraction {
  id: number
  text: string
}

export default function CycleCompleted() {
  const [distractions, setDistractions] = useState<Distraction[]>([])
  const [newDistraction, setNewDistraction] = useState('')

  const handleAddDistraction = () => {
    if (newDistraction.trim()) {
      setDistractions([
        ...distractions,
        { id: Date.now(), text: newDistraction.trim() },
      ])
      setNewDistraction('')
    }
  }

  return (
    <Container hasCols={false}>
      <h1 className="row-start-1 mb-4 text-center text-2xl text-black">
        Cycle Completed
      </h1>

      <div>
        <h3>Distractions:</h3>
        <ul className="space-y-2">
          {distractions.map((distraction) => (
            <li key={distraction.id}>
              <span>{distraction.text}</span>
              <button
                onClick={() =>
                  setDistractions(
                    distractions.filter((d) => d.id !== distraction.id),
                  )
                }
                className="text-black"
              >
                ×
              </button>
            </li>
          ))}
        </ul>
        <div className="mb-4 flex gap-2">
          <input
            type="text"
            value={newDistraction}
            onChange={(e) => setNewDistraction(e.target.value)}
            className="flex-1 rounded-lg border p-2"
            placeholder="Enter a distraction..."
          />
          <button
            onClick={handleAddDistraction}
            className="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            Add
          </button>
        </div>
      </div>
    </Container>
  )
}
