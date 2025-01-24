'use client'

import Image from 'next/image'
import { Button } from '@/components'
import Countdown from 'react-countdown'
import { useRef } from 'react'

// Random component
const Completionist = () => <span>You are good to go!</span>

// Renderer callback with condition
const renderer = ({ minutes, seconds, completed }) => {
  if (completed) {
    // Render a complete state
    return <Completionist />
  } else {
    // Render a countdown with format 00:00
    const formatNumber = (num) => num.toString().padStart(2, '0')
    return (
      <span>
        {formatNumber(minutes)}:{formatNumber(seconds)}
      </span>
    )
  }
}

export default function Home() {
  const countdownRef = useRef(null)

  const handleStartClick = () => {
    if (countdownRef.current) {
      countdownRef.current.start()
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="grid h-96 w-4/5 grid-cols-3 grid-rows-3 gap-4 rounded-lg bg-red-500 shadow-lg">
        <h1 className="col-start-2 row-start-1 mb-4 text-center text-2xl text-white">
          Focus Cycle
        </h1>
        <div className="col-start-3 row-start-1 mr-3 mt-3 justify-self-end">
          <Button
            svg={
              <Image alt="test" src="/adjustments.svg" width={24} height={24} />
            }
            onClick={() => alert('adjustments menu')}
          />
        </div>
        <div className="col-start-2 row-start-2 self-center justify-self-center text-6xl">
          <Countdown
            ref={countdownRef}
            date={Date.now() + 1500000}
            renderer={renderer}
            autoStart={false}
          />
        </div>
        <div className="col-start-3 row-start-2 mr-3 self-center justify-self-end">
          <Button
            svg={
              <Image
                alt="arrow-rigth"
                src="/chevron-right.svg"
                width={24}
                height={24}
              />
            }
            onClick={() => alert('next cycle')}
          />
        </div>
        <div className="col-start-2 row-start-3 mb-3 self-end justify-self-center">
          <Button
            label="Start"
            style="bg-gray-800 h-10 px-5 hover:bg-gray-900"
            onClick={handleStartClick}
          />
        </div>
      </div>
    </div>
  )
}
