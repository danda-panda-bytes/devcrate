import {NgModule} from '@angular/core';

import {NgxDcDemoCardComponent} from './demo-card.component';
import {DemoFileViewerComponent} from "./demo-file-viewer/demo-file-viewer.component";
import {
  NgxDcDemoCardButtonsDirective, NgxDcDemoCardExampleDirective, NgxDcDemoCardExampleTitleDirective,
  NgxDcDemoCardSubtitleDirective,
  NgxDcDemoCardTitleDirective, NgxDcDemoTabsDirective
} from "./demo-card.directives";
import { NgxMarkdownOnLinkClick } from './ngx-markdown-open-modal-on-file-links.directive';

export const COMPONENT_IMPORTS = [
  NgxDcDemoCardComponent,
  DemoFileViewerComponent,
  NgxDcDemoCardTitleDirective,
  NgxDcDemoCardSubtitleDirective,
  NgxDcDemoCardButtonsDirective,
  NgxDcDemoCardExampleDirective,
  NgxDcDemoTabsDirective,
  NgxDcDemoCardExampleTitleDirective,
  NgxMarkdownOnLinkClick,
]

@NgModule({
  imports: COMPONENT_IMPORTS,
  exports: COMPONENT_IMPORTS,
  declarations: [],
  providers: [],
})
export class NgxDcDemoCardModule {
}
