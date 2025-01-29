import { Directive, ElementRef, Input, TemplateRef, ViewChild, inject } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, firstValueFrom} from "rxjs";
import {PdfViewerComponent} from "ng2-pdf-viewer";

@Directive({
  selector: '[ngxDcAuthPdfSrc]',
  standalone: true,
  exportAs: 'pdfSrc'
})
export class NgxDcAuthPdfSrcDirective {
  private http = inject(HttpClient)

  @ViewChild(PdfViewerComponent) private host: PdfViewerComponent

  public error: string

  // TODO: Skipped for migration because:
  //  Accessor inputs cannot be migrated as they are too complex.
  @Input()
  public set file(file: File) {
    this._file = file
    if (!file) { return }
    this.tryRetrieval(() => this.readLocalFile())
  }
  public get file(): File { return this._file }
  private _file: File

  // TODO: Skipped for migration because:
  //  Accessor inputs cannot be migrated as they are too complex.
  @Input()
  public set fileUrl(src: string) {
    this._fileUrl = src
    if (!src) { return }
    this.tryRetrieval(() => this.readUrlFile())
  }
  public get fileUrl(): string { return this._fileUrl }

  public loading = new BehaviorSubject<boolean>(true)
  private _fileUrl: string

  public src: string

  public async readLocalFile(): Promise<void> {
    this.loading.next(true)
    return new Promise(resolve => {
      let reader = new FileReader();
      reader.onload = (e: any) => {
        this.src = e.target.result;
        resolve()
      };
      reader.readAsArrayBuffer(this.file)
    })
  }

  private async readUrlFile() {
    this.loading.next(true)
    let responseBlob = await firstValueFrom(this.http.get(this.fileUrl, { responseType: 'blob' }))
    responseBlob = new Blob([responseBlob], { type: 'application/pdf' })
    this.src = URL.createObjectURL(responseBlob);
    this.loading.next(false)
  }

  public async tryRetrieval(retrieve: () => Promise<any>) {
    try {
      this.error = ""
      await retrieve()
    } catch (err) {
      this.error = "Unable to retrieve image"
    }
  }
}
