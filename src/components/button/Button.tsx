import { Button as ButtonPrimitive, type ButtonProps } from "@radix-ui/themes"

export function Button({ children, ...props }: ButtonProps) {
  return <ButtonPrimitive {...props}>{children}</ButtonPrimitive>
}
