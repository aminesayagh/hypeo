import React from "react";
import { Button as ButtonUI, type ButtonProps } from "@heroui/react";
import { useFormContext } from "react-hook-form";

export default function ButtonSubmit({
  children,
  ...props
}: { children: React.ReactNode } & Omit<ButtonProps, 'type'>) {
  const { formState } = useFormContext();
  return (
    <ButtonUI isLoading={formState.isSubmitting} type="submit" variant="shadow" color="primary" {...props}>
      {children}
    </ButtonUI>
  );
}
