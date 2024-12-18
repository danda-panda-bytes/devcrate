import {Directive, ElementRef, Input, TemplateRef} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, firstValueFrom} from "rxjs";

@Directive({
  selector: '[ngxDcAuthImgSrc]',
  standalone: true,
  exportAs: 'imgSrc'
})
export class NgxDcAuthImgSrcDirective {
  public initialized = false
  public error: string
  public loading = new BehaviorSubject<boolean>(true)
  @Input()
  public set file(file: File) {
    this._file = file
    if (!file) { return }
    this.tryRetrieval(() => this.retrieveLocalFileImage())
  }
  public get file(): File { return this._file }
  private _file: File

  @Input()
  public set fileUrl(src: string) {
    this._fileUrl = src
    if (!src) { return }
    this.tryRetrieval(() => this.retrieveFileUrlImage())
  }
  public get fileUrl(): string { return this._fileUrl }

  private _fileUrl: string

  constructor(private http: HttpClient, private el: ElementRef<HTMLImageElement>) { }

  public async retrieveFileUrlImage() {
    this.loading.next(true)
    const response = await firstValueFrom(this.http.get(this.fileUrl, { responseType: 'blob' }))
    const reader = new FileReader()
    reader.onloadend = (e) => {
      this.el.nativeElement.src = e.target.result as string
      this.loading.next(false)
    }

    reader.onerror = (event: any) => {
      console.error("File could not be read: " + event.target.error.code);
    };

    reader.readAsDataURL(response)
  }

  public async retrieveLocalFileImage() {
    this.loading.next(true)
    const reader = new FileReader();

    reader.onload = (event: any) => {
      this.el.nativeElement.src = event.target.result;
      this.loading.next(false)
    };

    reader.onerror = (event: any) => {
      console.log("File could not be read: " + event.target.error.code);
    };

    reader.readAsDataURL(this.file);
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
