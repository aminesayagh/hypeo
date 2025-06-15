import { RadioGroup as HeroRadioGroup, type RadioGroupProps, Radio as HeroRadio } from "@heroui/react";
import { Controller, useFormContext, type FieldValues, type Path } from "react-hook-form";

function RadioGroup<T extends FieldValues>({
    label,
    name,
    className,
    ...props
}: RadioGroupProps & { label?: string; name: Path<T> }) {
    const { control } = useFormContext<T>();
    return (
        <Controller
            control={control}
            name={name}
            render={({ field: { name, value, onChange, onBlur, ref, ...restField }, fieldState: { invalid, error, ...restFieldState } }) => (
                <HeroRadioGroup
                    label={label}
                    name={name}
                    value={value}
                    onBlur={onBlur}
                    onChange={onChange}
                    className={className}
                    {...restField}
                    {...restFieldState}
                    {...props}
                />
            )}
        />
    );
}

export { HeroRadio as Radio }

export default RadioGroup;
