import Button, { type ButtonProps } from './Button'
import { Tooltip } from '@heroui/react'

export function ButtonTooltip({
  children,
  title,
  ...props
}: { children: React.ReactNode; title: string } & ButtonProps) {
  return (
    <Tooltip content={title}>
      <Button isIconOnly variant='light' size='sm' className='p-0' {...props}>
        {children}
      </Button>
    </Tooltip>
  )
}
