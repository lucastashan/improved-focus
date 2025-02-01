'use client'

import { Button, Container, Input } from '@/components'
import { useState } from 'react'
import Image from 'next/image'

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

  // const handleSubmitDistractions = async () => {
  //   try {
  //     const response = await fetch('/api/distractions', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({ distractions }),
  //     })
  //     if (!response.ok) {
  //       console.error('Submission failed.')
  //     } else {
  //       console.log('Distractions submitted successfully!')
  //     }
  //   } catch (error) {
  //     console.error(error)
  //   }
  // }

  return (
    <Container hasCols={false}>
      <h1 className="row-start-1 mb-4 text-center text-2xl text-black">
        Cycle Completed
      </h1>

      <div className="row-start-2 justify-items-center space-y-3 px-2">
        <h2 className="mr-52 text-black">Distractions:</h2>
        <ul className="space-y-2">
          {distractions.map((distraction) => (
            <li key={distraction.id} className="flex justify-between">
              <span className="mr-48">{distraction.text}</span>
              <Button
                svg={
                  <Image
                    alt="x-mark"
                    src="/x-mark.svg"
                    width={18}
                    height={18}
                  />
                }
                onClick={() =>
                  setDistractions(
                    distractions.filter((d) => d.id !== distraction.id),
                  )
                }
              />
            </li>
          ))}
        </ul>
        <div className="mb-4 flex gap-2">
          <Input
            type="text"
            value={newDistraction}
            onChange={(e) => setNewDistraction(e.target.value)}
            className="flex-1 rounded-lg border p-2"
            placeholder="Enter a distraction..."
          />
          <Button
            label="Add"
            onClick={handleAddDistraction}
            style="bg-black px-4 py-2 text-white hover:bg-gray-900"
          />
        </div>

        <Button
          label="Submit"
          style="bg-black px-4 py-2 text-white hover:bg-gray-900"
          onClick={() => alert('Cycle completed!')}
        />
      </div>
    </Container>
  )
}
