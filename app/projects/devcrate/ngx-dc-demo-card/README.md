# NgxDcDemoCard

The `NgxDcDemoCard` component is an Angular component designed to display demo cards with customizable content, including titles, subtitles, and example templates.

## Key Features
1. **Customizable Titles and Subtitles**: Easily set titles and subtitles for each demo card.
2. **Template Support**: Use Angular templates to customize the content displayed within the card.
3. **Code Display**: Optionally show code snippets related to the demo.

## Installation

```bash
npm i @devcrate/ngx-dc-demo-card
```

## Usage

To use the `NgxDcDemoCard` component:

### 1. Import the module

Add the `NgxDcDemoCardModule` to your `standalone` component or in a module, specifically in the `imports` section:

```typescript
import { NgxDcDemoCardModule } from '@devcrate/ngx-dc-demo-card';

@NgModule({
  imports: [
    NgxDcDemoCardModule,
    // other modules
  ],
})
export class YourModule {}
```

### 2. Use the component in your template

```html
<ngx-dc-demo-card [showCodeIcon]="true" [showLinkIcon]="false">
  <ng-container *ngxDcDemoCardTitle>Demo Card Title</ng-container>
  <ng-container *ngxDcDemoCardSubtitle>Demo Card Subtitle</ng-container>
  <ng-container *ngxDcDemoCardExampleTitle>Example Title</ng-container>
  <ng-container *ngxDcDemoCardExample>
    <!-- Your example component goes here -->
  </ng-container>
</ngx-dc-demo-card>
```

## API Reference

### Component Inputs

| Input            | Type    | Default | Description                                                  |
|------------------|---------|---------|--------------------------------------------------------------|
| `title`          | string  |         | The title of the demo card.                                 |
| `subtitle`       | string  |         | The subtitle of the demo card.                              |
| `showCodeIcon`   | boolean | false   | Whether to show the code icon button.                       |
| `showLinkIcon`   | boolean | false   | Whether to show the link icon button.                       |

### Template Directives

- `*ngxDcDemoCardTitle`: Template for the title of the demo card.
- `*ngxDcDemoCardSubtitle`: Template for the subtitle of the demo card.
- `*ngxDcDemoCardExampleTitle`: Template for the example title.
- `*ngxDcDemoCardExample`: Template for the example content.

## Examples

### Basic Usage

```html
<ngx-dc-demo-card [showCodeIcon]="true" [showLinkIcon]="false">
  <ng-container *ngxDcDemoCardTitle>Basic Demo Card</ng-container>
  <ng-container *ngxDcDemoCardSubtitle>This is a subtitle for the demo card.</ng-container>
  <ng-container *ngxDcDemoCardExampleTitle>Live Demo</ng-container>
  <ng-container *ngxDcDemoCardExample>
    <app-basic-demo></app-basic-demo>
  </ng-container>
</ngx-dc-demo-card>
```

### With Code Display

```html
<ngx-dc-demo-card [showCodeIcon]="true" [showLinkIcon]="true">
  <ng-container *ngxDcDemoCardTitle>Advanced Demo Card</ng-container>
  <ng-container *ngxDcDemoCardSubtitle>Subtitle for advanced demo.</ng-container>
  <ng-container *ngxDcDemoCardExampleTitle>Example with Code</ng-container>
  <ng-container *ngxDcDemoCardExample>
    <app-advanced-demo></app-advanced-demo>
  </ng-container>
</ngx-dc-demo-card>
```

## Theming

The component uses Angular Material's theming system and responds to the following CSS variables:

- `--ngx-dc-demo-card-background-color`: Controls the background color of the demo card (default: white).
- `--ngx-dc-demo-card-title-color`: Controls the color of the title text (default: black).
