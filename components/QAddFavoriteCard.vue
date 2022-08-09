<template>
  <QCard class="q-add-favorite-card">
    <div class="q-add-favorite-card__content">
      <font-awesome-icon
        class="q-add-favorite-card__icon"
        icon="fa-solid fa-circle-plus"
      />

      <div class="q-add-favorite-card__text-wrapper">
        <QTypography
          class="q-add-favorite-card__title"
          align="center"
        >
          Adicionar curso
        </QTypography>

        <QTypography align="center">
          Clique para adicionar bolsas de cursos do seu interesse
        </QTypography>
      </div>
    </div>
  </QCard>
</template>

<script lang="ts" setup>
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';

library.add(faCirclePlus);
</script>

<style lang="scss" setup>
@use '../assets/theme/mixins/media-query' as mq;

.q-add-favorite-card {
  cursor: pointer;

  .q-add-favorite-card__content {
    align-items: center;
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: center;

    .q-add-favorite-card__icon {
      font-size: 64px;
      color: var(--color-primary-main);
    }

    .q-add-favorite-card__text-wrapper {
      margin-top: var(--spacing-lg);
      max-width: 224px;

      p {
        line-height: 1.5;
      }

      .q-add-favorite-card__title {
        font-size: 1.125rem;
        font-weight: 700;
      }
    }
  }

  @include mq.media-query('lg') {
  }
}
</style>
