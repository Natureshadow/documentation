```yaml
title: 'Iconify for React Function: addCollection'
types:
  IconifyJSON: '../../types/iconify-json.md'
  IconifyIcon: '../../types/iconify-icon.md'
functions:
  addIcon: './add-icon.md'
```

# Iconify for React function: addCollection

This tutorial is part of [Iconify for React with API functions tutorial](./index.md#functions).

Function `[func]addCollection()` adds icons collection to SVG framework storage.

## Usage

`include implementations/add-collection-props`

## Examples

```js
import { addCollection } from '@iconify/react-with-api';

addCollection({
	prefix: 'custom',
	icons: {
		icon1: {
			body:
				'<path d="M10 20v-6h4v6h5v-8h3L12 3L2 12h3v8h5z" fill="currentColor"/>',
		},
	},
	width: 24,
	height: 24,
});
```

```js
import { addCollection } from '@iconify/react-with-api';

addCollection({
	prefix: 'mdi',
	icons: {
		'account-box': {
			body:
				'<path d="M6 17c0-2 4-3.1 6-3.1s6 1.1 6 3.1v1H6m9-9a3 3 0 0 1-3 3a3 3 0 0 1-3-3a3 3 0 0 1 3-3a3 3 0 0 1 3 3M3 5v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2z" fill="currentColor"/>',
		},
		'account-cash': {
			body:
				'<path d="M11 8c0 2.21-1.79 4-4 4s-4-1.79-4-4s1.79-4 4-4s4 1.79 4 4m0 6.72V20H0v-2c0-2.21 3.13-4 7-4c1.5 0 2.87.27 4 .72M24 20H13V3h11v17m-8-8.5a2.5 2.5 0 0 1 5 0a2.5 2.5 0 0 1-5 0M22 7a2 2 0 0 1-2-2h-3c0 1.11-.89 2-2 2v9a2 2 0 0 1 2 2h3c0-1.1.9-2 2-2V7z" fill="currentColor"/>',
		},
		'account': {
			body:
				'<path d="M12 4a4 4 0 0 1 4 4a4 4 0 0 1-4 4a4 4 0 0 1-4-4a4 4 0 0 1 4-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4z" fill="currentColor"/>',
		},
		'home': {
			body:
				'<path d="M10 20v-6h4v6h5v-8h3L12 3L2 12h3v8h5z" fill="currentColor"/>',
		},
	},
	width: 24,
	height: 24,
});
```

## Notes

- Icons added by this function are not cached in `[prop]localStorage` and `[prop]sessionStorage`.

## API provider

`include implementations/api-provider/description-component`

Example:

```js
import { addCollection } from '@iconify/react-with-api';

addCollection(
	{
		prefix: 'md',
		icons: {
			test: {
				body:
					'<path d="M10 20v-6h4v6h5v-8h3L12 3L2 12h3v8h5z" fill="currentColor"/>',
			},
		},
		width: 24,
		height: 24,
	},
	'custom'
);
```

Code above adds only one icon:

- `[prop]provider` is `[str]custom`.
- `[prop]prefix` is `[str]md`.
- `[prop]name` is `[str]test`.

In HTML code this icon can be used like this:

```jsx
<Icon icon="@custom:md:test" />
```

Syntax is similar to default icon syntax, but with addition of provider `[str]@custom` before icon name. Provider in icon name always starts with `[str]@`.

## One icon

This function adds and entire icon set in `[type]IconifyJSON` format.

If you want to add only once icon and you have `[type]IconifyIcon` data, use function `[func]addIcon()` instead.
