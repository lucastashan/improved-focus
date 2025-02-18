import { ReactNode, useEffect, useState } from 'react'
import { DistractionsDTO } from '@/types/DTOs'
import { createClient } from '@/lib'

interface ContainerProps {
  children: ReactNode
  hasCols?: boolean
  hasHistoryList?: boolean
}

interface HistoryItens extends DistractionsDTO {
  count: number
}

export default function Container({
  children,
  hasCols = true,
  hasHistoryList = true,
}: ContainerProps) {
  const [history, setHistory] = useState<HistoryItens[]>([])
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchHistory = async () => {
      const supabase = createClient()

      const {
        data: { user },
        error,
      } = await supabase.auth.getUser()
      if (error || !user) {
        setError(true)
      } else {
        const res = await fetch('/api/distractions', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json', userId: `${user.id}` },
        })
        const data = await res.json()
        const distraction = data as HistoryItens[]
        setHistory(distraction)
      }
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
      {hasHistoryList ? (
        <div className="mt-4 flex flex-col">
          <h1 className="mx-[5%] mb-2 whitespace-nowrap border-b">
            Distraction history:
          </h1>
          {error ? (
            <h3>Error to load distraction history</h3>
          ) : (
            <ul className="ml-[8%] max-h-48 space-y-1 overflow-y-auto">
              {history?.map((item) => (
                <li key={item.id}>
                  {item.content} (x{item.count.toString()})
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : (
        <></>
      )}
    </div>
  )
}
