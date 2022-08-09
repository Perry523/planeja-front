<template>
  <div></div>
</template>

<script setup lang="ts">
import { Todo, Meta } from 'components/models';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const $router = useRouter();
$router.push('/login');
</script>
