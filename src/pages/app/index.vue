<template>
  <div class="text-h6">Bem vindo de volta</div>
</template>

<script setup lang="ts">
import { api } from 'src/boot/axios';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
console.log('a');
const disciplines = ref([]);
const router = useRouter();
async function getDisciplines() {
  const { data } = await api('/disciplines');
  disciplines.value = data;
}
async function getCicles() {
  const { data } = await api('/disciplines');
  disciplines.value = data;
}
onMounted(async () => {
  getCicles();
  await getDisciplines();
  if (!disciplines.value.length) router.push('/app/wellcome');
});
</script>

<style></style>
