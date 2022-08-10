<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <QShowcaseCard
      v-for="(vacancy, index) in vacancies"
      :key="index"
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
</template>

<script lang="ts" setup>
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
