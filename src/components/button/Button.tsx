import {
  Button as HeroButton,
  type ButtonProps as HeroButtonProps,
} from '@heroui/react'
import { cn } from '@/services/foundations/utilities'

export type ButtonProps = HeroButtonProps

export default function Button({ children, className, ...props }: ButtonProps) {
  return (
    <HeroButton {...props} className={cn('font-semibold', className)}>
      {children}
    </HeroButton>
  )
}
