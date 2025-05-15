import { useState, useCallback } from 'react'
import { useMounted } from './use-mounted'

interface AsyncState<T> {
  isLoading: boolean
  error: Error | null
  data: T | null
}

export function useAsync<T = any>() {
  const [state, setState] = useState<AsyncState<T>>({
    isLoading: false,
    error: null,
    data: null,
  })

  const mounted = useMounted()

  const execute = useCallback(
    async (promise: Promise<T>) => {
      setState({ isLoading: true, error: null, data: null })

      try {
        const data = await promise
        if (mounted.current) {
          setState({ isLoading: false, error: null, data })
        }
        return data
      } catch (error) {
        if (mounted.current) {
          setState({ isLoading: false, error: error as Error, data: null })
        }
        return Promise.reject(error)
      }
    },
    [mounted]
  )

  return {
    ...state,
    execute,
  }
}
