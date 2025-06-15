import { Button as HeroButton, type ButtonProps } from "@heroui/react";

export default function Button({ children, ...props }: ButtonProps) {
  return <HeroButton {...props}>{children}</HeroButton>
}