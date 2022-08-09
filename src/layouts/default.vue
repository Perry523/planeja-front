<template>
  <q-layout view="lHh Lpr lFf">
    <the-drawer />
    <q-page-container class="window-height">
      <router-view class="q-pa-md q-pa-lg-xl full-height" />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import TheDrawer from 'components/TheDrawer.vue';
</script>
