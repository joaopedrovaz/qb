<template>
  <component
    :is="component"
    :class="{
      'q-typography': true,
      'q-typography--bold': bold,
      [`q-typography--${variant}`]: variant,
      [`q-typography--${color}`]: color,
      [`q-typography--align-${textAlign}`]: textAlign,
    }"
  >
    <slot />
  </component>
</template>

<script>
const fontVariants = [
  'title',
  'subtitle',
  'large',
  'body1',
  'body2',
];

const textAlignList = [
  'left',
  'center',
  'right',
  'justify',
];

const themeColors = [
  'inherit',
  'primary-main',
  'primary-dark',
  'secondary-dark',
  'secondary-main',
  'success',
  'error',
];

export default {
  props: {
    component: {
      type: String,
      default: 'p',
    },
    variant: {
      type: String,
      default: 'body1',
      validator: (value) => fontVariants.includes(value),
    },
    color: {
      type: String,
      default: '',
      validator: (value) => !value || themeColors.includes(value),
    },
    bold: {
      type: Boolean,
      default: false,
    },
    textAlign: {
      type: String,
      default: '',
      validator: (value) => !value || textAlignList.includes(value),
    },
  },
};
</script>

<style lang="scss" scoped>
$font-variants: (
  'title',
  'subtitle',
  'large',
  'body1',
  'body2',
);

$theme-colors: (
  'inherit',
  'primary-main',
  'primary-dark',
  'secondary-dark',
  'secondary-main',
  'success',
  'error',
);

$text-align: (
  'left',
  'center',
  'right',
  'justify',
);

.q-typography {
  color: var(--color-text-primary);
  font-family: var(--font-family);
  font-size: var(--font-size-body1);
  font-weight: var(--font-weight-body1);
  line-height: 1.3;
  margin: 0;

  @each $variant in $font-variants {
    &.q-typography--#{$variant} {
      font-size: var(--font-size-#{$variant});
      font-weight: var(--font-weight-#{$variant});
    }
  }

  @each $color in $theme-colors {
    &.q-typography--#{$color} {
      @if $color == 'inherit' {
        color: inherit;
      } @else {
        color: var(--color-#{$color});
      }
    }
  }

  @each $align in $text-align {
    &.q-typography--align-#{$align} {
      text-align: #{$align};
    }
  }

  &.q-typography--bold {
    font-weight: 700;
  }
}

</style>
