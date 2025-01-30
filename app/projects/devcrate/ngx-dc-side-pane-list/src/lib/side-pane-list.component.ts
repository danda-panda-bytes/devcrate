import { ScrollingModule } from "@angular/cdk/scrolling";
import { CommonModule } from "@angular/common";
import { Component, ElementRef, ViewEncapsulation, inject, input, contentChild, viewChild, viewChildren, model } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatListItem, MatListModule } from "@angular/material/list";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatTooltipModule } from "@angular/material/tooltip";
import { NgxDcFilledCountPipe, NgxDcModalService, NgxDcModalServiceToken } from "@devcrate/ngx-dc-utils";
import { BehaviorSubject, skip } from "rxjs";
import { NgxDcPaneContentDirective } from "./directives/pane-content.directive";
import { NgxDcPanePageInfoDirective } from "./directives/pane-page-info.directive";
import {
  NgxDcSidePaneFooterDirective,
  NgxDcSidePaneItemDirective,
  NgxDcSidePaneItemIconDirective, NgxDcSidePaneItemLineNumberDirective,
  NgxDcSidePaneItemRightTextDirective,
  NgxDcSidePaneItemSubtitleDirective,
  NgxDcSidePaneItemTextDirective,
  NgxDcSidePaneLoadingItemDirective
} from "./directives/side-pane-item.directive";
import { NgxDcInfiniteSidePaneListDataSource, NgxDcSidePaneListApiDataSource } from "./side-pane-list.data-source";

/**
 * Just like a mat-table, but instead of a table for the entire area, it has a left pane and a right side content.
 * The left pane will display the list of items and the right pane will show the details for the selected item.
 * You can filter, and page items.
 *
 * General Usage:
 * ```html
 * <ngx-dc-side-pane-list [dataSource]="dataSource">
 *   <ng-container *ngxDcPanePageInfo="let selectedItem; let totalCount = totalCount; let collapsed = collapsed">
 *     Top area of the left pane so you can have a filter, display page info, etc.
 *   </ng-container>
 *   <ng-container *ngxDcSidePaneItem="let item; let index = index">
 *     Left Pane Item
 *   </ng-container>
 *   <ng-container *ngxDcPaneContent="let currentItem">
 *       Right Pane Content
 *   </ng-container>
 * </ngx-dc-side-pane-list>
 * ```
 */
@Component({
    selector: 'ngx-dc-side-pane-list',
    imports: [
        CommonModule,
        MatProgressBarModule,
        MatIconModule,
        MatListModule,
        MatButtonModule,
        MatCardModule,
        MatTooltipModule,
        ScrollingModule,
        NgxDcFilledCountPipe,
        MatInputModule,
        FormsModule,
        MatFormFieldModule,
    ],
    templateUrl: './side-pane-list.component.html',
    styleUrl: './side-pane-list.component.scss',
    encapsulation: ViewEncapsulation.None
})
export class NgxDcSidePaneListComponent<GetDataItemsT, FinalDataItemsT = GetDataItemsT, RetrievedItemT = GetDataItemsT> {
  public modalService = inject<NgxDcModalService>(NgxDcModalServiceToken);

  public destroy$ = new BehaviorSubject(false)
  /**
   * Whether the left pane is collapsed or not.
   */
  public collapsed = model(false);
  /**
   * Whether the dao being used is infinite scrolling or not.
   */
  public readonly useInfiniteScrolling = input<boolean>(false)

  /** Whether the table will show the global loading bar (defined in the ModalService) or not. */
  public readonly useGlobalLoader = input<boolean>(true)

  /** When a user clicks on an item, should the global loading bar be shown */
  public readonly useGlobalOnItem = input<boolean>(true)

  /** Whether the left pane is collapsible or not. */
  public readonly collapsible = input<boolean>(true);

  /** The dao that will be used to manage the data. */
  public readonly dataSource = input.required<NgxDcSidePaneListApiDataSource<GetDataItemsT, FinalDataItemsT, RetrievedItemT> | NgxDcInfiniteSidePaneListDataSource<GetDataItemsT, FinalDataItemsT, RetrievedItemT>>();

  readonly sidePaneFooter = contentChild(NgxDcSidePaneFooterDirective);

  readonly sidePaneItemLineNumber = contentChild(NgxDcSidePaneItemLineNumberDirective);

  readonly sidePaneItem = contentChild(NgxDcSidePaneItemDirective);

  readonly sidePaneLoadingItem = contentChild(NgxDcSidePaneLoadingItemDirective);

  readonly sidePaneItemSubtitle = contentChild(NgxDcSidePaneItemSubtitleDirective);

  readonly sidePaneItemText = contentChild(NgxDcSidePaneItemTextDirective);

  readonly sidePaneItemRightText = contentChild(NgxDcSidePaneItemRightTextDirective);

  readonly paneContent = contentChild(NgxDcPaneContentDirective);

  readonly panePageInfo = contentChild(NgxDcPanePageInfoDirective);

  readonly sidePaneItemIcon = contentChild(NgxDcSidePaneItemIconDirective);

  readonly element = viewChild('scroller', { read: ElementRef });
  readonly matListItems = viewChildren<MatListItem>('matListItem');

  public get firstMatItem(): Element {
    return this.matListItems()?.at(0)!?._elementRef?.nativeElement?.parentElement?.firstElementChild
  }

  public scrollToFirstItem() {
    return this.firstMatItem?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'start',
    })
  }

  public get activeMatItem(): MatListItem | null {
    return this.matListItems()?.find(item => item?.activated)
  }

  public scrollToTop() {
    const element = this.element();
    if (!element.nativeElement) return
    element.nativeElement.scrollTop = 0
  }

  public scrollToActiveItem() {
    this.activeMatItem?._elementRef.nativeElement.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'start',
    })
  }

  public ngOnInit() {
    // TODO: Add back in, but use a directive instead that will sync up with both
    // this.navbarService.collapsed$.subscribe(collapsed => {
    //   if (!this.collapsible) { return }
    //   if (collapsed) { this.collapsed = collapsed }
    // })

    if (this.useGlobalLoader()) {
      this.dataSource().loading.subscribe(loading => {
        this.modalService.showGlobalLoadingBar.next(loading)
      })
    }

    if (this.useGlobalOnItem()) {
      this.dataSource().itemLoading.pipe(
        // Skips the initialized value which is always false
        skip(1),
      ).subscribe((loading: boolean) => {
        this.modalService.showGlobalLoadingBar.next(loading)
      })
    }
  }

  public ngOnDestroy() {
    this.destroy$.next(true)
    this.destroy$.complete()
  }

  /**
   * Meant to be used by ViewChild if we want to reset a focused item from a parent component.
   */
  public resetFocusedItem() {
    this.dataSource().selectedItem.next(null)
    this.dataSource().retrievedItem.next(null)
  }

  /**
   * Resets the focused item and resets the data source
   */
  public reset() {
    this.resetFocusedItem()
    this.dataSource().reset()
  }

  public async onPaneItemClicked(item: FinalDataItemsT): Promise<void> {
    await this.dataSource().onPaneItemClicked(item)
  }
}
