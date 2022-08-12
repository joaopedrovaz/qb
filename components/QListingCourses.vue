<template>
  <ul class="q-listing-courses">
    <li
      v-for="(vacancy, index) in vacanciesData"
      :key="index"
      class="q-listing-courses__item"
    >
      <input type="checkbox">

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
              {{ vacancy.course.shift }}
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
// eslint-disable-next-line no-undef
const { data: vacanciesData } = useFetchVacancies();
</script>

<style lang="scss" scoped>
@use '../assets/theme/mixins/media-query' as mq;

$border: 2px solid #eee;

.q-listing-courses {
  list-style: none;
  margin: 0;
  max-height: 100%;
  overflow-y: auto;
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
      justify-content: space-between;
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
