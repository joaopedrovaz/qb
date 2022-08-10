<template>
  <div class="q-rating">
    <QTypography
      class="q-rating__label"
      variant="large"
      bold
    >
      {{ formattedRating }}
    </QTypography>
    <font-awesome-icon
      v-for="(star, index) in stars"
      :key="index"
      class="q-rating__icon"
      :icon="star"
    />
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faStar, faStarHalfStroke } from '@fortawesome/free-solid-svg-icons';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';
import { isDecimal } from '~~/utils/number';

library.add(faStar, farStar, faStarHalfStroke);

const props = defineProps({
  rating: {
    type: Number,
    default: 0,
    validator: (val) => val >= 0 && val <= 5,
  },
});

const formattedRating = computed(() => props.rating.toFixed(1));

const getStar = (value: number) => {
  if (value <= 0) {
    return 'fa-regular fa-star';
  }

  if (value > 0 && value < 1 && isDecimal(value)) {
    return 'fa-solid fa-star-half-stroke';
  }

  return 'fa-solid fa-star';
};

const stars = computed(() => {
  const classes: string[] = Array(5).fill('fa-regular fa-star');

  classes.forEach((_, index) => {
    const position = index;
    const difference = props.rating - position;
    classes[index] = getStar(difference);
  });

  return classes;
});
</script>

<style lang="scss" scoped>
.q-rating {
  display: flex;
  font-size: var(--font-size-body1);
  gap: var(--spacing-xxs);

  .q-rating__icon {
    color: var(--color-secondary-main);
    font-size: var(--font-size-large);
  }
}
</style>
