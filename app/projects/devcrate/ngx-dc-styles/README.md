# @devcrate/ngx-dc-styles

NgxDcStyles is an Angular library that simplifies theming for Angular Material 3 applications. It provides:

- Pre-configured Material 3 theme setup
- System-level color and typography variables
- Light and dark theme support
- Custom DevCrate component styles
- Quick changes to the theme using [Angular Material Theme Builder](https://angular-material.dev/articles/angular-material-theme-builder)

> Note: This library only supports Angular Material 3 and above for Angular 17+

## Installation

```bash
npm i @devcrate/ngx-dc-styles
```

## Usage

Import the styles in your styles.scss:
```scss
@use '@angular/material' as mat;
@use './generated-light-color-theme' as theme;
@use './generated-dark-color-theme' as darkTheme;
@use "@devcrate/ngx-dc-styles/material-theming" as devCrateStyles;

@import "@devcrate/ngx-dc-styles";

@import './fonts';

@include mat.core();

$dark-theme-config:  (
  color:(
    theme-type: dark,
    use-system-variables: true
  ),
  typography: (
    use-system-variables: true,
  )
);
$dark-theme: mat.define-theme($dark-theme-config);


$light-theme-config: (
  color:(
    theme-type: light,
    use-system-variables: true
  ),
  typography: (
    use-system-variables: true,
  )
);
$light-theme:  mat.define-theme($light-theme-config);

// Preferring dark theme. If you want light, swap the themes.
body {
  @include mat.all-component-themes($dark-theme);
  @include mat.system-level-colors($dark-theme);
  @include mat.system-level-typography($dark-theme);
  @include darkTheme.dark-system-vars();
  @include devCrateStyles.devCrateStyles();
}

.light-theme {
  @include mat.all-component-colors($light-theme);
  @include mat.system-level-colors($light-theme);
  @include mat.system-level-typography($light-theme);
  @include theme.light-system-vars();
}
```

Note, the local files are for DevCrate only.
But if you want to set it up like DevCrate, you can view those local files here:

- [fonts.scss](../../../src/_fonts.scss)
- The Generated variables came from this builder:
  - [Angular Material Theme Builder](https://angular-material.dev/articles/angular-material-theme-builder)
    - [generated-light-color-theme.scss](../../../src/generated-light-color-theme.scss)
    - [generated-dark-color-theme.scss](../../../src/generated-dark-color-theme.scss)
