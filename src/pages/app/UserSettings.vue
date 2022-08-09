<template>
  <q-btn label="Sair do app" @click="logout" />
</template>

<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();
function logout() {
  localStorage.removeItem('user');
  localStorage.removeItem('token');
  router.push('/login');
}
</script>

<style></style>
