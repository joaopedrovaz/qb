<template>
  <div>
    <ClientOnly>
      <QHeader />
      <NuxtPage />
      <QFooter />
    </ClientOnly>
  </div>
</template>

<script lang="ts" setup>
import './assets/theme/index.scss';
</script>
