# Reuse Pipes with a static method

This has been very helpful for me in the past.

Angular pipes are great for transforming data in templates, but sometimes you need the same transformation logic in your components or services.

Instead of duplicating code, you can extract the pipe's logic into a static method to be used in other components and services.

## Basic Example

Let's say you have a pipe that formats file sizes:

```typescript
@Pipe({
  name: 'fileSize',
  standalone: true
})
export class FileSizePipe implements PipeTransform {
  transform(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
}
```

Lets make a static method that looks like the pipe's transform method and have the transform method call the static method.

```typescript
@Injectable({
  providedIn: 'root'
})
export class FileSizeService {
  public static formatBytes(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  public transform(bytes: number): string {
    return FileSizeService.formatBytes(bytes);
  }
}
```

## Using the Service

Now you can use this functionality both in templates and in your TypeScript code:

### In Templates (as a Pipe)
```html
<div>File size: {{ fileSize | fileSize }}</div>
```

### In Components (as a Service)
```typescript
import { FileSizeService } from './file-size.service';
@Component({
  // ...
})
export class MyComponent {
  displayFileSize(file: File) {
    const formattedSize = FileSizeService.formatBytes(file.size);
    console.log(`File size: ${formattedSize}`);
  }
}
```
