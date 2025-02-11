import { ReactNode, useEffect, useState } from 'react'

interface ContainerProps {
  children: ReactNode
  hasCols?: boolean
}

interface HistoryItens {
  id: number
  name: string
  times: number
}

export default function Container({
  children,
  hasCols = true,
}: ContainerProps) {
  const [history, setHistory] = useState<HistoryItens[]>([])

  useEffect(() => {
    const fetchHistory = async () => {
      const res = await fetch('http://localhost:3001/history')
      setHistory(await res.json())
    }

    fetchHistory()
  }, [])

  return (
    <div className="flex min-h-screen flex-col justify-center">
      <div
        className={`mx-auto grid h-96 w-4/5 ${hasCols ? 'grid-cols-3' : 'grid-cols-1'} grid-rows-3 gap-4 rounded-lg bg-red-500 shadow-lg`}
      >
        {children}
      </div>
      <div className="mt-4 flex flex-col">
        <h1 className="mx-[5%] mb-2 whitespace-nowrap border-b">
          Distraction history:
        </h1>
        <ul className="ml-[8%] space-y-1">
          {history?.map((item) => (
            <li key={item.id}>
              {item.name} (x{item.times.toString()})
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
