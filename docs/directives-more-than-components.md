# Use Directives more than Components

Angular components are great for creating reusable UI elements, but sometimes it can be overkill since you are creating a new component for every small piece of UI.

Instead, use directives to create reusable UI elements.

## Example

Let's say you want to create a reusable button that has a loading state.

Initial Angular developers may think to create a new component for this button.

```html
<loading-button></loading-button>
```

The issue with this is that you are creating a new component for every type of button. Styling gets harder to manage, and you are creating a lot of extra code.

Instead, use a directive to extend functionality of the button.

```html
<button [appLoadingButton]="isLoading">Click me</button>
```

At this point, you have a reusable button that has a loading state.

This allows you to add multiple directives to acheive multiple types of components without creating a bunch of new components, which end up being harder to manage, because you have to manage the styles and the logic for each component.

In the end, use a component for what its meant for; adding additional html and styles to the DOM.
