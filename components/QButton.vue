<template>
  <button
    :class="{
      'q-button': true,
      [`q-button--${variant}`]: variant
    }"
    :disabled="disabled"
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
  disabled: {
    type: Boolean,
    default: false,
  },
});
</script>

<style lang="scss" scoped>
.q-button {
  background-color: transparent;
  border-radius: 4px;
  border: 1px solid;
  cursor: pointer;
  font-size: var(--font-size-body1);
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

  &:disabled {
    background-color: #cbcdce;
    border-color: #aeb3b4;
    cursor: not-allowed;

    &:hover {
      filter: none;
    }
  }
}
</style>