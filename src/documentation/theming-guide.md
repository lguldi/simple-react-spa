# PushyNavBar Theming Guide

Given that a navbar component is such an integral part of any site or application design, PushyNavBar was designed to provide extensive customization options. To accomplish this, a few key decisions and trade-offs were made in this implementation.

- Customizations are made using Sass and therefore the module requires Dart Sass (`sass`) and `sass-loader` as a development dependencies.
- You must manually import the \_pushynavbar.scss file in your project which contains the default styles and core navbar styles implementation.
- PushyNavBar provides plenty of variables and mixins allowing for both quick and easy changes along with significant style customizations.

## Customizing PushyNavBar Styles

You may optionally override any aspect of PushyNavBar. Create a new .scss file that you will import into your project. This new .scss file is where you will add your customizations. For example, for mimimal changes like modifying the color you may choose to inline your updates:

**Inline example your-customizations.scss**

```
$primaryColor: red;
@import "_pushynavbar.scss";
```

You may prefer to keep your the customizations in a separate file:

**Import your customizations your-customizations.scss**

```
@import "_your-custom-theme.scss";
@import "_pushynavbar.scss";
```

## Theme Variables

The following theme variables are used to make quick changes to the navbar. For example, if you simply want to change the primary color from dark gray to dark blue, you could add `$primaryColor: darkblue;` as the only theme variable to override the default gray colors. This will result in link text colors along with active and hover background colors changing to dark blue in the desktop view. Mobile views will swap the color scheme and use the primary color as the background color of the off-canvas push menu and the inverse color for link colors.

| Variable               | Default                      | Description                                                                                                                                                                                                     |
| ---------------------- | ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `$breakPoint`          | 1024                         | Set the breakpoint to transition from Desktop to Mobile views.                                                                                                                                                  |
| `$menuPosition`        | "left"                       | Position links to the "left" or "right" in desktop mode.                                                                                                                                                        |
| `$rootClassName`       | "default"                    | Useful when you have multiple menus on the same page with different styles. The rootClassName should match the value of the "rootClassName" prop passed into the instance of the PushyNavBar you want to style. |
| `$primaryColor`        | #333333                      | Sets various colors used for default styling for links, mobile background color, etc.                                                                                                                           |
| `$secondaryColor`      | `lighten($primaryColor, 10)` | Sets the default hover and hover background colors in the desktop view.                                                                                                                                         |
| `$primaryInverseColor` | #fff                         |                                                                                                                                                                                                                 |
| `$navbarHeight`        | 60px                         | Navbar height in the desktop view.                                                                                                                                                                              |

### Base Navbar styles used for Desktop and Mobile Views

| Variable               | Default                    | Description                                                                            |
| ---------------------- | -------------------------- | -------------------------------------------------------------------------------------- |
| `$baseBackgroundColor` | `$primaryColor`            | Base background color of the navbar in the desktop and mobile views                    |
| `$baseFontColor`       | `$primaryInverseColor`     | Base font color of the navbar. This color is inherited by the desktop view by default. |
| `$baseFontFamily`      | verdana, arial, sans-serif | Base background color of the navbar in the desktop and mobile views                    |
| `$baseFontSize`        | 14px                       | Base background color of the navbar in the desktop and mobile views                    |
| `$baseFontWeight:`     | 600                        | Base background color of the navbar in the desktop and mobile views                    |
| `$baseTitleFontColor`  | `$primaryColor`            | Base background color of the navbar in the desktop and mobile views                    |
| `$baseTitleFontFamily` | `$baseFontFamily`          | Base background color of the navbar in the desktop and mobile views                    |
| `$baseTitleFontSize`   | 18px                       | Base background color of the navbar in the desktop and mobile views                    |
| `$baseTitleFontWeight` | 600                        | Base background color of the navbar in the desktop and mobile views                    |

### Navbar Desktop styles

| Variable                               | Default                     | Description                                                                                                |
| -------------------------------------- | --------------------------- | ---------------------------------------------------------------------------------------------------------- |
| `$desktopBackgroundColor`              | `$primaryInverseColor`      | Background color of the navbar in the desktop view.                                                        |
| `$desktopBorderColor`                  | #ccc                        | Color of the bottom border that displays in the desktop view.                                              |
| `$desktopBorderWidth`                  | 2px                         | Width of the bottom border that displays in the desktop view.                                              |
| `$desktopBorderStyle`                  | solid                       | Border style of the bottom border that displays in the desktop view.                                       |
| `$desktopFontColor`                    | `$baseFontColor`            | Default font color for the navbar in the desktop view.                                                     |
| `$desktopFontFamily`                   | `$desktopFontFamily`        | Default font family for the navbar in the desktop view.                                                    |
| `$desktopFontWeight`                   | `$baseFontWeight`           | Default font weight for the navbar in the desktop view.                                                    |
| `$desktopTitleColor`                   | `$desktopFontColor`         | Default font color for the title in the desktop view.                                                      |
| `$desktopTitleHoverColor`              | `$secondaryColor`           | Default font color for the title in the desktop view.                                                      |
| `$desktopTitleFontFamily`              | `$desktopFontFamily`        | Default font family for the title in the desktop view.                                                     |
| `$desktopFontSize`                     | 12pt                        | Default font weight for the title in the desktop view.                                                     |
| `$desktopTitleFontWeight`              | `$desktopFontWeight`        | Default font weight for the title in the desktop view.                                                     |
| `$desktopLinkColor`                    | `$primaryColor`             | Link text color for the navigation links in the desktop view.                                              |
| `$desktopLinkActiveBackgroundColor`    | `$primaryColor`             | Active link (current page) background color for the navigation links in the desktop view.                  |
| `$desktopLinkActiveColor`              | `$primaryInverseColor`      | Active link (current page) text color for the navigation links in the desktop view.                        |
| `$desktopLinkFocusBorder`              | `1px solid #7abbf4`         | Border setting for menu items when focused in desktop view.                                                |
| `$desktopLinkHoverBackgroundColor`     | `$secondaryColor`           | Hover background color for the navigation links in the desktop view.                                       |
| `$desktopLinkHoverColor`               | `$primaryInverseColor`      | Hover link text color for the navigation links in the desktop view.                                        |
| `$desktopLinkLineHeight`               | `2em`                       | Sets the line height for links in the desktop view.                                                        |
| `$desktopLinkMargin`                   | 10px 0 0 0                  | Sets the margin for the navigation links in the desktop view.                                              |
| `$desktopLinkPadding`                  | 10px 10px                   | Sets the padding for the navigation links in the desktop view.                                             |
| `$desktopSubLinkBackgroundColor`       | `$primaryInverseColor`      | Sets the primary background color of the drop down menu items in the desktop view.                         |
| `$desktopSubLinkColor`                 | `$primaryColor`             | Sets the primary text color of the links of the drop down menu items in the desktop view.                  |
| `$desktopSubLinkHoverBackgroundColor`  | `lighten($primaryColor, 5)` | Sets the background color of the drop down menu items on hover in the desktop view.                        |
| `$desktopSubLinkHoverColor`            | `$primaryInverseColor`      | Sets the text color of the links of drop down menu items on hover in the desktop view.                     |
| `$desktopSubLinkActiveBackgroundColor` | `$primaryColor`             | Sets the background color of the active link (current page) within the drop down menu in the desktop view. |
| `$desktopSubLinkActiveColor`           | `$primaryInverseColor`      | Sets the text color of the active link (current page) within the drop down menu in the desktop view.       |

### Mobile push menu styles

| Variable                                | Default                                     | Description                                                                                                          |
| --------------------------------------- | ------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| `$mobileBackgroundColor`                | `$primaryColor`                             | Background color of the navbar in the mobile view.                                                                   |
| `$mobileLinkHoverBackgroundColor`       | `lighten($mobileBackgroundColor,10)`        | Hover background color of the navbar links in the mobile view.                                                       |
| `$mobileLinkColor`                      | `$primaryInverseColor`                      | Navbar link color in the mobile view.                                                                                |
| `$mobileLinkActiveBackgroundColor`      | `lighten($mobileBackgroundColor,5)`         | Active link (current page) background color for the navigation links in the mobile view.in the mobile view.          |
| `$mobileLinkActiveColor`                | `$primaryInverseColor`                      | Active link (current page) text color for the navigation links in the mobile view.                                   |
| `$mobileLinkActiveHoverBackgroundColor` | `$mobileLinkHoverBackgroundColor`           | Active link (current page) on hover background color for the navigation links in the mobile view.in the mobile view. |
| `$mobileLinkActiveHoverColor`           | `$primaryInverseColor`                      | Active link (current page) on hover text color for navigation links in the moblie view.                              |
| `$mobileSubLinkBackgroundColor`         | `lighten($mobileBackgroundColor, 15)`       | Primary background color of nested sub-links in the mobile view.                                                     |
| `$mobileSubLinkColor`                   | `$primaryInverseColor`                      | Primary text color of nested sub-links in the mobile view.                                                           |
| `$mobileSubLinkHoverBackgroundColor`    | `lighten($mobileSubLinkBackgroundColor,20)` | Background color of the nested sub-links on hover in the mobile view.                                                |
| `$mobileSubLinkHoverColor`              | `$primaryInverseColor`                      | Text color of the nested sub-links on hover in the mobile view.                                                      |
| `$mobileMenuWidth`                      | 300px                                       | Sets the mobile menu width in the mobile view.                                                                       |

### Mobile menu toggle button

| Variable                     | Default                           | Description                                                                                    |
| ---------------------------- | --------------------------------- | ---------------------------------------------------------------------------------------------- |
| `$toggleLineColor`           | `$primaryColor`                   | Default color of the hamburger menu lines.                                                     |
| `$toggleHoverColor`          | `$primaryColor`                   | Color of the hamburger menu lines on hover.                                                    |
| `$toggleOpenBackgroundColor` | `$toggleLineColor`                | Background color of the hamburger menu when the menu is open and the modal cover is behind it. |
| `$toggleOpenLineColor`       | `$primaryInverseColor`            | Line color of the hamburger menu when the menu is open and the modal cover is behind it.       |
| `$toggleOpenHoverLineColor`  | `darken($toggleOpenLineColor,20)` | Color of the hamburger menu lines on hover.                                                    |
| `$closeFocusBorderColor`     | #aaa                              | Sets the color of the border on the hamburger menu when the button is focused.                 |

### Menu transition properties and modal cover styles

| Variable                          | Default | Description                                                                      |
| --------------------------------- | ------- | -------------------------------------------------------------------------------- |
| `$mobileTransitionDelay`          | 0s      | Sets a delay before the menu begins its transition.                              |
| `$mobileTransitionDuration`       | 0.3s    | Sets the duration of time to open or close the push menu in the mobile view.     |
| `$mobileTransitionProperty`       | all     | Applies the transition time to all CSS property changes.                         |
| `$mobileTransitionTimingFunction` | ease    | Sets the acceleration curve of the menu opening and closing transition.          |
| `$coverColor`                     | #000    | Color of the veil overlay covering the remainder of the page from being clicked. |
| `$coverOpacity`                   | 0.7     | Opacity of the veil overlay.                                                     |

## Mixins

PushyNavBar uses Sass mixins to provde CSS injection points that are used as shortcuts to styling sections within the navbar. Let's say you want to change the styling of the navigation items when on a mobile display. Instead of defining using a CSS selector `.pushy-navbar.default .push-menu nav` along with a media query, simply embed your style changes inside the `@mixin mobileMenu` and those styles will be injected inside selector matching the <nav role="navigation"> element for mobile and allow you to overide any default styles.

### @mixin base

Provides a base injection point for adding any custom CSS that will be used by both the mobile and desktop views. Any rules added here will be overwritten by the more specific "mobile" or "desktop" mixins. The rules will be injected into `<div class=".pushy-navbar.#{$rootClassName}">`

### @mixin branding

Override mixin that is injected into the `<div class="branding">` to provide base styling for the branding section. Further cusotmization can be applied to desktop and mobile views independently using the `desktopBranding` and `mobileBranding` mixins.

### @mixin desktopBranding

Override mixin that is injected into the `<div class="branding">` in the desktop view.

### @mixin mobileBranding

Override mixin that is injected into the `<div class="branding">` in the mobile view.

### @mixin desktop

Provides one last mixin to override or customize any aspect of the desktop view.

### @mixin features

Override mixin that is injected into the `<div class="features">` to provide base styling for the features section. Further cusotmization can be applied to desktop and mobile views using the `desktopFeatures` and `mobileFeatures` mixins.

### @mixin desktopFeatures

Override mixin that is injected into the `<div class="features">` in the desktop view where child elements of the navbar are displayed.

### @mixin mobileFeatures

Override mixin that is injected into the `<div class="features">` in the mobile view where child elements of the navbar are displayed.

### @mixin desktopMenu

Override mixin that is injected into the `<nav role="navigation">` element in the desktop view.

### @mixin mobileMenu

Override mixin that is injected into the `<nav role="navigation">` element in the mobile view.

### @mixin desktopSubMenu

Override mixin that is injected into the `<ul class="submenu">` element in the desktop view.

### @mixin mobileSubMenu

Override mixin that is injected into the `<ul class="submenu">` element in the desktop view.

### @mixin toggleButton

Override mixin that is injected into change the styles of the `<button class="pushy-navbar-toggle">` element of the mobile menu.
