'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { Button, Container, Input } from '@/components'
import { withAuth, createClient } from '@/lib'

interface Distraction {
  id: number
  text: string
}

function CycleCompleted() {
  const [distractions, setDistractions] = useState<Distraction[]>([])
  const [newDistraction, setNewDistraction] = useState('')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const canAccess = localStorage.getItem('canAccessCycleCompleted')
    if (!canAccess) {
      window.location.href = '/'
    }
  }, [])

  if (!mounted) return null

  const handleAddDistraction = () => {
    if (newDistraction.trim()) {
      setDistractions([
        ...distractions,
        { id: Date.now(), text: newDistraction.trim() },
      ])
      setNewDistraction('')
    }
  }

  const handleSubmitDistractions = async () => {
    const supabase = createClient()
    try {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser()
      if (error || !user) {
        console.error('Error getting user:', error)
      } else {
        await fetch('/api/distractions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId: user.id,
            distractions: distractions.map((item) => item.text),
          }),
        })
        localStorage.removeItem('canAccessCycleCompleted')
        window.location.href = '/'
      }
    } catch (error) {
      console.error('Error submiting distractions: ', error)
    }
  }

  return (
    <Container hasCols={false}>
      <h1 className="row-start-1 mb-4 text-center text-2xl text-black">
        Cycle Completed
      </h1>

      <div className="row-start-2 justify-items-center space-y-3 px-2">
        <h2 className="mr-52 text-black">Distractions:</h2>
        <ul className="max-h-24 space-y-2 overflow-y-auto">
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
          onClick={handleSubmitDistractions}
        />
      </div>
    </Container>
  )
}

export default withAuth(CycleCompleted)
