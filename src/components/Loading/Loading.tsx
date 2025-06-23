import { Spinner, type SpinnerProps } from '@heroui/react'
import { cn } from '@/services/foundations/utilities'

export default function Loading({ className, ...props }: { className?: string } & SpinnerProps) {
  return (
    <div className={cn('flex justify-center items-center h-full w-full', className)}>
      <Spinner {...props} />
    </div>
  )
}