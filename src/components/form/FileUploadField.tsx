"use client";

import { useCallback } from "react";
import { useController, UseControllerProps, FieldPath, FieldValues } from "react-hook-form";
import { FileUpload } from "./FileUpload";

interface FileUploadFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends UseControllerProps<TFieldValues, TName> {
  accept?: string;
  maxSize?: number;
  multiple?: boolean;
  className?: string;
  title?: string;
  description?: string;
  acceptedFormats?: string;
  recommendedSize?: string;
  disabled?: boolean;
}

export function FileUploadField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  name,
  control,
  defaultValue,
  rules,
  shouldUnregister,
  accept,
  maxSize,
  multiple = false,
  className,
  title,
  description,
  acceptedFormats,
  recommendedSize,
  disabled,
}: FileUploadFieldProps<TFieldValues, TName>) {
  // --------------------------------------------------
  // Form Controller
  // --------------------------------------------------
  
  const {
    field: { onChange, value },
    fieldState: { error },
  } = useController({
    name,
    control,
    defaultValue,
    rules,
    shouldUnregister,
  });

  // --------------------------------------------------
  // File Selection Handler
  // --------------------------------------------------
  
  const fileSelection_handleSelect = useCallback((files: File[]) => {
    if (multiple) {
      // For multiple files, maintain array
      const currentFiles = Array.isArray(value) ? value : [];
      onChange([...currentFiles, ...files]);
    } else {
      // For single file, take the first one
      onChange(files[0] || null);
    }
  }, [onChange, value, multiple]);

  const fileSelection_handleRemove = useCallback((index: number) => {
    if (multiple && Array.isArray(value)) {
      const updatedFiles = value.filter((_, i) => i !== index);
      onChange(updatedFiles);
    } else {
      onChange(null);
    }
  }, [onChange, value, multiple]);

  const fileSelection = {
    handleSelect: fileSelection_handleSelect,
    handleRemove: fileSelection_handleRemove,
  };

  // --------------------------------------------------
  // Component Integration
  // --------------------------------------------------
  
  const integration_markup = (
    <div className="space-y-2">
      <FileUpload
        accept={accept}
        maxSize={maxSize}
        multiple={multiple}
        onFileSelect={fileSelection.handleSelect}
        onFileRemove={fileSelection.handleRemove}
        className={className}
        title={title}
        description={description}
        acceptedFormats={acceptedFormats}
        recommendedSize={recommendedSize}
        disabled={disabled}
      />
      
      {error && (
        <p className="text-sm text-red-600 dark:text-red-400 mt-1">
          {error.message}
        </p>
      )}
    </div>
  );

  const integration = {
    markup: integration_markup,
  };

  return integration.markup;
}