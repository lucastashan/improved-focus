'use client'

import Image from 'next/image'
import { Button, Container } from '@/components'
import { milisecondsToMinutes, withAuth, signOut } from '@/lib'
import Countdown from 'react-countdown'
import { Suspense, useRef, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

// This function is to wrap the useSearchParams() call (https://nextjs.org/docs/messages/missing-suspense-with-csr-bailout)
function HomeSuspense() {
  // Get the timer values from the URL query params or set default values (25, 5 and 15 minutes, respectively)
  const params = useSearchParams()
  const focusTimer = Number(params.get('focusTimer')) || 1500000
  const shortRestTimer = Number(params.get('shortRestTimer')) || 300000
  const longRestTimer = Number(params.get('longRestTimer')) || 900000

  const countdownRef = useRef<Countdown | null>(null)
  const [title, setTitle] = useState('Focus Cycle')
  const [countdownTimer, setCountdownTimer] = useState(Date.now() + focusTimer)
  const [rightArrow, setRightArrow] = useState(true)
  const [leftArrow, setLeftArrow] = useState(false)
  const [startButton, setStartButton] = useState(true)

  function countdownAction(action: string) {
    if (countdownRef.current) {
      if (action === 'start') {
        countdownRef.current.start()
      } else {
        countdownRef.current.pause()
      }
    }
  }

  const handleStartClick = () => {
    countdownAction('start')
    setStartButton(false)
  }

  const handlePauseClick = () => {
    countdownAction('pause')
    setStartButton(true)
  }

  const handleClickToFocusCycle = () => {
    setTitle('Focus Cycle')
    setCountdownTimer(Date.now() + focusTimer)
    setRightArrow(true)
    setLeftArrow(false)
    countdownAction('pause')
    setStartButton(true)
  }

  const handleClickToShortRest = () => {
    setTitle('Short Rest Cycle')
    setCountdownTimer(Date.now() + shortRestTimer)
    console.log(shortRestTimer)
    setRightArrow(true)
    setLeftArrow(true)
    countdownAction('pause')
    setStartButton(true)
  }

  const handleClickToLongRestCycle = () => {
    setTitle('Long Rest Cycle')
    setCountdownTimer(Date.now() + longRestTimer)
    setRightArrow(false)
    countdownAction('pause')
    setStartButton(true)
  }

  return (
    <Container hasHistoryList={true}>
      <div className="col-start-1 row-start-1 ml-3 mt-3">
        <Button
          svg={
            <Image alt="sign-out" src="/sign-out.svg" width={24} height={24} />
          }
          onClick={() => {
            signOut()
          }}
        />
      </div>
      <h1 className="col-start-2 row-start-1 mb-4 text-center text-2xl text-white">
        {title}
      </h1>
      <Link
        href={{
          pathname: '/settings',
          query: {
            focusTimer: milisecondsToMinutes(focusTimer),
            shortRestTimer: milisecondsToMinutes(shortRestTimer),
            longRestTimer: milisecondsToMinutes(longRestTimer),
          },
        }}
        className="col-start-3 row-start-1 mr-3 mt-3 justify-self-end"
      >
        <Image alt="settings" src="/adjustments.svg" width={24} height={24} />
      </Link>
      {leftArrow && (
        <div className="col-start-1 row-start-2 ml-3 self-center justify-self-start">
          <Button
            svg={
              <Image
                alt="arrow-left"
                src="/chevron-left.svg"
                width={24}
                height={24}
              />
            }
            onClick={() => {
              if (title === 'Short Rest Cycle') handleClickToFocusCycle()
              else handleClickToShortRest()
            }}
          />
        </div>
      )}
      <div className="col-start-2 row-start-2 self-center justify-self-center text-6xl">
        <Countdown
          ref={countdownRef}
          date={countdownTimer}
          onComplete={() => {
            if (title === 'Short Rest Cycle' || title === 'Long Rest Cycle') {
              handleClickToFocusCycle()
            } else {
              window.location.href = '/cycle-completed'
            }
          }}
          renderer={({ minutes, seconds }) => {
            const formatNumber = (num: number) =>
              num.toString().padStart(2, '0')
            return (
              <span>
                {formatNumber(minutes)}:{formatNumber(seconds)}
              </span>
            )
          }}
          autoStart={false}
        />
      </div>
      {rightArrow && (
        <div className="col-start-3 row-start-2 mr-3 self-center justify-self-end">
          <Button
            svg={
              <Image
                alt="arrow-right"
                src="/chevron-right.svg"
                width={24}
                height={24}
              />
            }
            onClick={() => {
              if (title === 'Focus Cycle') handleClickToShortRest()
              else handleClickToLongRestCycle()
            }}
          />
        </div>
      )}
      <div className="col-start-2 row-start-3 mb-3 self-end justify-self-center">
        <Button
          label={startButton ? 'Start' : 'Pause'}
          style="bg-gray-800 h-10 px-5 hover:bg-gray-900"
          onClick={startButton ? handleStartClick : handlePauseClick}
        />
      </div>
    </Container>
  )
}

function Home() {
  return (
    <Suspense>
      <HomeSuspense />
    </Suspense>
  )
}

export default withAuth(Home)
