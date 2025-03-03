import { Component, inject } from '@angular/core'
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
    imports: [
        DemoFileViewerComponent,
        MatTab,
        MatTabGroup,
        NgxDcDemoCardModule,
        BasicDropdownComponent,
        MatButtonModule,
    ],
    templateUrl: './dropdown-demo.component.html',
    styleUrl: './dropdown-demo.component.scss'
})
export class DropdownDemoComponent {
  private modalService = inject(NgxDcModalService);


  public async showModal() {
    const originPath = window.location.origin.includes('localhost') ? '/' : window.location.origin + window.location.pathname

    await this.modalService.showModal<CodeModalData>(CodeModalComponent, {
      data: {
        title: 'Dropdown',
        path: `${originPath}devcrate/ngx-dc-dropdown/README.md`,
        previousTitles: [],
        previousPaths: [],
      },
      width: '80vw',
      height: '80vh',
    })
  }
}
