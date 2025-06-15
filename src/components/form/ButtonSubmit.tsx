import React from "react";
import { Button as ButtonUI } from "@heroui/react";
import { useFormContext } from "react-hook-form";

export default function ButtonSubmit({
  children,
  ...props
}: { children: React.ReactNode } & React.ComponentProps<typeof ButtonUI>) {
  const { formState } = useFormContext();
  return (
    <ButtonUI isLoading={formState.isSubmitting} type="submit" variant="shadow" color="primary" {...props}>
      {children}
    </ButtonUI>
  );
}
