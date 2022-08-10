<template>
  <QCard class="q-showcase-card">
    <div class="q-showcase-card__content">
      <img
        :src="universityLogo"
        :alt="universityName"
        class="q-showcase-card__img"
      >

      <div class="q-showcase-card__university-info">
        <QTypography
          class="q-showcase-card__university-name"
          bold
          variant="large"
        >
          {{ universityName }}
        </QTypography>

        <QTypography
          class="q-showcase-card__course-name"
          bold
          variant="large"
          color="primary-dark"
        >
          {{ courseName }}
        </QTypography>

        <QRating :rating="rating" />
      </div>

      <div class="q-showcase-card__shift-info">
        <QTypography
          class="q-showcase-card__shift-kind"
          bold
          variant="large"
        >
          {{ courseKind }} • {{ courseShift }}
        </QTypography>

        <QTypography>
          Início das aulas em: {{ startDate }}
        </QTypography>
      </div>

      <div class="q-showcase-card__price-info">
        <QTypography bold>
          Mensalidade com o Quero Bolsa:
        </QTypography>

        <div class="q-showcase-card__price-composition">
          <QTypography class="q-showcase-card__old-price">
            R$ {{ oldPrice }}
          </QTypography>

          <QTypography
            class="q-showcase-card__new-price"
            color="success"
            bold
          >
            R$ {{ price }}
          </QTypography>
        </div>
      </div>

      <div class="q-showcase-card__actions">
        <QButton @click="handleOnDelete">
          Excluir
        </QButton>

        <QButton
          variant="contained"
          @click="handleOnSeeMore"
        >
          Ver oferta
        </QButton>
      </div>
    </div>
  </QCard>
</template>

<script lang="ts" setup>
defineProps({
  universityLogo: {
    type: String,
    required: true,
  },
  universityName: {
    type: String,
    required: true,
  },
  courseName: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    validator: (value) => value >= 0 && value <= 5,
  },
  courseShift: {
    type: String,
    required: true,
  },
  courseKind: {
    type: String,
    required: true,
  },
  startDate: {
    type: String,
    required: true,
  },
  oldPrice: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const emit = defineEmits(['delete', 'seeMore']);

const handleOnDelete = () => emit('delete');
const handleOnSeeMore = () => emit('seeMore');
</script>

<style lang="scss" scoped>
$border: 2px solid #eee;

.q-showcase-card {
  .q-showcase-card__content {
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: var(--spacing-sm);
    height: 100%;

    img.q-showcase-card__img {
      height: var(--spacing-xl);
    }

    .q-showcase-card__university-info {
      align-items: center;
      display: flex;
      flex-direction: column;
      gap: var(--spacing-xs);
      justify-content: center;

      .q-showcase-card__university-name {
        text-transform: uppercase;
      }
    }

    .q-showcase-card__shift-info {
      align-items: center;
      border-bottom: $border;
      border-top: $border;
      display: flex;
      flex-direction: column;
      gap: var(--spacing-sm);
      justify-content: center;
      padding-bottom: var(--spacing-md);
      padding-top: var(--spacing-md);
      width: 100%;

      .q-showcase-card__shift-kind {
        text-transform: uppercase;
      }
    }

    .q-showcase-card__price-info {
      align-items: center;
      display: flex;
      flex-direction: column;
      gap: var(--spacing-sm);
      justify-content: center;

      .q-showcase-card__price-composition {
        align-items: center;
        display: flex;
        flex-direction: column;
        gap: var(--spacing-xxs);
        justify-content: center;

        .q-showcase-card__old-price {
          text-decoration: line-through;
        }

        .q-showcase-card__new-price {
          font-size: 1.25rem;
        }
      }
    }

    .q-showcase-card__actions {
      display: flex;
      gap: var(--spacing-sm);
    }
  }
}
</style>
