import { Button as HeroButton, type ButtonProps as HeroButtonProps } from "@heroui/react";

export type ButtonProps = HeroButtonProps

export default function Button({ children, ...props }: ButtonProps) {
  return <HeroButton {...props}>{children}</HeroButton>
}