import { useEffect, useState } from 'react'

export function useDebounce<T> (value: T, delay = 500) {
  const [debounce, setDebounced] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => { setDebounced(value) }, delay)

    return () => { clearTimeout(timer) }
  }, [value, delay])

  return debounce
}
