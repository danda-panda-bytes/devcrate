import { NgTemplateOutlet } from "@angular/common"
import { Component, ViewEncapsulation, input, contentChild } from '@angular/core'
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
    encapsulation: ViewEncapsulation.None
})
export class NgxDcDemoCardComponent {
  public title = input<string>();
  public subtitle = input<string>();

  public showCode = false
  showLinkIcon = input.required<boolean>();
  showCodeIcon = input.required<boolean>();

  readonly titleTemplate = contentChild.required(NgxDcDemoCardTitleDirective);
  readonly subtitleTemplate = contentChild.required(NgxDcDemoCardSubtitleDirective);
  readonly buttonsTemplate = contentChild(NgxDcDemoCardButtonsDirective);
  readonly exampleTemplate = contentChild.required(NgxDcDemoCardExampleDirective);
  readonly demoTabsTemplate = contentChild.required(NgxDcDemoTabsDirective);
  readonly exampleTitleTemplate = contentChild.required(NgxDcDemoCardExampleTitleDirective);
}
