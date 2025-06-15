'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export function useThemeMounted() {
  const theme = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return {
    ...theme,
    mounted,
  }
}