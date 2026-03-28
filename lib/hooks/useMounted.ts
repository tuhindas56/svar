import { useEffect, useState } from 'react'

function useMounted() {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
  return (
    mounted
  )
}

export default useMounted