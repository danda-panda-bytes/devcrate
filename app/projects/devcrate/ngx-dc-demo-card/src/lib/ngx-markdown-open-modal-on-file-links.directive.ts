import { AfterContentInit, Directive, EventEmitter, OnDestroy, Output } from "@angular/core";
import { DestroyObservable } from "@devcrate/ngx-dc-utils";
import { MarkdownComponent } from "ngx-markdown";
import { takeUntil } from "rxjs/operators";
import { joinPaths } from "./ngx-markdown-open-modal-on-file-links.utils";

@Directive({
  selector: 'markdown[ngxMarkdownOnLinkClick]',
  standalone: true,
})
export class NgxMarkdownOnLinkClick extends DestroyObservable implements OnDestroy, AfterContentInit {
  @Output('ngxMarkdownOnLinkClick') public onLinkClick = new EventEmitter<{ name: string, path: string }>()

  constructor(public cmp: MarkdownComponent) {
    super()
  }

  public ngOnDestroy() {
    this.onDestroy()
  }

  public joinPaths(path: string, src: string): string {
    return joinPaths(path, this.cmp.src)
  }

  public ngAfterContentInit() {
    this.cmp.load.pipe(takeUntil(this.destroy$)).subscribe(value => {
      const aChildren = this.cmp.element.nativeElement.querySelectorAll('a')
      for (const aElement of Array.from(aChildren)) {

        aElement.style.cursor = 'pointer'

        aElement.addEventListener('click', e => {
          e.preventDefault()
          e.stopImmediatePropagation()
          e.stopPropagation()
          const link = aElement.attributes["href"].nodeValue
          if (!link.startsWith('http') && link.includes('#')) {
            let [path, name] = link.split('#') as string[]
            const resultPath = this.joinPaths(path, this.cmp.src)
            this.onLinkClick.emit({name, path: resultPath})
            return
          }

          // Otherwise, open the link in a new tab
          window.open(link, '_blank')
        })
      }
    })
  }
}
