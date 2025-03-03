import { Component, OnInit, inject, input } from "@angular/core";
import {FileService} from "../file.service";
import {HighlightModule} from "ngx-highlightjs";

@Component({
    selector: 'ngx-dc-demo-file-viewer',
    imports: [
        HighlightModule,
    ],
    templateUrl: "./demo-file-viewer.component.html"
})
export class DemoFileViewerComponent implements OnInit {
  private fileService = inject(FileService);

  readonly filePath = input.required<string>();
  readonly language = input.required<string>();

  public readonly section = input<string>();

  public fileContent: string = ""

  public async ngOnInit(): Promise<void> {
    this.fileContent = await this.fileService.getFileBlockContent(this.filePath(), this.section())
  }
}
