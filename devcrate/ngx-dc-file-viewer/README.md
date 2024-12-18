# File Viewer Component

The `ngx-dc-file-viewer` component allows you to display PDFs and images inline against **authenticated URLs**. It provides a simple and effective way to integrate file viewing capabilities into your Angular applications.

## Installation

```bash
npm i @devcrate/ngx-dc-file-viewer
```

## Features

- Supports viewing of local images and PDFs.
- Allows viewing of images and PDFs from authenticated URLs.
- Customizable height and width for file viewers.

## Basic Usage

### To View a Local Image

```html
<ngx-dc-file-viewer fileName="file.name" [file]="file"></ngx-dc-file-viewer>
```

### To View a Local PDF

```html
<ngx-dc-file-viewer fileName="file.name" [file]="file" height="500px" width="300px"></ngx-dc-file-viewer>
```

### To View an Image from a URL

```html
<ngx-dc-file-viewer fileName="myfile.png" fileUrl="/api/docs/myfile.png"></ngx-dc-file-viewer>
```

### To View a PDF from a URL

```html
<ngx-dc-file-viewer fileName="myfile.pdf" fileUrl="/api/docs/myfile.pdf" height="500px" width="300px"></ngx-dc-file-viewer>
```

## API Reference

### Component Inputs

| Input      | Type   | Default | Description                                      |
|------------|--------|---------|--------------------------------------------------|
| fileName   | string | required| The name of the file to display.                 |
| file       | File   | optional| The file object for local file viewing. Though its , you need either file or fileUrl          |
| fileUrl    | string | optional| The URL of the file to display. Though its , you need either file or fileUrl                  |
| height     | string | 'auto'  | The height of the viewer (e.g., '500px').        |
| width      | string | '100%'  | The width of the viewer (e.g., '300px').         |

## Examples

### Basic Image Viewer

```html
<ngx-dc-file-viewer fileName="example.png" fileUrl="/api/docs/example.png"></ngx-dc-file-viewer>
```

### Basic PDF Viewer

```html
<ngx-dc-file-viewer fileName="example.pdf" fileUrl="/api/docs/example.pdf" height="500px" width="300px"></ngx-dc-file-viewer>
```

## Related Libraries

- For dropdown functionality, check out [@devcrate/ngx-dc-dropdown](../ngx-dc-dropdown/README.md#modal).
- For data source management, see [@devcrate/ngx-dc-data-sources](../ngx-dc-data-sources/README.md#modal)
