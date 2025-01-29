import {Component, Input, OnInit} from "@angular/core";
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
  @Input() filePath!: string
  @Input() language!: string

  @Input() public section: string

  public fileContent: string = ""

  constructor(private fileService: FileService) {}

  public async ngOnInit(): Promise<void> {
    this.fileContent = await this.fileService.getFileBlockContent(this.filePath, this.section)
  }
}
