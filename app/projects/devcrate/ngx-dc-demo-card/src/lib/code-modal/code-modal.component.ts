import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {NgxDcModalService} from "@devcrate/ngx-dc-utils";
import {MAT_DIALOG_DATA, MatDialogModule} from "@angular/material/dialog";
import {DialogRef} from "@angular/cdk/dialog";
import {MarkdownModule} from "ngx-markdown";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import { NgxMarkdownOnLinkClick } from '../ngx-markdown-open-modal-on-file-links.directive';

export interface CodeModalData {
  title: string
  path: string
  previousTitles: string[]
  previousPaths: string[]
}

@Component({
    selector: 'code-modal',
    templateUrl: 'code-modal.component.html',
    styleUrl: 'code-modal.component.scss',
    encapsulation: ViewEncapsulation.None,
    imports: [
        MarkdownModule,
        NgxMarkdownOnLinkClick,
        MatDialogModule,
        MatButton,
        MatIconButton,
        MatIcon,
    ]
})

export class CodeModalComponent {
  constructor(
    private modalService: NgxDcModalService,
    private dialogRef: DialogRef<CodeModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CodeModalData,
  ) {}

  public async showModal(hashName: string, path: string) {
    this.dialogRef.close()
    await this.modalService.showModal<CodeModalData>(CodeModalComponent, {
      data: {
        title: hashName,
        path: path,
        previousTitles: [...this.data.previousTitles, this.data.title],
        previousPaths: [...this.data.previousPaths, this.data.path],
      },
      width: '80vw',
      height: '80vh',
    })
  }

  public async showPreviousModal() {
    this.dialogRef.close()
    await this.modalService.showModal<CodeModalData>(CodeModalComponent, {
      data: {
        title: this.data.previousTitles[this.data.previousTitles.length - 1],
        path: this.data.previousPaths[this.data.previousPaths.length - 1],
        previousTitles: this.data.previousTitles.slice(0, -1),
        previousPaths: this.data.previousPaths.slice(0, -1),
      },
      width: '80vw',
      height: '80vh',
    })
  }
}
