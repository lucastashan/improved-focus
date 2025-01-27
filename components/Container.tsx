import { ReactNode } from 'react'

interface ContainerProps {
  children: ReactNode
}

export default function Container({ children }: ContainerProps) {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="grid h-96 w-4/5 grid-cols-3 grid-rows-3 gap-4 rounded-lg bg-red-500 shadow-lg">
        {children}
      </div>
    </div>
  )
}
