import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, inject } from '@angular/core';

/**
 * Usage: ```html
 * <button mat-raised-button ngx-dc-upload-file-button [accept]="application/pdf" (fileUploaded)="files.append($event)"></button>
 * ```
 */
@Directive({
  selector: 'button[ngx-dc-upload-file-button]',
  standalone: true,
  exportAs: 'uploadFileButton'
})
export class NgxDcUploadFileButtonDirective {
  private el = inject(ElementRef)

  private readonly input: HTMLInputElement
  private accepted: string = ''

  // TODO: Skipped for migration because:
  //  Accessor inputs cannot be migrated as they are too complex.
  @Input({ required: true, alias: 'accept' })
  public set typeAccepted(accept: string) {
    this.accepted = accept
    this.input.accept = accept
  }

  @Output() public fileUploaded = new EventEmitter<File>()
  @Output() public filesChanged = new EventEmitter<File[]>()
  public files: File[] = []
  constructor() {
    this.input = document.createElement('input')
    this.input.hidden = true
    this.input.style.display = 'none'
    this.input.type = 'file'
    this.input.addEventListener('change', (e: Event) => this.handleFileInput(e))
    this.el.nativeElement.addEventListener('click', (_e: Event) => { this.input.click() })
  }

  public removeFile(file: File) {
    this.files = this.files.filter(f => f.name !== file.name)
  }

  async handleFileInput(event: Event) {
    const target = event.target as HTMLInputElement
    if (target.files.length === 0) { return }

    for (let i = 0; i < target.files.length; i++) {
      const file = target.files.item(i)
      // Ignore the same file
      if (this.files.find(f => f.name === file.name && f.size === file.size)) { continue }
      this.files.push(file)
    }

    this.filesChanged.emit(this.files)

    this.files = []
    this.input.value = ''
  }

  public ngOnInit() {
    this.input.accept = this.accepted
    this.el.nativeElement.parentElement.appendChild(this.input)
  }
}
