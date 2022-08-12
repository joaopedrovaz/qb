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
      @select="setSelectedSemester"
    />

    <div class="q-favorites__container">
      <QAddFavoriteCard
        class="q-favorites__add-car"
        @click="openModal"
      />

      <QShowcaseCard
        v-for="(vacancy, index) in vacanciesData"
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
        @delete="handleOnDelete(vacancy.id)"
        @see-more="onSeeMore"
      />
    </div>

    <QCoursesModal
      :open="isModalOpen"
      @close="closeModal"
      @save="setFavoriteVacancies"
    />
  </section>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import queryString from 'query-string';
import { StorageKeys } from '~~/types/StorageKeys';
import { getStorage, setStorage } from '~~/utils/localStorage';

const filterList = [
  { label: 'Todos os semestres' },
  { label: '2º semestre de 2019' },
  { label: ' 1º semestre de 2020' },
];

const onSeeMore = () => {
  console.log('see more');
};

const favoriteVacancies = ref<string[]>([]);
const selectedSemester = ref<string>(undefined);

// eslint-disable-next-line no-undef
const filters = computed(() => queryString.stringify({
  id: favoriteVacancies.value,
  enrollment_semester: selectedSemester.value,
}));

// eslint-disable-next-line no-undef
const { result } = useFetchVacancies(filters);
// eslint-disable-next-line no-undef
const vacanciesData = computed(() => favoriteVacancies.value.length > 0 && result.value);

const setFavoriteVacancies = (vacancies: string[]) => {
  favoriteVacancies.value = vacancies;
};

const setSelectedSemester = (semester: number) => {
  const semesterList = [undefined, '2019.2', '2020.1'];
  selectedSemester.value = semesterList[semester];
};

const isModalOpen = ref(false);
const openModal = () => {
  isModalOpen.value = true;
};
const closeModal = () => {
  isModalOpen.value = false;
};
const handleOnDelete = (id: string) => {
  const filteredArr = favoriteVacancies.value.filter((vacancy) => vacancy !== id);
  favoriteVacancies.value = filteredArr;
  setStorage(StorageKeys.FAVORITES, filteredArr, 'vacancyList');
};

// eslint-disable-next-line no-undef
onMounted(() => {
  favoriteVacancies.value = getStorage<string[]>(StorageKeys.FAVORITES, 'vacancyList') || [];
});

// eslint-disable-next-line no-undef
useHead({
  title: 'Bolsas favoritas',
});
</script>

<style lang="scss" scoped>
@use '../assets/theme/mixins/media-query' as mq;
@use '../assets/theme/tokens/screens' as screen;
.q-favorites {
  padding: var(--spacing-sm);
  margin: 140px auto 0;
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
    margin-top: 128px;

    .q-favorites__container {
      justify-content: flex-start;
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
