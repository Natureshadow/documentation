```yaml
title: Transforming Icon in Iconify for Vue
replacements:
  - code: '@iconify/vue@1'
    value: '${vue.import-vue2}'
```

# Transformations

This tutorial is part of [Iconify for Vue tutorial](./index.md).

`include implementations/transform-intro`

## CSS vs Iconify transformations {#css}

`include implementations/transform-compare`

Example:

```yaml
src: implementations/vue2/rotate-comparison.vue
demo: implementations/common/rotate-comparison.html
demoHint: Using box-shadow to show icon dimensions
class: highlight-box
```

In example above, first icon is rotated using `[attr]rotate` attribute, second icon is rotated using CSS. First icon kept its 1em height, second icon became taller than it should be.

Sometimes you do want behaviour that CSS transformations provide. Then you can still use CSS transformations by adding it to inline style.

## Flip

You can flip icon horizontally and/or vertically.

One way to do that is to add `[attr]flip` attribute with comma separated values. Possible values:

- `[str]horizontal`: flip icon horizontally.
- `[str]vertical`: flip icon vertically.

You can also do that by setting `[attr]horizontalFlip` and / or `[attr]verticalFlip` attributes to `[bool]true`.

Example:

```yaml
src: implementations/vue2/flip.vue
hint: Using "flip" attribute
demo: implementations/common/flip.html
extra:
  - src: implementations/vue2/flip-alt.vue
    hint: Using "horizontalFlip" and "verticalFlip" attributes
```

## Rotation

You can rotate icon by `[num]90`, `[num]180` and `[num]270` degrees.

To do that, add `[attr]rotate` attribute. Possible values:

- `[str]90deg`, `[str]1`: rotate by `[num]90` degrees.
- `[str]180deg`, `[str]2`: rotate by `[num]180` degrees.
- `[str]270deg`, `[str]3`: rotate by `[num]270` degrees.

Example:

```yaml
src: implementations/vue2/rotate.vue
demo: implementations/common/rotate.html
```

## Rotate and flip

You can use both rotation and flip on an icon. The icon is flipped first, then rotated.

## Property names

In other components, properties for flip are `[attr]hFlip` and `[attr]vFlip`. Vue has special treatment for properties that start with `[attr]v-`, so `[attr]vFlip` (same applies to `[attr]vAlign` attribute) attribute is not available without using tricky syntax.

Because of that, Vue component uses longer property names: `[attr]verticalFlip` instead of `[attr]vFlip` and `[attr]horizontalFlip` instead of `[attr]hFlip` for consistency.
