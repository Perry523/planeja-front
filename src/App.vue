<template>
  <router-view />
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar';
const $q = useQuasar();
const fonts = ['archive-regular', 'barlow semibold', 'barlow regular'];
</script>
