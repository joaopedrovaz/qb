<template>
  <div
    class="group-button"
    role="radiogroup"
  >
    <div
      v-for="(item, index) in actions"
      :key="index"
      class="group-button__button"
      :class="{
        'group-button__button': true,
        'group-button__button--active': activeIndex === index
      }"
      role="radio"
      @click="handleOnClick(index, item.onActive)"
    >
      {{ item.label }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

defineProps({
  actions: {
    type: Array<{ label: string; onActive?: () => void }>,
    default: () => [],
    validator: (value: { label: string; onActive?: () => void }[]) =>
      value.every((item) => !!item.label),
  },
});

const emit = defineEmits(['select']);

const activeIndex = ref(null);

const handleOnClick = (index: number, cb?: () => void) => {
  activeIndex.value = index;
  cb && cb();
  emit('select', index);
};
</script>

<style lang="scss" scoped>
@use '../assets/theme/mixins/media-query' as mq;

.group-button {
  border-radius: 4px;
  border: 1px solid var(--color-primary-dark);
  color: var(--color-primary-dark);
  display: flex;
  flex-direction: column;
  font-weight: 700;

  & &__button {
    align-items: center;
    border-bottom: 1px solid var(--color-primary-dark);
    cursor: pointer;
    display: flex;
    justify-content: center;
    padding: var(--spacing-sm);
    flex-grow: 1;

    &:last-child {
      border-bottom: none;
    }

    &--active {
      background-color: var(--color-primary-dark);
      color: var(--color-common-white);
    }
  }

  @include mq.media-query('lg') {
    flex-direction: row;
    width: fit-content;

    & &__button {
      border-bottom: none;
      border-right: 1px solid var(--color-primary-dark);
      padding: var(--spacing-xs) var(--spacing-md);

      &:last-child {
        border-right: none;
      }
    }
  }
}
</style>
