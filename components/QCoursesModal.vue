<template>
  <div
    v-if="open"
    class="q-courses-modal"
  >
    <div
      role="dialog"
      aria-modal="true"
      class="q-courses-modal__wrapper"
    >
      <font-awesome-icon
        class="q-courses-modal__close-icon"
        icon="fa-solid fa-xmark"
        @click="handleOnClose"
      />
      <div
        class="q-courses-modal__card"
      >
        modal works!
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

library.add(faXmark);

const props = defineProps({
  open: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['close']);

const handleOnClose = () => emit('close');

// eslint-disable-next-line no-undef
onUpdated(() => {
  if (props.open) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'auto';
  }
});
</script>

<style lang="scss" scoped>
@use '../assets/theme/mixins/media-query' as mq;

.q-courses-modal {
  align-items: center;
  background-color: var(--color-background-overlay);
  display: flex;
  height: 100vh;
  justify-content: center;
  left: 0;
  position: fixed;
  top: 0;
  width: 100vw;
  z-index: 1;

  .q-courses-modal__wrapper {
    height: 100%;
    max-width: 640px;
    width: 100%;

    .q-courses-modal__close-icon {
      color: var(--color-common-white);
      cursor: pointer;
      display: block;
      font-size: 2rem;
      margin: var(--spacing-sm) var(--spacing-sm) var(--spacing-sm) auto;
    }

    .q-courses-modal__card {
      background-color: var(--color-common-white);
      box-shadow: 0 2px 4px rgb(0 0 0 / 20%);
      height: calc(100% - 64px);
      padding: var(--spacing-md) var(--spacing-sm);
      width: 100%;
    }
  }

  @include mq.media-query('lg') {
    .q-courses-modal__wrapper {
      .q-courses-modal__close-icon {
        margin-right: 0;
        margin-bottom: var(--spacing-xxs);
      }
    }
  }
}
</style>