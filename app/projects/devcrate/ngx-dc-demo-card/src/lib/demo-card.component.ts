import { NgTemplateOutlet } from "@angular/common"
import { Component, ContentChild, Input, ViewEncapsulation } from '@angular/core'
import { MatIconButton } from "@angular/material/button"
import { MatCardModule } from "@angular/material/card"
import { MatIconModule } from "@angular/material/icon"
import { MatTabsModule } from "@angular/material/tabs"
import { HighlightModule } from "ngx-highlightjs"
import {
  NgxDcDemoCardButtonsDirective, NgxDcDemoCardExampleDirective, NgxDcDemoCardExampleTitleDirective,
  NgxDcDemoCardSubtitleDirective,
  NgxDcDemoCardTitleDirective, NgxDcDemoTabsDirective
} from "./demo-card.directives"

@Component({
  selector: 'ngx-dc-demo-card',
  standalone: true,
  imports: [
    NgTemplateOutlet,
    HighlightModule,
    MatTabsModule,
    MatIconButton,
    MatIconModule,
    MatCardModule,
  ],
  templateUrl: './demo-card.component.html',
  styleUrl: './demo-card.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class NgxDcDemoCardComponent {
  @Input() public title: string
  @Input() public subtitle: string

  public showCode = false
  @Input() showLinkIcon!: boolean
  @Input() showCodeIcon!: boolean

  @ContentChild(NgxDcDemoCardTitleDirective) titleTemplate!: NgxDcDemoCardTitleDirective;
  @ContentChild(NgxDcDemoCardSubtitleDirective) subtitleTemplate!: NgxDcDemoCardSubtitleDirective;
  @ContentChild(NgxDcDemoCardButtonsDirective) buttonsTemplate!: NgxDcDemoCardButtonsDirective;
  @ContentChild(NgxDcDemoCardExampleDirective) exampleTemplate!: NgxDcDemoCardExampleDirective;
  @ContentChild(NgxDcDemoTabsDirective) demoTabsTemplate!: NgxDcDemoTabsDirective;
  @ContentChild(NgxDcDemoCardExampleTitleDirective) exampleTitleTemplate!: NgxDcDemoCardExampleTitleDirective
}
