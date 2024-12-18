# Show content programmatically

You can use ng-template to show content programmatically. For example, you can show a modal when a button is clicked. And you don't need to create a new component for it.

## Example

```html
<!-- The content for the modal -->
<ng-template #modalTemplate>
  <p>Content</p>
</ng-template>

<!-- The button that shows the modal -->
<button (click)="showContent(modalTemplate)">Show Content</button>
```

The show content function is a simple function that takes in the template reference and then uses the `ViewContainerRef` to add the template to the DOM.

We do this through the material dialog service.
```ts
constructor(private dialog: MatDialog) {}

public showContent(template: TemplateRef<any>) {
  this.dialog.open(template);
}
```

## Modal Service

The modal service in DevCrate is a wrapper around the material dialog service. It allows you to easily open a modal with a template.

```ts
constructor(private modalService: ModalService) {}

public showContent(template: TemplateRef<any>) {
  this.modalService.showModal(template);
}
```

See the [Modal Service Docs](../../modal-service.md#modal) for more information.
