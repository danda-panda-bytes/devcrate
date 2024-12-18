import { Component, Inject } from '@angular/core'
import { MatTab, MatTabGroup } from '@angular/material/tabs'
import {
  CodeModalComponent,
  CodeModalData,
  DemoFileViewerComponent,
  NgxDcDemoCardModule,
} from '@devcrate/ngx-dc-demo-card'
import { BasicDropdownComponent } from './basic-dropdown/basic-dropdown.component'
import { NgxDcModalService, NgxDcModalServiceToken } from '@devcrate/ngx-dc-utils'
import { MatButtonModule } from '@angular/material/button'

@Component({
  selector: 'app-dropdown-demo',
  standalone: true,
  imports: [
    DemoFileViewerComponent,
    MatTab,
    MatTabGroup,
    NgxDcDemoCardModule,
    BasicDropdownComponent,
    MatButtonModule,
  ],
  templateUrl: './dropdown-demo.component.html',
  styleUrl: './dropdown-demo.component.scss',
})
export class DropdownDemoComponent {
  constructor(@Inject(NgxDcModalServiceToken) private modalService: NgxDcModalService) {}

  public async showModal() {
    await this.modalService.showModal<CodeModalData>(CodeModalComponent, {
      data: {
        title: 'Dropdown',
        path: '/devcrate/ngx-dc-dropdown/README.md',
        previousTitles: [],
        previousPaths: [],
      },
      width: '80vw',
      height: '80vh',
    })
  }
}
