import { ReactNode } from 'react'

interface ContainerProps {
  children: ReactNode
  hasCols?: boolean
}

export default function Container({
  children,
  hasCols = true,
}: ContainerProps) {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div
        className={`grid h-96 w-4/5 ${hasCols ? 'grid-cols-3' : 'grid-cols-1'} grid-rows-3 gap-4 rounded-lg bg-red-500 shadow-lg`}
      >
        {children}
      </div>
    </div>
  )
}
