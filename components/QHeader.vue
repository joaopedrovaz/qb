<template>
  <header class="q-header">
    <div class="q-header__main">
      <QLink
        class="q-header__item"
        href="#"
      >
        <font-awesome-icon
          class="q-header__icon"
          icon="fa-solid fa-circle-info"
        />
        {{ needHelpTitle }}
      </QLink>

      <img
        src="assets/images/logo-querobolsa.svg"
        alt="Logo Quero Bolsa"
        class="q-header__logo"
      >

      <QLink
        class="q-header__item"
        href="#"
      >
        <font-awesome-icon
          class="q-header__icon"
          icon="fa-solid fa-circle-user"
        />
        {{ myAccountTitle }}
      </QLink>
    </div>

    <nav
      class="q-header__navbar"
      role="navigation"
    >
      <div class="q-header__navbar-container">
        <QLink
          href="#"
          class="q-header__navbar-item"
        >
          Minha conta
        </QLink>

        <div
          v-if="!isMobile"
          class="q-header-menu-container"
        >
          <QLink
            v-for="(item, index) in menuLinks"
            :key="index"
            :href="item.path"
            class="q-header__menu-item"
          >
            {{ item.label }}
          </QLink>
        </div>

        <span
          class="q-header__menu-button"
          role="button"
          :aria-pressed="isMenuOpen"
          @click="toggleMenu"
        >
          Menu

          <font-awesome-icon
            v-if="isMenuOpen"
            icon="fa-solid fa-angle-up"
          />
          <font-awesome-icon
            v-else
            icon="fa-solid fa-angle-down"
          />
        </span>
      </div>

      <ul
        v-if="isMenuOpen"
        class="q-header__menu-toggle"
      >
        <li
          v-for="(item, index) in menuLinks"
          :key="index"
        >
          <QLink
            class="q-header__navbar-item q-header__menu-item"
            :href="item.path"
          >
            {{ item.label }}
          </QLink>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faCircleInfo, faCircleUser, faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { useScreen } from '../composables/useScreen';

library.add(faCircleInfo, faCircleUser, faAngleDown, faAngleUp);

const { isMobile } = useScreen();
const isMenuOpen = ref(false);

const menuLinks = [
  {
    label: 'Pré-matrículas',
    path: '#',
  },
  {
    label: 'Bolsas favoritas',
    path: '#',
  },
];

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const needHelpTitle = computed(() => isMobile.value ? 'Ajuda' : 'Como funciona');
const myAccountTitle = computed(() => isMobile.value ? 'Conta' : 'Nome Sobrenome');
</script>

<style lang="scss" scoped>
@use '../assets/theme/mixins/media-query' as mq;
@use '../assets/theme/tokens/screens' as screen;

$max-width: map-get(screen.$grid-breakpoints, 'lg');

.q-header {
  display: flex;
  flex-direction: column;
  left: 0;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1;

  .q-header__main {
    background-color: var(--color-common-white);
    display: flex;
    justify-content: space-between;
    max-width: $max-width;
    padding: var(--spacing-sm);
    width: 100%;
    margin: 0 auto;

    img.q-header__logo {
      width: calc(var(--base-spacing) * 21);
    }

    .q-header__item {
      $border: 2px solid #eee;

      align-items: center;
      border-right: $border;
      color: var(--color-primary-dark);
      display: flex;
      flex-direction: column;
      font-size: var(--font-size-body1);
      gap: var(--spacing-xxs);
      justify-content: center;
      padding-right: var(--spacing-sm);

      .q-header__icon {
        font-size: var(--font-size-subtitle);
      }

      &:last-child {
        border-left: $border;
        border-right: none;
        padding-left: var(--spacing-sm);
        padding-right: 0;
      }

      @include mq.media-query('lg') {
        flex-direction: row;
        gap: var(--spacing-xs);

        &:last-child {
          flex-direction: row-reverse;
          border-left: none;
        }
      }
    }
  }

  .q-header__navbar {
    background-color: var(--color-primary-main);
    color: var(--color-common-white);

    .q-header__navbar-container {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      margin: 0 auto;
      max-width: $max-width;
    }

    .q-header__navbar-item {
      font-size: var(--font-size-large);
      color: var(--color-common-white);
      padding: var(--spacing-sm);
    }

    .q-header-menu-container {
      display: none;
    }

    .q-header__menu-button {
      align-items: center;
      cursor: pointer;
      display: flex;
      font-weight: 700;
      gap: var(--spacing-xs);
      padding: var(--spacing-sm);
    }

    .q-header__menu-toggle {
      list-style: none;
      margin: 0;
      padding: 0 0 var(--spacing-xs);
      width: 100%;

      .q-header__menu-item {
        display: block;
        padding: var(--spacing-xs) var(--spacing-sm);

        &:hover {
          background-color: var(--color-primary-dark);
        }
      }
    }

    @include mq.media-query('md') {
      .q-header__navbar-container {
        display: flex;
        flex-wrap: wrap;
        gap: var(--spacing-xl);
        justify-content: flex-start;
      }

      .q-header__navbar-item {
        padding: var(--spacing-xs);
      }

      .q-header__menu-button {
        display: none;
      }

      .q-header__menu-toggle {
        display: flex;
      }
      .q-header-menu-container {
        display: flex;

        .q-header__menu-item {
          align-items: center;
          color: var(--color-common-white);
          display: flex;
          font-size: var(--font-size-body1);
          height: 100%;
          padding: var(--spacing-xs);
          text-decoration: none;

          &:hover {
            background-color: var(--color-primary-dark);
          }
        }
      }
    }
  }
}
</style>