import { useEffect, useState } from 'react'

function useDebounce( value, delay ) {
  const [deBounceValue, setDeBounceValue] = useState('')

  useEffect(() => {
    const debounce = setTimeout(() => setDeBounceValue(value), delay)

    return () => clearTimeout(debounce)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[value])

  return deBounceValue
}

export default useDebounce
