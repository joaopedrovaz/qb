<template>
  <ul class="q-listing-courses">
    <li class="q-listing-courses__item">
      <input type="checkbox">

      <div class="q-listing-courses__item-content">
        <img
          src="https://www.tryimg.com/u/2019/04/16/unip.png"
          alt=""
          class="q-listing-courses__university-logo"
        >

        <div class="q-listing-courses__item-info">
          <div class="q-listing-courses__course-details">
            <QTypography
              variant="large"
              color="primary-dark"
              bold
            >
              Administração
            </QTypography>

            <QTypography variant="body2">
              Bacharelado
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
                50%
              </QTypography>
            </QTypography>

            <QTypography
              bold
              color="success"
            >
              R$ 374/mês
            </QTypography>
          </div>
        </div>
      </div>
    </li>
  </ul>
</template>

<script lang="ts" setup>
</script>

<style lang="scss" scoped>
@use '../assets/theme/mixins/media-query' as mq;

$border: 2px solid #eee;

.q-listing-courses {
  list-style: none;
  margin: 0;
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
