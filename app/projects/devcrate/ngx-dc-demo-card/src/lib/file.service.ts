import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {firstValueFrom, Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";

@Injectable({
  providedIn: 'root',
})
export class FileService {
  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {}

  async getFileBlockContent(filePath: string, section: string): Promise<string> {
    const startMarker = `<!-- ${section} START -->`;
    const endMarker = `<!-- ${section} END -->`;

    return firstValueFrom(this.http.get(filePath, { responseType: 'text' }).pipe(
      map((content) => {
        if (section) {
          const startIdx = content.indexOf(startMarker);
          const endIdx = content.indexOf(endMarker, startIdx + startMarker.length);

          if (startIdx === -1 || endIdx === -1) {
            return ''; // Markers not found, return empty string
          }

          // Extract the content between the markers
          //
          content = content.substring(startIdx + startMarker.length, endIdx)
        }

        return content.trim()
      })
    ))
  }


  public escapeHtml(content: string): string {
    return content
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;')
      .replace(/&/g, '&amp;')
      .replace(/@/g, '&#64;')
  }
}
