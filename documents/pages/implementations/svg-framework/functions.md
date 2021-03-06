```yaml
title: Iconify SVG Framework Functions
replacements:
  - code: '/2/2.0.0/'
    value: '/${iconify2.version.major}/${iconify2.version.full}/'
  - code: '"2.0.0"'
    value: '"${iconify2.version.full}"'
  - code: '@iconify/iconify@2'
    value: '${iconify2.import}'
types:
  IconifyJSON: '../../types/iconify-json.md'
  IconifyIcon: '../../types/iconify-icon.md'
  IconifyInfo: '../../types/iconify-json-metadata.md'
functions:
  addCollection: './add-collection.md'
  addIcon: './add-icon.md'
  iconExists: './icon-exists.md'
  listIcons: './list-icons.md'
  getIcon: './get-icon.md'
  renderSVG: './render-svg.md'
  renderHTML: './render-html.md'
  renderIcon: './render-icon.md'
  replaceIDs: './replace-ids.md'
  scan: './scan.md'
  observe: './observe.md'
  stopObserving: './stop-observing.md'
  pauseObserver: './pause-observer.md'
  resumeObserver: './resume-observer.md'
  loadIcons: './load-icons.md'
  enableCache: './enable-cache.md'
  disableCache: './disable-cache.md'
  addAPIProvider: './add-api-provider.md'
```

# SVG framework functions

This tutorial is part of [Iconify SVG Framework tutorial](./index.md).

Iconify SVG framework has many functions that you can use to use SVG framework in your scripts.

## Usage

There are two ways of using SVG framework functions:

- By using `[var]Iconify` global.
- By importing `[var]Iconify` from `[npm]@iconify/iconify@2` if you are bundling SVG framework with your scripts.

Examples of using `[func]loadIcons` function:

```html
<script src="https://code.iconify.design/2/2.0.0/iconify.min.js"></script>
<script>
	Iconify.loadIcons(['mdi:home'], () => {
		console.log('Loaded home icon!');
	});
</script>
```

```js
import Iconify from '@iconify/iconify';

Iconify.loadIcons(['mdi:home'], () => {
	console.log('Loaded home icon!');
});
```

Even if you use bundle (method shown in second example), `[var]Iconify` global is also available because SVG framework exports functions and creates a global variable regardless of how you use it. That means you can use method shown in first example regardless of how you import SVG framework.

## Functions

Functions are split in several groups:

- [General functions](#general).
- [Getting icons](#getting-icons).
- [Adding icons](#adding-icons).
- [Rendering icons](#render).
- [Scanning and observing DOM](#scanner).
- [API functions](#api).
- [Internal API functions](#internal).

Click function name to see more details and examples.

## General functions {#general}

In this section there is only one function:

- `[func]getVersion()`. This function returns SVG framework version string. `[str]"2.0.0"`

## Getting icons {#getting-icons}

There are several functions in this section:

- `[func]iconExists(name)`. Checks if an icon exists, returns `[type]boolean`.
- `[func]listIcons()`. Lists available icons, returns `[type]string[]`.
- `[func]getIcon(name)`. Returns icon data, returns `[type]IconifyIcon` object.

## Adding icons {#adding-icons}

Functions for adding icons to SVG framework:

- `[func]addIcon()`. Adds one icon.
- `[func]addCollection()`. Adds an icon set.

Note: icons added to SVG framework with these functions are not stored in cache. SVG framework caches only icons retrieved from API.

## Rendering icons {#render}

Functions that generate SVG or data:

- `[func]renderSVG(name, customisations?)`. Creates `[tag]svg` element.
- `[func]renderHTML(name, customisations?)`. Returns `[tag]svg` string.
- `[func]renderIcon(name, customisations?)`. Generates data used by functions above. This can be used if you prefer to generate `[tag]svg` yourself. Data includes attributes for `[tag]svg` and inner HTML.

## Scanning and observing DOM {#scanner}

SVG framework automatically scans DOM whenever something changes. However, there are some limitations:

- Observer can observe only child elements of `[prop]document.body`.
- SVG framework scans DOM after every change (though scans are throttled to avoid scanning too often).

In some instances you might want to temporarily disable observer or scan an element that is not part of DOM, such as Shadow DOM. There are functions that you can use:

- `[func]scan(root?)`. Scans DOM or custom element for placeholder elements.
- `[func]observe(root)`. Observes custom root element.
- `[func]stopObserving(root)`. Stops observing custom root element. You can call it with `[prop]document.body` as parameter to stop observing `[prop]document.body`.
- `[func]pauseObserver(root?)`. Pauses observer.
- `[func]resumeObserver(root?)`. Resumes observer.

## Helper functions {#helper}

Few helper functions that are exposed because they might be useful when creating things such as icon picker:

- `[func]calculateSize()`. Helper function to calculates icon size. It is used to calculate `[attr]width` if only `[attr]height` is set and vice versa.
- `[func]replaceIDs(html)`. Randomizes IDs in generated string. This should be used when rendering icon based on data returned by `[func]renderIcon()` or `[func]getIcon` to make sure elements inside each icon have unique IDs. This function is not needed for icons generated by `[func]renderSVG()` and `[func]renderHTML()`.

## API functions {#api}

These functions are not available in module without API.

- `[func]loadIcons(icons, callback?)`. Loads icons from API, calls optional callback when either all or part of icons have been loaded.
- `[func]enableCache()`. Enables caching in `[prop]localStorage` and `[prop]sessionStorage`.
- `[func]disableCache()`. Disables caching in `[prop]localStorage` and `[prop]sessionStorage`.
- `[func]addAPIProvider()`. Adds custom API provider. This is experimental function. API provider functionality is in development.

## Internal API functions {#internal}

There are several internal API functions that are exposed. They are intended to be used by implementations that want more control over SVG framework, such as Iconify Icon Finder. Use them carefully.

All internal API functions are exposed as properties of `[var]Iconify._api` object and are available only when API is included:

- `[func]getAPI()`. Returns internal API module.
- `[func]getAPIConfig()`. Returns API configuration.
- `[func]setAPIModule(provider)`. Sets API module for provider. This is experimental function intended for custom API providers. API provider functionality is in development.
