'use client'

import { Button, Container } from '@/components'
import { minutesToMiliseconds } from '@/utils'
import { Suspense, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

const TimerSetting = ({
  label,
  timer,
  onIncrease,
  onDecrease,
}: {
  label: string
  timer: number
  onIncrease: () => void
  onDecrease: () => void
}) => (
  <li className="justify-self-start text-lg">
    {label}
    <Button
      svg={<Image alt="plus icon" src="/plus.svg" width={18} height={18} />}
      style="bg-gray-800 hover:bg-gray-900 mx-2"
      onClick={onIncrease}
    />
    {timer}:00
    <Button
      svg={<Image alt="minus icon" src="/minus.svg" width={18} height={18} />}
      style="bg-gray-800 hover:bg-gray-900 mx-2"
      onClick={onDecrease}
    />
  </li>
)

// This function is to wrap the useSearchParams() call (https://nextjs.org/docs/messages/missing-suspense-with-csr-bailout)
function SettingsSuspense() {
  // Get the timer values from the URL query params
  const params = useSearchParams()

  const [focusTimer, setFocusTimer] = useState(Number(params.get('focusTimer')))
  const [shortRestTimer, setShortRestTimer] = useState(
    Number(params.get('shortRestTimer')),
  )
  const [longRestTimer, setLongRestTimer] = useState(
    Number(params.get('longRestTimer')),
  )

  return (
    <Container>
      <h1 className="col-start-2 row-start-1 mb-4 text-center text-2xl text-white">
        Edit Timers
      </h1>
      <ul className="col-start-2 row-start-2 list-disc space-y-2 pl-5 text-center">
        <TimerSetting
          label="Focus Cycle:"
          timer={focusTimer}
          onIncrease={() => setFocusTimer(focusTimer + 1)}
          onDecrease={() => setFocusTimer(focusTimer - 1)}
        />
        <TimerSetting
          label="Short Rest Cycle:"
          timer={shortRestTimer}
          onIncrease={() => setShortRestTimer(shortRestTimer + 1)}
          onDecrease={() => setShortRestTimer(shortRestTimer - 1)}
        />
        <TimerSetting
          label="Long Rest Cycle:"
          timer={longRestTimer}
          onIncrease={() => setLongRestTimer(longRestTimer + 1)}
          onDecrease={() => setLongRestTimer(longRestTimer - 1)}
        />
      </ul>
      <Link
        href={{
          pathname: '/',
          query: {
            focusTimer: minutesToMiliseconds(focusTimer),
            shortRestTimer: minutesToMiliseconds(shortRestTimer),
            longRestTimer: minutesToMiliseconds(longRestTimer),
          },
        }}
        className="col-start-2 row-start-3 mb-3 self-end justify-self-center"
      >
        <Button label="Save" style="bg-gray-800 h-10 px-5 hover:bg-gray-900" />
      </Link>
    </Container>
  )
}

export default function Settings() {
  return (
    <Suspense>
      <SettingsSuspense />
    </Suspense>
  )
}
