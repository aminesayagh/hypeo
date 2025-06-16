'use client'

import { useThemeMounted } from './useThemeMounted'
import { Sun, Moon } from '@/components/icon'
import { AnimatePresence, motion } from 'motion/react'
import { cn } from '../classes'
import { clsx } from 'clsx'

export function ThemeChange({ classNames }: { classNames?: {
  icon?: string,
  button?: string,
} }) {
  const { theme, setTheme, mounted } = useThemeMounted()

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return (
      <div className={cn('size-6', classNames?.icon)} /> // Placeholder with same dimensions
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
        className={cn('cursor-pointer', classNames?.button)}
      >
        {theme === 'dark' ? <Sun className={clsx('size-6', classNames?.icon)} /> : <Moon className={clsx('size-6', classNames?.icon)} />}
      </motion.button>
    </AnimatePresence>
  )
}
