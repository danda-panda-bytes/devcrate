import { CdkFixedSizeVirtualScroll, CdkVirtualForOf, CdkVirtualScrollViewport } from "@angular/cdk/scrolling";
import { AsyncPipe, NgClass, NgTemplateOutlet } from "@angular/common";
import { Component, ElementRef, HostBinding, HostListener, OnDestroy, OnInit, ViewEncapsulation, inject, input, output, contentChild, signal, model } from '@angular/core';
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
  NgxDcDropdownItemDirective, NgxDcDropdownLoadingDirective, NgxDcDropdownNoItemsDirective,
  NgxDcDropdownOptionsHeaderDirective
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
    encapsulation: ViewEncapsulation.None,
})
export class NgxDcDropdownComponent<GetDataItemsT, FinalDataItemsT = GetDataItemsT, RetrievedItemT = GetDataItemsT> implements OnInit, OnDestroy {
  public modalService = inject<NgxDcModalService>(NgxDcModalServiceToken);

  // We should put the InfiniteSidePaneListDataSource here because it extends all the other functionality for the data source
  public dataSource = input.required<NgxDcDropdownDataSource<GetDataItemsT, FinalDataItemsT, RetrievedItemT>>();

  public opened = model<boolean>(false);

  public readonly useGlobalLoader = input(false);
  public readonly appearance = input<'fill' | 'outline' | 'none' | 'rounded-fill' | 'rounded-outline'>('rounded-fill');
  public readonly roundedEdgeSize = input<string>('4px');

  public focusedItemChange = output<RetrievedItemT>();

  public readonly useInfiniteScrolling = input<boolean>(false);

  @HostBinding('class.infinite-scrolling')
  public get showInfiniteScrollingClass() {
    return this.useInfiniteScrolling()
  }

  @HostListener("document:click", ["$event"])
  public onClick(event: MouseEvent) {
    if (!this.opened()) { return }
    if (!(event.target as HTMLElement).closest(".dc-dropdown")) {

      this.opened.set(false)
    }
  }

  public get baseAppearanceName() {
    return this.appearance().replace('rounded-', '')
  }

  @HostBinding('style.background-color')
  public get backgroundColor(): string {
    return {
      'none': '',
      'fill': 'var(--mat-sys-surface-container-low)',
      'outline': 'transparent',
    }[this.baseAppearanceName] || ''
  }

  @HostBinding('style.border-color')
  public get borderColor(): string {
    return {
      'none': '',
      'fill': '',
      'outline': '1px solid var(--mat-sys-on-surface)',
    }[this.baseAppearanceName] || ''
  }

  @HostBinding('style.border-radius')
  public get roundedEdges(): boolean {
    return {
      'rounded-outline': this.roundedEdgeSize(),
      'rounded-fill': this.roundedEdgeSize(),
    }[this.appearance()] || ''
  }

  public destroy$ = new BehaviorSubject(false)
  readonly dropdownHeader = contentChild(NgxDcDropdownHeaderDirective);
  readonly dropdownOptionsHeader = contentChild(NgxDcDropdownOptionsHeaderDirective);

  readonly dropdownOption = contentChild(NgxDcDropdownItemDirective);

  readonly dropdownLoading = contentChild(NgxDcDropdownLoadingDirective);

  readonly noItems = contentChild(NgxDcDropdownNoItemsDirective);

  readonly scrollViewport = contentChild(CdkVirtualScrollViewport);
  readonly matNavListElement = contentChild('matNavList', { read: ElementRef });

  public get disabled() {
    return this.dataSource().actualDataLength === 0
  }

  public ngOnDestroy() {
    this.destroy$.next(true)
    this.destroy$.complete()
  }

  public resetItemSelected() {
    this.dataSource().selectedItem.next(null)
    this.dataSource().retrievedItem.next(null)
  }

  public ngOnInit() {
    if (this.useGlobalLoader()) {
      this.dataSource().loading.pipe(takeUntil(this.destroy$)).subscribe(loading => {
        this.modalService.showGlobalLoadingBar?.next(loading)
      })

      this.dataSource().itemLoading.pipe(takeUntil(this.destroy$)).subscribe(loading => {
        this.modalService.showGlobalLoadingBar?.next(loading)
      })
    }
  }

  public async scrollToTop() {
    await new Promise<void>(resolve => setTimeout(() => {
      if (this.useInfiniteScrolling()) {
        const scrollViewport = this.scrollViewport();
        if (scrollViewport) {
          scrollViewport.scrollToIndex(0, 'instant')
        }
      } else {
        const matNavListElement = this.matNavListElement();
        if (matNavListElement?.nativeElement) {
          matNavListElement.nativeElement.scrollToIndex(0, 'instant')
        }
      }
      resolve()
    }, 0))
  }

  public reset() {
    this.resetItemSelected()
    this.dataSource().reset()
  }

  public open() {
    this.opened.set(true)
  }

  public close() {
    this.opened.set(false)
  }

  public async onPaneItemClicked(item: FinalDataItemsT): Promise<RetrievedItemT> {
    await this.dataSource().onPaneItemClicked(item)
    this.opened.set(false)
    return this.dataSource().retrievedItem.value
  }

  protected readonly focus = focus;

  public onDropdownClick() {
    this.opened.set(!this.opened())
  }
}
