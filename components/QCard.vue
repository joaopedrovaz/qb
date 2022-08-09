<template>
  <div class="q-card">
    <div class="q-card__content">
      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '../assets/theme/mixins/media-query' as mq;

.q-card {
  background-color: var(--color-common-white);
  box-shadow: 0 2px 4px rgb(0 0 0 / 20%);
  position: relative;

  .q-card__content {
    height: 100%;
    padding: var(--spacing-md);
    position: relative;
    width: 100%;
  }

  @include mq.media-query('lg') {
    .q-card__content {
      padding: var(--spacing-lg);
    }
  }
}
</style>
