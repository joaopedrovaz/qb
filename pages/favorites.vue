<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <section class="q-favorites">
    <div class="q-favorites__header">
      <QTypography variant="title">
        Bolsas favoritas
      </QTypography>

      <QTypography variant="large">
        Adicione bolsas de cursos e faculdades do seu interesse e receba atualizações com as melhores ofertas disponíveis.
      </QTypography>
    </div>

    <QGroupButton
      class="q-favorites__group-button"
      :actions="filterList"
    />

    <div class="q-favorites__container">
      <QAddFavoriteCard class="q-favorites__add-car" />

      <QShowcaseCard
        v-for="(vacancy, index) in vacancies"
        :key="index"
        class="q-favorites__card"
        :university-logo="vacancy.university.logo_url"
        :university-name="vacancy.university.name"
        :course-name="vacancy.course.name"
        :course-kind="vacancy.course.kind"
        :course-shift="vacancy.course.shift"
        :start-date="vacancy.start_date"
        :rating="vacancy.university.score"
        :old-price="vacancy.full_price"
        :price="vacancy.price_with_discount"
        @delete="onDelete"
        @see-more="onSeeMore"
      />
    </div>
  </section>
</template>

<script lang="ts" setup>
const filterList = [
  { label: 'Todos os semestres' },
  { label: '2º semestre de 2019' },
  { label: ' 1º semestre de 2020' },
];

const onDelete = () => {
  console.log('delete');
};

const onSeeMore = () => {
  console.log('see more');
};

// eslint-disable-next-line no-undef
const { data: vacancies } = useFetchVacancies();

// useHead({
//   title: 'Bolsas favoritas',
// });
</script>

<style lang="scss" scoped>
@use '../assets/theme/mixins/media-query' as mq;
@use '../assets/theme/tokens/screens' as screen;
.q-favorites {
  padding: var(--spacing-sm);
  margin: 0 auto;
  max-width: map-get(screen.$grid-breakpoints, 'lg');
  width: 100%;

  .q-favorites__header {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-sm);
    margin-bottom: var(--spacing-xl);
  }

  .q-favorites__group-button {
    margin-bottom: var(--spacing-lg);
  }

  .q-favorites__add-car {
    width: 100%;
  }

  .q-favorites__container {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-md);
    justify-content: center;
    width: 100%;
  }

  .q-favorites__card {
    width: 100%;
  }

  @include mq.media-query('lg') {
    .q-favorites__container {
      justify-content: space-between;
    }

    .q-favorites__group-button {
      margin-left: auto;
      margin-right: 0;
    }

    .q-favorites__add-car {
      width: 298px;
    }

    .q-favorites__card {
      width: 298px;
    }
}
}
</style>
