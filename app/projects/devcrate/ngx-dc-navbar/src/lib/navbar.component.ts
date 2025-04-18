import { AsyncPipe, NgStyle, NgTemplateOutlet } from "@angular/common";
import { Component, HostListener, OnInit, ViewEncapsulation, contentChild, inject, input } from '@angular/core';
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatRippleModule } from "@angular/material/core";
import { MatIconModule } from "@angular/material/icon";
import { MatListItem, MatNavList } from "@angular/material/list";
import { MatMenuModule } from "@angular/material/menu";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatTooltipModule } from "@angular/material/tooltip";
import { RouterModule } from "@angular/router";
import { NgxDcModalService, NgxDcModalServiceToken } from "@devcrate/ngx-dc-utils";
import {
  NgxDcNavbarLeftTopBarContentDirective,
  NgxDcNavbarMainContentDirective,
  NgxDcNavbarRightTopBarContentDirective,
  NgxDcNavbarSidebarDirective, NgxDcNavbarSidebarLinksDirective
} from "./navbar.directives";
import { NgxDcNavbarLinksConfig, NgxDcNavbarService, NgxDcNavbarServiceToken } from "./navbar.service";

@Component({
    selector: 'ngx-dc-navbar',
    imports: [
        MatMenuModule,
        MatCheckboxModule,
        MatTooltipModule,
        RouterModule,
        MatIconModule,
        MatProgressBarModule,
        NgTemplateOutlet,
        AsyncPipe,
        MatRippleModule,
        MatListItem,
        MatNavList,
        NgStyle,
    ],
    templateUrl: "navbar.component.html",
    styleUrls: ["navbar.component.scss"],
    encapsulation: ViewEncapsulation.None
})
export class NgxDcNavbarComponent implements OnInit {
  modalService = inject<NgxDcModalService>(NgxDcModalServiceToken);
  navbarService = inject<NgxDcNavbarService>(NgxDcNavbarServiceToken);
  links = inject(NgxDcNavbarLinksConfig);

  public readonly mainTitle = input.required<string>();
  public readonly appLogo = input<string>();
  public readonly appLogoUrl = input<string>(null);
  public readonly version = input<string>(null);
  public readonly topBarBackgroundImage = input<string>(null);
  public readonly collapseButtonText = input<string>(null);
  public readonly useCustomLeftTopBar = input<boolean>(false);

  public SMALL_SCREEN_WIDTH = 768;
  public opened = false;
  public item: string = ''

  readonly rightTopBarContentTemplate = contentChild(NgxDcNavbarRightTopBarContentDirective);
  readonly leftTopBarContentTemplate = contentChild(NgxDcNavbarLeftTopBarContentDirective);
  readonly mainContentTemplate = contentChild(NgxDcNavbarMainContentDirective);
  readonly sideBarContentTemplate = contentChild(NgxDcNavbarSidebarDirective);
  readonly sidebarLinksTemplate = contentChild(NgxDcNavbarSidebarLinksDirective);

  @HostListener("window:resize")
  public onWindowResize() {
    this.navbarService.collapsed$.next(window?.innerWidth < this.SMALL_SCREEN_WIDTH)
  }

  async ngOnInit(): Promise<void> {
    this.onWindowResize()
  }
}
