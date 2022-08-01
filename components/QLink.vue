<template>
  <NuxtLink class="q-link">
    <slot />
  </NuxtLink>
</template>

<style lang="scss" scoped>
.q-link {
  color: var(--color-primary-dark);
  font-size: var(--font-size-body1);
  font-weight: 700;

  &:hover {
    text-decoration: underline;
  }
}
</style>
