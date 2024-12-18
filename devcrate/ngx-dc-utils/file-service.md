# File Service Documentation

The `FileService` is an Angular service designed to handle file operations such as uploading, downloading, and managing files within your application. This service provides a simple and efficient way to interact with file-related functionalities.

## Key Features

- **File Upload**: Easily upload files to the server with progress tracking.
- **File Download**: Download files from the server with support for various file types.
- **File Management**: Manage files, including listing, deleting, and retrieving file metadata.

## Installation

To use `FileService`, install the `ngx-dc-utils` package, run the following command:

```bash
npm i @devcrate/ngx-dc-utils
```

## Uploading a File

```typescript
import { FileService } from '@devcrate/ngx-dc-utils'

@Component({
  // ...
})
export class MyComponent {
  constructor(private fileService: FileService) { }

  async uploadFile(fileToUpload: File) {
    // The url is the endpoint your sending content to
    // The fileKey is the key you want to use for the file in the FormData (whatever you use on the server)
    // The fileToUpload is the file you want to upload
    await this.fileService.uploadFile(`/api/sds/${sdsId}`, 'sdsFile', fileToUpload, {
      "additionalFormDataKey": "value"
    })
  }
}
```

## Showing a File in a New Tab from a URL

```typescript
const isPdf = true
await this.fileService.openFileInNewTab(relativeOrHttpUrl, isPdf)
```

## Showing a File in a new tab from a File Object

```typescript
async open(file: File) {
  const isPdf = true
  await this.fileService.openFileInNewTabFromFile(file, isPdf)
}
```

## Downloading a File

```typescript
await this.fileService.downloadFile(relativeOrHttpUrl)
```

## Downloading a File from a File Object

```typescript
await this.fileService.downloadFileFromFile(file)
```

## Getting a File's Content

```typescript
const content: string = await this.fileService.getFileContent(relativeOrHttpUrl)
```

## Getting a File's Content from a File Object

```typescript
const content: string = await this.fileService.getFileContentFromFile(file)
```
