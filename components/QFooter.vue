<template>
  <footer class="q-footer">
    <div class="q-footer__useful-links">
      <div class="q-footer__link">
        <font-awesome-icon icon="fa-brands fa-whatsapp" />

        <div>
          <QTypography
            color="inherit"
            variant="large"
            bold
          >
            0800 123 2222
          </QTypography>

          <QTypography
            color="inherit"
            variant="large"
          >
            Segunda a sexta de 8h às 22h
          </QTypography>
        </div>
      </div>

      <QLink
        class="q-footer__link"
        href="#"
      >
        <font-awesome-icon icon="fa-regular fa-comments" />
        Chat
      </QLink>
      <QLink
        class="q-footer__link"
        href="#"
      >
        <font-awesome-icon icon="fa-regular fa-envelope" />
        E-mail
      </QLink>
      <QLink
        class="q-footer__link"
        href="#"
      >
        <font-awesome-icon icon="fa-solid fa-circle-info" />
        Ajuda
      </QLink>
    </div>

    <QTypography
      class="q-footer__created-by"
      variant="large"
      bold
    >
      Feito com
      <font-awesome-icon icon="fa-regular fa-heart" />
      pela Quero Educação
    </QTypography>
  </footer>
</template>

<script lang="ts" setup>
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { faComments, faEnvelope, faHeart } from '@fortawesome/free-regular-svg-icons';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';

library.add(faWhatsapp, faComments, faEnvelope, faCircleInfo, faHeart);
</script>

<style lang="scss" scoped>
.q-footer {
  background-color: var(--color-primary-main);
  width: 100%;

  .q-footer__useful-links {
    display: grid;
    gap: var(--spacing-xxs);
    grid-template-columns: repeat(3, 1fr);
    width: 100%;

    .q-footer__link {
      align-items: center;
      background-color: var(--color-primary-dark);
      color: var(--color-common-white);
      display: flex;
      flex-direction: column;
      font-size: var(--font-size-large);
      gap: var(--spacing-sm);
      justify-content: center;
      padding: var(--spacing-md);

      svg {
        font-size: var(--font-size-title);
      }

      &:first-child {
        flex-direction: row;
        gap: var(--spacing-md);
        grid-column: 1 / -1;
      }
    }
  }

  .q-footer__created-by {
    align-items: center;
    color: var(--color-common-white);
    display: flex;
    gap: var(--spacing-xxs);
    justify-content: center;
    padding: var(--spacing-xl);
    width: 100%;
  }
}
</style>