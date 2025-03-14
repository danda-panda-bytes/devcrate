import { AfterContentInit, Directive, Input, OnDestroy, inject, output } from "@angular/core";
import { DestroyObservable } from "@devcrate/ngx-dc-utils";
import { MarkdownComponent } from "ngx-markdown";
import { takeUntil } from "rxjs/operators";
import { joinPaths } from "./ngx-markdown-open-modal-on-file-links.utils";

@Directive({
  selector: 'markdown[ngxMarkdownOnLinkClick]',
  standalone: true,
})
export class NgxMarkdownOnLinkClick extends DestroyObservable implements OnDestroy, AfterContentInit {
  cmp = inject(MarkdownComponent);

  public readonly onLinkClick = output<{ name: string, path: string }>({ alias: 'ngxMarkdownOnLinkClick' });

  constructor() {
    super()
  }

  public ngOnDestroy() {
    this.onDestroy()
  }

  public joinPaths(path: string): string {
    return joinPaths(path, this.cmp.src)
  }

  public ngAfterContentInit() {
    this.cmp.load.pipe(takeUntil(this.destroy$)).subscribe(value => {
      // Add ids to headings
      const headings = this.cmp.element.nativeElement.querySelectorAll("h1, h2, h3, h4, h5, h6")
      for (const heading of Array.from(headings)) {
        const headingName = heading.textContent.replace(/[-',_]/g, '').replace(/\s/g, '-').toLowerCase()
        heading.id = headingName
      }
      // Listen for a tags
      const aChildren = this.cmp.element.nativeElement.querySelectorAll('a')
      for (const aElement of Array.from(aChildren)) {

        aElement.style.cursor = 'pointer'

        aElement.addEventListener('click', e => {
          e.preventDefault()
          e.stopImmediatePropagation()
          e.stopPropagation()
          const link = aElement.attributes["href"].nodeValue
          if (link.startsWith('#')) {
            // Scroll to element
            const headingId = link
            const heading = this.cmp.element.nativeElement.querySelector(headingId)
            if (!heading) { console.log("Cannot find link to scroll to") }
            heading?.scrollIntoView({
              behavior: 'smooth',
              block: 'start',
              inline: 'start',
            })
            return
          }
          if ((!link.startsWith('http') || link.startsWith(window.location.origin)) && link.includes('#')) {
            let [path, name] = link.split('#') as string[]
            const resultPath = this.joinPaths(path)
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
