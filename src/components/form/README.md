# File Upload Components

A comprehensive set of file upload components built following the established naming conventions and integrated with React Hook Form.

## Components

### 1. FileUpload (Standalone)
A standalone file upload component with drag & drop functionality.

### 2. FileUploadField (React Hook Form Integration)
A React Hook Form integrated version for form-based file uploads.

## Features

- ✅ **Drag & Drop Support** - Native drag and drop file selection
- ✅ **Click to Upload** - Traditional file input click selection  
- ✅ **File Validation** - Type and size validation with custom error messages
- ✅ **Progress Indication** - Visual upload progress feedback
- ✅ **File Previews** - Display selected files with removal options
- ✅ **Multiple File Support** - Single or multiple file selection
- ✅ **React Hook Form Integration** - Seamless form validation and submission
- ✅ **Accessibility** - Full keyboard and screen reader support
- ✅ **Dark Mode Support** - Responsive to theme changes
- ✅ **TypeScript** - Full type safety and IntelliSense
- ✅ **Customizable** - Extensive configuration options

## Installation

The components are already included in your project. Import them from the form components:

```typescript
import { FileUpload, FileUploadField } from "@/components/form";
```

## Basic Usage

### Standalone Component

```typescript
import { FileUpload } from "@/components/form";

function MyComponent() {
  const handleFileSelect = (files: File[]) => {
    console.log("Selected files:", files);
  };

  const handleFileRemove = (index: number) => {
    console.log("Removed file at index:", index);
  };

  return (
    <FileUpload
      title="Upload Images"
      description="Drag & drop or click to upload"
      accept=".jpg,.jpeg,.png,.webp"
      acceptedFormats=".jpg, .jpeg, .png, .webp"
      maxSize={5 * 1024 * 1024} // 5MB
      multiple={true}
      onFileSelect={handleFileSelect}
      onFileRemove={handleFileRemove}
    />
  );
}
```

### React Hook Form Integration

```typescript
import { useForm } from "react-hook-form";
import { FileUploadField } from "@/components/form";

interface FormData {
  productImages: File[];
  profilePicture: File | null;
}

function MyForm() {
  const { control, handleSubmit } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log("Form data:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Multiple files */}
      <FileUploadField
        name="productImages"
        control={control}
        title="Product Images"
        multiple={true}
        rules={{ required: "At least one image is required" }}
      />

      {/* Single file */}
      <FileUploadField
        name="profilePicture"
        control={control}
        title="Profile Picture"
        multiple={false}
        accept=".jpg,.jpeg,.png"
      />

      <button type="submit">Submit</button>
    </form>
  );
}
```

## Props

### FileUpload Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `accept` | `string` | `".jpg,.jpeg,.png,.gif,.webp"` | Accepted file types |
| `maxSize` | `number` | `5242880` (5MB) | Maximum file size in bytes |
| `multiple` | `boolean` | `false` | Allow multiple file selection |
| `onFileSelect` | `(files: File[]) => void` | - | Callback when files are selected |
| `onFileRemove` | `(index: number) => void` | - | Callback when a file is removed |
| `className` | `string` | - | Additional CSS classes |
| `title` | `string` | `"Product Image"` | Upload area title |
| `description` | `string` | `"Drag & drop or click to upload"` | Upload area description |
| `acceptedFormats` | `string` | `".jpg, .png, .gif, .webp"` | Display text for accepted formats |
| `recommendedSize` | `string` | `"1080x1080 px"` | Display text for recommended size |
| `disabled` | `boolean` | `false` | Disable the upload component |

### FileUploadField Props

Extends all `FileUpload` props plus React Hook Form controller props:

| Prop | Type | Description |
|------|------|-------------|
| `name` | `string` | Field name for form registration |
| `control` | `Control` | React Hook Form control object |
| `rules` | `object` | Validation rules |
| `defaultValue` | `any` | Default field value |

## File Validation

### Size Validation

Files are automatically validated against the `maxSize` prop:

```typescript
<FileUpload
  maxSize={2 * 1024 * 1024} // 2MB limit
  // ... other props
/>
```

### Type Validation

Files are validated against the `accept` prop:

```typescript
<FileUpload
  accept=".pdf,.doc,.docx"
  acceptedFormats=".pdf, .doc, .docx"
  // ... other props
/>
```

### Custom Validation (React Hook Form)

```typescript
<FileUploadField
  name="documents"
  control={control}
  rules={{
    required: "Please upload at least one document",
    validate: {
      maxFiles: (files: File[]) => {
        if (files.length > 5) {
          return "Maximum 5 files allowed";
        }
        return true;
      },
      fileType: (files: File[]) => {
        const invalidFiles = files.filter(file => 
          !file.name.toLowerCase().endsWith('.pdf')
        );
        if (invalidFiles.length > 0) {
          return "Only PDF files are allowed";
        }
        return true;
      }
    }
  }}
/>
```

## Styling

The components use Tailwind CSS and HeroUI components. You can customize the appearance by:

### Custom Styling

```typescript
<FileUpload
  className="my-custom-upload-area"
  // ... other props
/>
```

### Theme Support

The components automatically adapt to your app's dark/light theme using Tailwind's dark mode utilities.

## Examples

### Image Upload with Preview

```typescript
function ImageUpload() {
  return (
    <FileUpload
      title="Product Photos"
      description="Upload high-quality product images"
      accept=".jpg,.jpeg,.png,.webp"
      acceptedFormats=".jpg, .jpeg, .png, .webp"
      maxSize={10 * 1024 * 1024} // 10MB
      multiple={true}
      recommendedSize="1200x1200 px or higher"
      onFileSelect={(files) => {
        files.forEach(file => {
          console.log(`Selected: ${file.name} (${file.size} bytes)`);
        });
      }}
    />
  );
}
```

### Document Upload

```typescript
function DocumentUpload() {
  return (
    <FileUpload
      title="Legal Documents"
      description="Upload required legal documents"
      accept=".pdf,.doc,.docx"
      acceptedFormats=".pdf, .doc, .docx"
      maxSize={20 * 1024 * 1024} // 20MB
      multiple={true}
      recommendedSize="Any size up to 20MB"
    />
  );
}
```

### Profile Picture Upload

```typescript
function ProfilePictureUpload() {
  const { control } = useForm();

  return (
    <FileUploadField
      name="profilePicture"
      control={control}
      title="Profile Picture"
      description="Upload your profile photo"
      accept=".jpg,.jpeg,.png"
      acceptedFormats=".jpg, .jpeg, .png"
      maxSize={5 * 1024 * 1024} // 5MB
      multiple={false}
      recommendedSize="400x400 px"
      rules={{
        required: "Profile picture is required"
      }}
    />
  );
}
```

## File Processing

### Accessing Selected Files

With standalone component:

```typescript
const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

const handleFileSelect = (files: File[]) => {
  setSelectedFiles(prev => [...prev, ...files]);
  
  // Process files
  files.forEach(async (file) => {
    // Upload to server
    const formData = new FormData();
    formData.append('file', file);
    
    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      console.log('Upload successful:', await response.json());
    } catch (error) {
      console.error('Upload failed:', error);
    }
  });
};
```

With React Hook Form:

```typescript
const { control, watch } = useForm();
const watchedFiles = watch('documents');

useEffect(() => {
  if (watchedFiles?.length > 0) {
    console.log('Form files updated:', watchedFiles);
    // Process the files
  }
}, [watchedFiles]);
```

## Error Handling

The components provide built-in error handling for:

- **File size exceeding limit**: Shows size limit error
- **Invalid file type**: Shows accepted formats error
- **Upload failures**: Can be extended with custom error handling

### Custom Error Handling

```typescript
function CustomUpload() {
  const [error, setError] = useState<string>("");

  const handleFileSelect = async (files: File[]) => {
    setError("");
    
    try {
      // Custom validation
      if (files.length > 10) {
        throw new Error("Maximum 10 files allowed");
      }
      
      // Custom processing
      await processFiles(files);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    }
  };

  return (
    <div>
      <FileUpload onFileSelect={handleFileSelect} />
      {error && (
        <div className="mt-2 text-red-600 text-sm">{error}</div>
      )}
    </div>
  );
}
```

## Architecture

The components follow the established naming conventions:

- **State variables**: `[feature]_[property]` pattern
- **Handlers**: `[feature]_handle[Action]` pattern  
- **Toggles**: `[feature]_toggle[Suffix?]` pattern
- **Markup**: `[feature]_markup` pattern
- **Feature aggregation**: Related functionality grouped into objects
- **Comment sections**: Clear separation of logical sections

This ensures consistency with the rest of the codebase and makes the components maintainable and extensible.
