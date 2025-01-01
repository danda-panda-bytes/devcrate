# NgxDcUploadFileButton

A customizable file upload button component for Angular applications that provides an easy way to handle file uploads with progress tracking and validation.

## Installation

To use `NgxDcUploadFileButton`, install the `ngx-dc-utils` package, run the following command:

```bash
npm i @devcrate/ngx-dc-utils
```

## Features

- Material Design integration
- File type validation
- Custom button text and styling
- Progress tracking
- Error handling
- Multiple file support
- Drag and drop support

## Basic Usage

1. Import the component in your module or standalone component:

```typescript
import { NgxDcUploadFileButtonComponent } from '@devcrate/ngx-dc-utils';

@Component({
  // ...
  imports: [NgxDcUploadFileButtonComponent]
})
```

2. Use the component in your template:

```html
<ngx-dc-upload-file-button
  [accept]="'.pdf,.doc,.docx'"
  [multiple]="false"
  (fileSelected)="onFileSelected($event)"
>
  Upload Document
</ngx-dc-upload-file-button>
```

## API Reference

### Component Inputs

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| accept | string | null | Comma-separated list of allowed file types (e.g., '.pdf,.doc') |
| multiple | boolean | false | Allow multiple file selection |
| disabled | boolean | false | Disable the upload button |
| color | ThemePalette | 'primary' | Button color theme ('primary', 'accent', 'warn') |
| buttonType | string | 'raised' | Button type ('raised', 'stroked', 'flat', 'icon') |
| showProgress | boolean | true | Show upload progress indicator |
| maxFileSize | number | null | Maximum file size in bytes |

### Component Outputs

| Output | Type | Description |
|--------|------|-------------|
| fileSelected | EventEmitter<File \| File[]> | Emits when files are selected |
| uploadProgress | EventEmitter<number> | Emits upload progress (0-100) |
| uploadError | EventEmitter<string> | Emits error messages during upload |

### CSS Variables

```scss
--ngx-dc-upload-button-width: 200px;
--ngx-dc-upload-button-height: 36px;
--ngx-dc-upload-progress-color: var(--sys-primary);
--ngx-dc-upload-error-color: var(--sys-error);
```

## Examples

### Basic Upload Button

```html
<ngx-dc-upload-file-button
  accept=".pdf,.doc,.docx"
  (fileSelected)="onFileSelected($event)"
>
  Upload Document
</ngx-dc-upload-file-button>
```

### Multiple File Upload

```html
<ngx-dc-upload-file-button
  [multiple]="true"
  [maxFileSize]="5242880"
  (fileSelected)="onFilesSelected($event)"
  (uploadError)="handleError($event)"
>
  Upload Multiple Files
</ngx-dc-upload-file-button>
```

### Custom Styled Upload Button

```html
<ngx-dc-upload-file-button
  color="accent"
  buttonType="stroked"
  [showProgress]="true"
  (fileSelected)="onFileSelected($event)"
  (uploadProgress)="onProgress($event)"
>
  <mat-icon>upload</mat-icon>
  Upload Files
</ngx-dc-upload-file-button>
```

### Component Implementation

```typescript
export class MyComponent {
  onFileSelected(file: File) {
    console.log('Selected file:', file.name);
  }

  onProgress(progress: number) {
    console.log('Upload progress:', progress);
  }

  handleError(error: string) {
    console.error('Upload error:', error);
  }
}
```

## Theming

The component uses Angular Material's theming system and can be customized using CSS variables. Add these to your global styles or component styles:

```scss
:root {
  --ngx-dc-upload-button-width: 250px;
  --ngx-dc-upload-button-height: 42px;
  --ngx-dc-upload-progress-color: #2196f3;
  --ngx-dc-upload-error-color: #f44336;
}
```

## Related Documentation

- [Angular Material Buttons](https://material.angular.io/components/button/overview)
- [File API](https://developer.mozilla.org/en-US/docs/Web/API/File)
