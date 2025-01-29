import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from './client'

const supabase = createClient()

const withAuth = (WrappedComponent: React.ComponentType) => {
  const WithAuthComponent = (
    props: React.ComponentProps<typeof WrappedComponent>,
  ) => {
    const [authenticated, setAuthenticated] = useState(false)
    const router = useRouter()

    useEffect(() => {
      const checkAuth = async () => {
        const { data } = await supabase.auth.getSession()
        if (data.session) {
          setAuthenticated(true)
        } else {
          router.push('/sign-in')
        }
      }
      checkAuth()
    }, [router])

    if (!authenticated) {
      return <div>Loading...</div>
    }

    return <WrappedComponent {...props} />
  }

  WithAuthComponent.displayName = `WithAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`
  return WithAuthComponent
}

export default withAuth
