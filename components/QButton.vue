<template>
  <button
    :class="{
      'q-button': true,
      [`q-button--${variant}`]: variant
    }"
  >
    <slot />
  </button>
</template>

<script lang="ts" setup>
defineProps({
  variant: {
    type: String,
    default: 'default',
    validator: (value: string) => [
      'default',
      'contained',
    ].includes(value),
  },
});
</script>

<style lang="scss" scoped>
.q-button {
  background-color: transparent;
  border-radius: 4px;
  border: 1px solid;
  cursor: pointer;
  font-size: var(--font-size-large);
  font-weight: 700;
  padding: var(--spacing-sm) var(--spacing-md);

  &:hover {
    filter: brightness(0.8);
  }

  &.q-button--default {
    color: var(--color-primary-dark);
  }

  &.q-button--contained {
    background-color: var(--color-secondary-main);
    border-color: var(--color-secondary-dark);
    color: var(--color-text-primary);
  }
}
</style>