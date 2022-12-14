<template>
  <ul class="q-listing-courses">
    <li
      v-for="(vacancy, index) in vacanciesData"
      :key="index"
      class="q-listing-courses__item"
    >
      <input
        type="checkbox"
        :checked="getIsChecked(vacancy.id)"
        @change="handleOnChange($event, vacancy.id)"
      >

      <div class="q-listing-courses__item-content">
        <img
          :src="vacancy.university.logo_url"
          :alt="vacancy.university.name"
          class="q-listing-courses__university-logo"
        >

        <div class="q-listing-courses__item-info">
          <div class="q-listing-courses__course-details">
            <QTypography
              variant="large"
              color="primary-dark"
              bold
            >
              {{ vacancy.course.name }}
            </QTypography>

            <QTypography variant="body2">
              {{ vacancy.course.kind }}
            </QTypography>
          </div>

          <div class="q-listing-courses__course-price">
            <QTypography>
              Bolsa de
              <QTypography
                color="success"
                bold
                component="span"
              >
                {{ vacancy.discount_percentage }}%
              </QTypography>
            </QTypography>

            <QTypography
              bold
              color="success"
            >
              R$ {{ vacancy.price_with_discount }}/mês
            </QTypography>
          </div>
        </div>
      </div>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import queryString from 'query-string';

const props = defineProps({
  selectedVacancies: {
    type: Array,
    default: () => [],
    validator: (value: string[]) => value.every((vacancyId: unknown) => typeof vacancyId === 'string'),
  },
  sort: {
    type: String,
    default: 'asc',
    validator: (value: string) => ['asc', 'desc'].includes(value),
  },
  filter: {
    type: Object,
    default: () => ({}),
  },
});

// eslint-disable-next-line no-undef
const filterMap = computed(
  () => Object.fromEntries(Object.entries(props.filter).filter(([_, value]) => !!value)),
);

// eslint-disable-next-line no-undef
const filters = computed(() => queryString.stringify({
  _sort: 'university.name',
  _order: props.sort,
  ...filterMap.value,
}));

// eslint-disable-next-line no-undef
const { result: vacanciesData } = useFetchVacancies(filters);

const emit = defineEmits(['change']);
// eslint-disable-next-line no-undef
const selectedVacancies = ref(props.selectedVacancies);

const addItem = (id: string) => {
  selectedVacancies.value.push(id);
};

const removeItem = (id: string) => {
  selectedVacancies.value = selectedVacancies.value.filter(item => item !== id);
};

const getIsChecked = (id: string) => {
  return selectedVacancies.value.includes(id);
};

const handleOnChange = (evt: Event, id: string) => {
  const isChecked = (evt.target as HTMLInputElement).checked;

  if (isChecked) {
    addItem(id);
  } else {
    removeItem(id);
  }

  emit('change', selectedVacancies.value);
};
</script>

<style lang="scss" scoped>
@use '../assets/theme/mixins/media-query' as mq;

$border: 2px solid #eee;

.q-listing-courses {
  list-style: none;
  margin: 0;
  max-height: 100%;
  padding: 0;

  .q-listing-courses__item {
    display: flex;
    gap: var(--spacing-lg);
    border-top: $border;

    &:last-child {
      border-bottom: $border;
    }

    .q-listing-courses__item-content {
      align-items: center;
      display: flex;
      gap: var(--spacing-md);
      padding: var(--spacing-sm);
      width: 100%;

      img.q-listing-courses__university-logo {
        object-fit: contain;
        width: 80px;
      }

      .q-listing-courses__item-info {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-sm);

        .q-listing-courses__course-details {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-xxs);
        }

        .q-listing-courses__course-price {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-xxs);
        }
      }
    }
  }

  @include mq.media-query('lg') {
    .q-listing-courses__item {
      .q-listing-courses__item-content {
        gap: var(--spacing-lg);

        img.q-listing-courses__university-logo {
          width: 120px;
          height: 32px;
        }

        .q-listing-courses__item-info {
          flex-direction: row;
          flex: 1;
          justify-content: space-between;

          .q-listing-courses__course-price {
            text-align: right;
          }
        }
      }
    }
  }
}
</style>
