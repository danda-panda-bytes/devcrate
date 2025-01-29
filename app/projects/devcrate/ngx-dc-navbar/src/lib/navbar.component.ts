import { AsyncPipe, NgStyle, NgTemplateOutlet } from "@angular/common";
import {
  Component,
  ContentChild,
  HostListener,
  Inject,
  Input,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
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
  NgxDcNavbarMainContentDirective,
  NgxDcNavbarRightTopBarContentDirective,
  NgxDcNavbarSidebarDirective, NgxDcNavbarSidebarLinksDirective
} from "./navbar.directives";
import { NgxDcNavbarLinkInfo } from "./navbar.model";
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
  @Input({ required: true }) public mainTitle: string
  @Input() public appLogo: string
  @Input() public appLogoUrl: string = null
  @Input() public version: string = null
  @Input() public topBarBackgroundImage: string = null
  @Input() public collapseButtonText: string = null

  public SMALL_SCREEN_WIDTH = 768;
  public opened = false;
  public item: string = ''

  @ContentChild(NgxDcNavbarRightTopBarContentDirective) public rightTopBarContentTemplate: NgxDcNavbarRightTopBarContentDirective
  @ContentChild(NgxDcNavbarMainContentDirective) public mainContentTemplate: NgxDcNavbarMainContentDirective
  @ContentChild(NgxDcNavbarSidebarDirective) public sideBarContentTemplate: NgxDcNavbarSidebarDirective
  @ContentChild(NgxDcNavbarSidebarLinksDirective) public sidebarLinksTemplate: NgxDcNavbarSidebarLinksDirective

  constructor(
    @Inject(NgxDcModalServiceToken) public modalService: NgxDcModalService,
    @Inject(NgxDcNavbarServiceToken) public navbarService: NgxDcNavbarService,
    @Inject(NgxDcNavbarLinksConfig) public links: NgxDcNavbarLinkInfo[],
  ) {}

  @HostListener("window:resize")
  public onWindowResize() {
    this.navbarService.collapsed$.next(window?.innerWidth < this.SMALL_SCREEN_WIDTH)
  }

  async ngOnInit(): Promise<void> {
    this.onWindowResize()
  }
}
