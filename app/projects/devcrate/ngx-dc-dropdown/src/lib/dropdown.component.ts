import { CdkFixedSizeVirtualScroll, CdkVirtualForOf, CdkVirtualScrollViewport } from "@angular/cdk/scrolling";
import { AsyncPipe, NgClass, NgTemplateOutlet } from "@angular/common";
import { Component, ContentChild, ElementRef, EventEmitter, HostBinding, HostListener, Input, OnDestroy, OnInit, Output, ViewEncapsulation, inject } from '@angular/core';
import { MatRipple } from "@angular/material/core";
import { MatIcon } from "@angular/material/icon";
import { MatListItem, MatListSubheaderCssMatStyler, MatNavList } from "@angular/material/list";
import { MatProgressBar } from "@angular/material/progress-bar";
import { NgxDcFilledCountPipe, NgxDcModalService, NgxDcModalServiceToken, NgxDcRolesServiceToken } from "@devcrate/ngx-dc-utils";
import { BehaviorSubject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import {
  NgxDcDropdownDataSource
} from "./dropdown-data.source";
import {
  NgxDcDropdownHeaderDirective,
  NgxDcDropdownItemDirective, NgxDcDropdownLoadingDirective, NgxDcDropdownNoItemsDirective
} from "./dropdown.directives";

@Component({
    selector: 'ngx-dc-dropdown',
    imports: [
        NgTemplateOutlet,
        AsyncPipe,
        MatIcon,
        MatListItem,
        MatListSubheaderCssMatStyler,
        MatNavList,
        MatProgressBar,
        NgClass,
        NgxDcFilledCountPipe,
        CdkFixedSizeVirtualScroll,
        CdkVirtualForOf,
        CdkVirtualScrollViewport,
        MatRipple
    ],
    templateUrl: './dropdown.component.html',
    styleUrl: './dropdown.component.scss',
    encapsulation: ViewEncapsulation.None
})
export class NgxDcDropdownComponent<GetDataItemsT, FinalDataItemsT = GetDataItemsT, RetrievedItemT = GetDataItemsT> implements OnInit, OnDestroy {
  public modalService = inject<NgxDcModalService>(NgxDcModalServiceToken);

  @Input()
  public appearance: 'fill' | 'outline' | 'none' | 'rounded-fill' | 'rounded-outline' = 'rounded-fill'

  @Input()
  public roundedEdgeSize: string = '4px'

  @HostListener("document:click", ["$event"])
  public onClick(event: MouseEvent) {
    if (!this.opened) { return }
    if (!(event.target as HTMLElement).closest(".dc-dropdown")) {
      this.opened = false
    }
  }

  public get baseAppearanceName() {
    return this.appearance.replace('rounded-', '')
  }

  @HostBinding('style.background-color')
  public get backgroundColor(): string {
    return {
      'none': '',
      'fill': 'var(--sys-surface-container-low)',
      'outline': 'transparent',
    }[this.baseAppearanceName] || ''
  }

  @HostBinding('style.border-color')
  public get borderColor(): string {
    return {
      'none': '',
      'fill': '',
      'outline': '1px solid var(--sys-on-surface)',
    }[this.baseAppearanceName] || ''
  }

  @HostBinding('style.border-radius')
  public get roundedEdges(): boolean {
    return {
      'rounded-outline': this.roundedEdgeSize,
      'rounded-fill': this.roundedEdgeSize,
    }[this.appearance] || ''
  }

  public destroy$ = new BehaviorSubject(false)
  @ContentChild(NgxDcDropdownHeaderDirective)
  public dropdownHeader: NgxDcDropdownHeaderDirective;

  @ContentChild(NgxDcDropdownItemDirective)
  public dropdownOption: NgxDcDropdownItemDirective;

  @ContentChild(NgxDcDropdownLoadingDirective)
  public dropdownLoading: NgxDcDropdownLoadingDirective;

  @ContentChild(NgxDcDropdownNoItemsDirective)
  public noItems: NgxDcDropdownNoItemsDirective;

  @ContentChild(CdkVirtualScrollViewport) public scrollViewport: CdkVirtualScrollViewport
  @ContentChild('matNavList', { read: ElementRef }) public matNavListElement: ElementRef

  @Input() public opened: boolean = false

  // We should the InfiniteSidePaneListDataSource here because it extends all the other functionality for the data source
  @Input({ required: true }) public dataSource: NgxDcDropdownDataSource<GetDataItemsT, FinalDataItemsT, RetrievedItemT>
  @Output() public focusedItemChange = new EventEmitter<RetrievedItemT>()

  @Input() public useGlobalLoader = false

  @HostBinding('class.infinite-scrolling')
  @Input() public useInfiniteScrolling: boolean = false

  public get disabled() {
    return this.dataSource.actualDataLength === 0
  }

  public ngOnDestroy() {
    this.destroy$.next(true)
    this.destroy$.complete()
  }

  public resetItemSelected() {
    this.dataSource.selectedItem.next(null)
    this.dataSource.retrievedItem.next(null)
  }

  public ngOnInit() {
    if (this.useGlobalLoader) {
      this.dataSource.loading.pipe(takeUntil(this.destroy$)).subscribe(loading => {
        this.modalService.showGlobalLoadingBar.next(loading)
      })

      this.dataSource.itemLoading.pipe(takeUntil(this.destroy$)).subscribe(loading => {
        this.modalService.showGlobalLoadingBar.next(loading)
      })
    }
  }

  public async scrollToTop() {
    await new Promise<void>(resolve => setTimeout(() => {
      if (this.useInfiniteScrolling) {
        if (this.scrollViewport) {
          this.scrollViewport.scrollToIndex(0, 'instant')
        }
      } else {
        if (this.matNavListElement?.nativeElement) {
          this.matNavListElement.nativeElement.scrollToIndex(0, 'instant')
        }
      }
      resolve()
    }, 0))
  }

  public reset() {
    this.resetItemSelected()
    this.dataSource.reset()
  }

  public open() {
    this.opened = true
  }

  public close() {
    this.opened = false
  }

  public async onPaneItemClicked(item: FinalDataItemsT): Promise<RetrievedItemT> {
    await this.dataSource.onPaneItemClicked(item)
    this.opened = false
    return this.dataSource.retrievedItem.value
  }

  protected readonly focus = focus;

  public onDropdownClick() {
    this.opened = !this.opened
  }
}
