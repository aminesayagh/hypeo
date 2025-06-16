import { Select as HeSelect, type SelectProps as HeSelectProps, SelectItem as HeSelectItem } from '@heroui/react'
import { type SelectItemProps as HeSelectItemProps } from '@heroui/react'

export function Select({ ...props }: SelectProps) {
  return <HeSelect {...props} />;
}
export { SelectItem } from '@heroui/react'
export type SelectProps = HeSelectProps
export type SelectItemProps = HeSelectItemProps