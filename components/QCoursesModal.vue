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
        <div class="q-courses-modal__header">
          <QTypography variant="subtitle">
            Adicionar bolsa
          </QTypography>

          <QTypography>
            Filtre e adicione as bolsas de seu interesse.
          </QTypography>
        </div>

        <div class="q-courses-modal__fields">
          <QComboBox
            class="q-courses-modal__select-field"
            label="Selecione sua cidade"
            :value="selectedCity"
            :options="[
              { label: undefined, value: undefined },
              { label: 'São Paulo', value: 'São Paulo' },
              { label: 'São José dos Campos', value: 'São José dos Campos' },
              { label: 'Fortaleza', value: 'Fortaleza' },
              { label: 'Jacareí', value: 'Jacareí' },
            ]"
            @change="handleOnSelectCity"
          />

          <QComboBox
            class="q-courses-modal__select-field"
            label="Selecione o curso de sua preferência"
            :value="selectedCourse"
            :options="[
              { label: undefined, value: undefined },
              { label: 'Administração', value: 'Administração' },
              { label: 'Arquitetura e urbanismo', value: 'Arquitetura e urbanismo' },
              { label: 'Biomedicina', value: 'Biomedicina' },
              { label: 'Ciência da Computação', value: 'Ciência da Computação' },
              { label: 'Ciências Econômicas', value: 'Ciências Econômicas' },
              { label: 'Educação Física', value: 'Educação Física' },
              { label: 'Engenharia Mecânica', value: 'Engenharia Mecânica' },
              { label: 'Farmácia', value: 'Farmácia' },
              { label: 'Gastronomia', value: 'Gastronomia' },
              { label: 'Gestão de Recursos Humanos', value: 'Gestão de Recursos Humanos' },
              { label: 'História', value: 'História' },
              { label: 'Jogos Digitais', value: 'Jogos Digitais' },
              { label: 'Jornalismo', value: 'Jornalismo' },
              { label: 'Marketing', value: 'Marketing' },
              { label: 'Propaganda e Marketing', value: 'Propaganda e Marketing' },
              { label: 'Sistemas de Informação', value: 'Sistemas de Informação' },
            ]"
            @change="handleOnSelectCourse"
          />
        </div>

        <div class="q-courses-modal__table-header">
          <QTypography
            bold
            variant="large"
          >
            Resultado:
          </QTypography>

          <div class="q-courses-modal__sort-field">
            <QTypography
              bold
              variant="large"
              text-align="right"
            >
              Ordenar por
            </QTypography>

            <QTypography
              bold
              variant="large"
              text-align="right"
              color="primary-dark"
              @click="handleSort"
            >
              Nome da Faculdade

              <font-awesome-icon :icon="`fa-solid ${ascSort ? 'fa-angle-down' : 'fa-angle-up'}`" />
            </QTypography>
          </div>
        </div>

        <QListingCourses
          class="q-courses-modal__listing-courses"
          :selected-vacancies="selectedVacancies"
          :sort="ascSort ? 'asc' : 'desc'"
          :filter="filters"
          @change="handleOnChange"
        />

        <div class="q-courses-modal__footer">
          <QButton
            class="q-courses-modal__button"
            @click="handleOnClose"
          >
            Cancelar
          </QButton>
          <QButton
            class="q-courses-modal__button"
            variant="contained"
            :disabled="isSaveDisabled"
            @click="onSaveFavoriteVacancies"
          >
            Adicionar bolsa(s)
          </QButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faXmark, faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { getStorage, setStorage } from '~~/utils/localStorage';
import { StorageKeys } from '~~/types/StorageKeys';

library.add(faXmark, faAngleDown, faAngleUp);

const props = defineProps({
  open: {
    type: Boolean,
    default: false,
  },
});

// eslint-disable-next-line no-undef
const selectedVacancies = ref<string[]>([]);
// eslint-disable-next-line no-undef
const ascSort = ref(true);
// eslint-disable-next-line no-undef
const selectedCity = ref<string>(undefined);
// eslint-disable-next-line no-undef
const selectedCourse = ref<string>(undefined);

// eslint-disable-next-line no-undef
const filters = computed(() => ({
  'campus.city': selectedCity.value,
  'course.name': selectedCourse.value,
}));

const emit = defineEmits(['close', 'save']);

const handleSort = () => {
  ascSort.value = !ascSort.value;
};

const handleOnSelectCity = (city: string) => {
  selectedCity.value = city;
};

const handleOnSelectCourse = (course: string) => {
  selectedCourse.value = course;
};

const handleOnClose = () => emit('close');

const handleOnChange = (value: string[]) => {
  selectedVacancies.value = value;
};

const initSelectVacancies = () => {
  const storage = getStorage<string[]>(StorageKeys.FAVORITES, 'vacancyList');

  if (storage) {
    selectedVacancies.value = storage;
  }
};

const onSaveFavoriteVacancies = () => {
  setStorage(StorageKeys.FAVORITES, selectedVacancies.value, 'vacancyList');
  emit('save', selectedVacancies.value);
  handleOnClose();
};

// eslint-disable-next-line no-undef
const isSaveDisabled = computed(() => selectedVacancies.value.length <= 0);

// eslint-disable-next-line no-undef
onUpdated(() => {
  if (props.open) {
    document.body.style.overflow = 'hidden';
  } else {
    initSelectVacancies();
    document.body.style.overflow = 'auto';
  }
});

// eslint-disable-next-line no-undef
onMounted(() => {
  initSelectVacancies();
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
    overflow-y: auto;
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
      overflow-y: auto;
      padding: var(--spacing-md) var(--spacing-sm);
      width: 100%;

      .q-courses-modal__header {
        margin-bottom: var(--spacing-xl);
      }

      .q-courses-modal__fields {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-md);
        margin-bottom: var(--spacing-lg);
      }

      .q-courses-modal__table-header {
        align-items: flex-start;
        display: flex;
        justify-content: space-between;
        margin-bottom: var(--spacing-sm);

        .q-courses-modal__sort-field {
          align-items: flex-end;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          width: 100%;
        }
      }

      .q-courses-modal__footer {
        display: flex;
        justify-content: space-between;
        margin-top: var(--spacing-lg);
      }
    }
  }

  @include mq.media-query('lg') {
    .q-courses-modal__wrapper {
      overflow-y: hidden;

      .q-courses-modal__close-icon {
        margin-right: 0;
        margin-bottom: var(--spacing-xxs);
      }

      .q-courses-modal__card {
        height: 640px;
        .q-courses-modal__fields {
          flex-direction: row;
          flex-wrap: wrap;

          .q-courses-modal__select-field {
            flex: 1;
          }
        }

        .q-courses-modal__listing-courses {
          height: 256px;
          overflow-y: auto;
        }

        .q-courses-modal__footer {
          gap: var(--spacing-sm);
          justify-content: flex-end;
        }
      }
    }
  }
}
</style>
