'use client'

import { motion, AnimatePresence } from 'motion/react'
import type { ReactNode } from 'react'

// --------------------------------------------------
// Box Types
// --------------------------------------------------

export interface BoxProps {
  active: boolean
  children: ReactNode
  className?: string
}

// --------------------------------------------------
// Box Component
// --------------------------------------------------

export function Box({ active, children, className = '' }: BoxProps) {
  return (
    <AnimatePresence mode="popLayout" initial={false}>
      {active && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{
            duration: 0.3,
            ease: 'easeInOut',
          }}
          className={className}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Box
