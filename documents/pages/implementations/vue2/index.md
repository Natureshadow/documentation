```yaml
title: Iconify for Vue 2
replacements:
  - code: '60,000'
    value: '${counters.icons}'
  - code: '80+'
    value: '${counters.sets}+'
  - code: '@iconify/vue@1'
    value: '${vue.import-vue2}'
types:
  IconifyIcon: '../../types/iconify-icon.md'
```

# Iconify for Vue

In addition to [SVG framework](../svg-framework/index.md), Iconify offers native components for several popular UI frameworks. Iconify for Vue is one of such components.

Yet another icon component? What are advantages over other icon components?

- One syntax for over 60,000 icons from 80+ icon sets.
- Renders SVG. Many components simply render icon fonts, which look ugly. Iconify renders pixel perfect SVG.

`include notices/vue2`

## Installation

If you are using NPM:

```bash
npm install --save-dev @iconify/vue@1
```

If you are using Yarn:

```bash
yarn add --dev @iconify/vue@1
```

This package does not include icons. Icons are split into separate packages that available at NPM. See below.

## Usage

Iconify for Vue is a basic component. It works offline and does not have any dependencies. Icon data is provided as parameter to component.

Install `[npm]@iconify/vue@1` and packages for selected icon sets. Import component from `[npm]@iconify/vue` and icon data for icon you want to use:

```js
// Import component
import IconifyIcon from '@iconify/vue';

// Import icon data.
// You can use any variable name instead of 'homeIcon'
// because exports are not named
import homeIcon from '@iconify-icons/mdi-light/home';
```

Then use `[var]IconifyIcon` component with icon data as `[prop]icon` parameter:

```vue
<template>
	<IconifyIcon :icon="icons.homeIcon" />
</template>

<script>
// Import component
import IconifyIcon from '@iconify/vue';

// Import icon data.
// You can use any variable name instead of 'homeIcon'
// because exports are not named
import homeIcon from '@iconify-icons/mdi-light/home';

export default {
	components: {
		// Add IconifyIcon to list of used components
		IconifyIcon,
	},
	data() {
		return {
			// Returns icons data that can be used in template
			icons: {
				// Assign homeIcon to icons.home
				home: homeIcon,
			},
		};
	},
};
</script>
```

### String syntax

Using icon data in Vue requires creating `[func]data()` method in your component.

However, there is an easier way: assigning a name to icon and calling icon by name.

As a bonus, with this method the icon needs to be added only once. That means if you have multiple components using `[icon]home` icon, you can add it only in your main component. This makes it easy to swap icons for an entire application.

```vue
<template>
	<!-- icon value is the same as first parameter in addIcon() -->
	<IconifyIcon icon="home" />
</template>

<script>
// Import component
import IconifyIcon from '@iconify/vue';

// Import icon data.
// You can use any variable name instead of 'homeIconData'
// because exports are not named
import homeIconData from '@iconify-icons/mdi-light/home';

// Assign name 'home' to icon
IconifyIcon.addIcon('home', homeIconData);

export default {
	components: {
		// Add IconifyIcon to list of used components
		IconifyIcon,
	},
};
</script>
```

Instead of adding icons one by one using `[func]addIcon()`, you can import an entire icon set using `[func]addCollection()`:

```vue
<template>
	<iconify-icon icon="jam:home" />
</template>

<script>
import IconifyIcon from '@iconify/vue';

// Import requires bundler that can import JSON files
import jamIcons from '@iconify/json/json/jam.json';

// Function automatically adds prefix from icon set, which in this case is 'jam', followed by ':', so
// icon names added by function should be called with prefix, such as 'jam:home'
IconifyIcon.addCollection(jamIcons);

export default {
	components: {
		IconifyIcon,
	},
};
</script>
```

Example above imports an entire icon set.

To learn how to create smaller bundles, check out [Iconify bundles documentation](../../sources/bundles/index.md).

## Properties

You can pass any custom properties to component.

Required properties:

- `[prop]icon`, `[type]IconifyIcon | string` icon data.

`include implementations/component-optional-props-vue`

See below for more information on each optional property.

In addition to the properties mentioned above, the icon component accepts any other properties and events. All other properties and events will be passed to generated SVG element, so you can do stuff like setting the inline style, add title, add `[prop]onClick` event and so on.

## Icon

`include implementations/icon-packages`

Examples:

- `[icon]mdi-light:logout` from [Material Design Light Icons](https://iconify.design/icon-sets/mdi-light/) can be imported from `[npm]@iconify-icons/mdi-light/logout`.
- `[icon]uim:comment-dots` from [Unicons Monochrome](https://iconify.design/icon-sets/uim/) can be imported from `[npm]@iconify-icons/uim/comment-dots`.
- `[icon]eva:info-outline` from [Eva Icons](https://iconify.design/icon-sets/tabler/) can be imported from `[npm]@iconify-icons/eva/info-outline`.

...and so on.

Variable name in import statement is irrelevant because all exports are default exports.

### CommonJS icon packages {#commonjs}

`include implementations/icon-packages-exports`

## Color

You can only change color of monotone icons. Some icons, such as emoji, have a hardcoded palette that cannot be changed.

To add color to a monotone icon simply change text color.

```vue
<IconifyIcon icon="home" style="color: red" />
```

For various ways to set color, see [how to change icon color in Iconify for Vue](./color.md).

## Dimensions and alignment

By default, icon height is set to `[str]"1em"`, icon width is changed dynamically based on the icon's width to height ratio. This makes it easy to change icon size by changing `[attr]font-size` in the stylesheet, just like icon fonts.

There are several ways to change icon dimensions:

- Setting `[prop]font-size` in style.
- Setting `[prop]width` and/or `[prop]height` property.

Values for `[prop]width` and `[prop]height` can be numbers or strings.

If you set only one dimension, another dimension will be calculated using the icon's width to height ratio. For example, if the icon size is 16 x 24, you set the height to 48, the width will be set to 32. Calculations work not only with numbers, but also with string values.

```vue
<IconifyIcon icon="home" style="font-size: 24px;" />
```

For various ways to change icon dimensions and alignment, see [how to change icon dimensions in Iconify for Vue](./dimensions.md).

## Transformations

An icon can be rotated and flipped horizontally and/or vertically. All transformations are done relative to the center of the icon.

These are not CSS transformations, transformations are applied inside SVG.

For more details see [how to transform icon in Iconify for Vue](./transform.md).
