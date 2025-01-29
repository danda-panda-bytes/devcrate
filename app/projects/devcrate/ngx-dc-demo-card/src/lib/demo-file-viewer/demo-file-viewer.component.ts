import { Component, Input, OnInit, inject } from "@angular/core";
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

  @Input() filePath!: string
  @Input() language!: string

  @Input() public section: string

  public fileContent: string = ""

  public async ngOnInit(): Promise<void> {
    this.fileContent = await this.fileService.getFileBlockContent(this.filePath, this.section)
  }
}
