"use client";

import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Card } from "@heroui/react";
import { FileUpload, FileUploadField } from "../components/form";

interface FormData {
  productImages: File[];
  profilePicture: File | null;
  documents: File[];
}

export function FileUploadDemo() {
  // --------------------------------------------------
  // Form State
  // --------------------------------------------------
  
  const form = useForm<FormData>({
    defaultValues: {
      productImages: [],
      profilePicture: null,
      documents: [],
    },
  });

  const { control, handleSubmit, watch, reset } = form;

  // --------------------------------------------------
  // Standalone File Upload State
  // --------------------------------------------------
  
  const [standalone_files, standalone_setFiles] = useState<File[]>([]);
  
  const standalone_handleFileSelect = useCallback((files: File[]) => {
    console.log("Standalone files selected:", files);
    standalone_setFiles(prev => [...prev, ...files]);
  }, []);

  const standalone_handleFileRemove = useCallback((index: number) => {
    standalone_setFiles(prev => prev.filter((_, i) => i !== index));
  }, []);

  const standalone = {
    files: standalone_files,
    setFiles: standalone_setFiles,
    handleFileSelect: standalone_handleFileSelect,
    handleFileRemove: standalone_handleFileRemove,
  };

  // --------------------------------------------------
  // Form Submission
  // --------------------------------------------------
  
  const form_handleSubmit = useCallback((data: FormData) => {
    console.log("Form submitted with data:", data);
    alert("Form submitted! Check console for details.");
  }, []);

  const form_handleReset = useCallback(() => {
    reset();
    standalone.setFiles([]);
  }, [reset, standalone]);

  const formSubmission = {
    handleSubmit: form_handleSubmit,
    handleReset: form_handleReset,
  };

  // --------------------------------------------------
  // Watch Form Values
  // --------------------------------------------------
  
  const watchedValues = watch();

  // --------------------------------------------------
  // Demo Sections Markup
  // --------------------------------------------------
  
  const standaloneDemo_markup = (
    <Card className="p-6">
      <h2 className="text-xl font-bold mb-4">Standalone File Upload</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-4">
        This is a standalone file upload component that manages its own state.
      </p>
      
      <FileUpload
        title="Project Files"
        description="Upload project related files"
        accept=".pdf,.doc,.docx,.txt,.jpg,.png"
        acceptedFormats=".pdf, .doc, .docx, .txt, .jpg, .png"
        maxSize={10 * 1024 * 1024} // 10MB
        multiple={true}
        onFileSelect={standalone.handleFileSelect}
        onFileRemove={standalone.handleFileRemove}
        recommendedSize="Any size up to 10MB"
      />
      
      {standalone.files.length > 0 && (
        <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <h4 className="font-medium mb-2">Selected Files ({standalone.files.length}):</h4>
          <ul className="text-sm space-y-1">
            {standalone.files.map((file, index) => (
              <li key={index} className="text-gray-600 dark:text-gray-400">
                {file.name} ({(file.size / 1024).toFixed(1)} KB)
              </li>
            ))}
          </ul>
        </div>
      )}
    </Card>
  );

  const formDemo_markup = (
    <Card className="p-6">
      <h2 className="text-xl font-bold mb-4">React Hook Form Integration</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-4">
        These file upload components are integrated with React Hook Form for form validation and submission.
      </p>
      
      <form onSubmit={handleSubmit(formSubmission.handleSubmit)} className="space-y-6">
        {/* Multiple Product Images */}
        <FileUploadField
          name="productImages"
          control={control}
          title="Product Images"
          description="Upload multiple product images"
          accept=".jpg,.jpeg,.png,.webp"
          acceptedFormats=".jpg, .jpeg, .png, .webp"
          maxSize={5 * 1024 * 1024} // 5MB
          multiple={true}
          rules={{ required: "At least one product image is required" }}
        />

        {/* Single Profile Picture */}
        <FileUploadField
          name="profilePicture"
          control={control}
          title="Profile Picture"
          description="Upload your profile picture"
          accept=".jpg,.jpeg,.png"
          acceptedFormats=".jpg, .jpeg, .png"
          maxSize={2 * 1024 * 1024} // 2MB
          multiple={false}
          recommendedSize="400x400 px"
        />

        {/* Multiple Documents */}
        <FileUploadField
          name="documents"
          control={control}
          title="Supporting Documents"
          description="Upload supporting documents"
          accept=".pdf,.doc,.docx"
          acceptedFormats=".pdf, .doc, .docx"
          maxSize={10 * 1024 * 1024} // 10MB
          multiple={true}
        />

        <div className="flex gap-4">
          <Button type="submit" color="primary">
            Submit Form
          </Button>
          <Button 
            type="button" 
            variant="flat" 
            onPress={formSubmission.handleReset}
          >
            Reset Form
          </Button>
        </div>
      </form>
      
      {/* Debug Information */}
      <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <h4 className="font-medium mb-2">Form Values (Debug):</h4>
        <pre className="text-xs text-gray-600 dark:text-gray-400 overflow-auto">
          {JSON.stringify({
            productImages: watchedValues.productImages?.map(f => ({ name: f.name, size: f.size })) || [],
            profilePicture: watchedValues.profilePicture ? { name: watchedValues.profilePicture.name, size: watchedValues.profilePicture.size } : null,
            documents: watchedValues.documents?.map(f => ({ name: f.name, size: f.size })) || [],
          }, null, 2)}
        </pre>
      </div>
    </Card>
  );

  const demo_markup = (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">File Upload Component Demo</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Examples of both standalone and React Hook Form integrated file upload components
        </p>
      </div>
      
      {standaloneDemo_markup}
      {formDemo_markup}
    </div>
  );

  const demo = {
    standaloneDemo: {
      markup: standaloneDemo_markup,
    },
    formDemo: {
      markup: formDemo_markup,
    },
    markup: demo_markup,
  };

  return demo.markup;
}