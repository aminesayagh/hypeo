'use client'

import { useThemeMounted } from './useThemeMounted'
import { Sun, Moon } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { cn } from '../classes'

export function ThemeChange({ className }: { className?: string }) {
  const { theme, setTheme, mounted } = useThemeMounted()

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return (
      <div className={cn('size-6', className)} /> // Placeholder with same dimensions
    )
  }

  return (
    <AnimatePresence mode='wait'>
      <motion.button
        key={theme}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        className={cn('cursor-pointer', className)}
      >
        {theme === 'dark' ? <Sun className='size-6' /> : <Moon className='size-6' />}
      </motion.button>
    </AnimatePresence>
  )
}
