<template>
  <div class="row flex-center window-height">
    <q-form @submit="login" class="col-12 col-sm-6 col-md-4 col-lg-3 q-pb-xl">
      <q-img
        class="q-mb-xl"
        height="170px"
        fit="contain"
        src="favicon.ico"
      ></q-img>
      <q-input
        :rules="[(email) => !!email || 'Campo obrigatório']"
        label="Email"
        outlined
        dense
        v-model="user.email"
      />
      <q-input
        ref="password"
        label="Senha"
        type="password"
        :rules="[(password) => !!password || 'Campo obrigatório']"
        outlined
        dense
        class="q-mt-sm"
        v-model="user.password"
      />
      <q-btn
        type="submit"
        color="secondary"
        label="entrar"
        class="full-width q-mt-md q-py-sm text-black"
      />
      <div class="q-mt-sm flex justify-end">
        Não possui uma conta?
        <router-link class="q-ml-xs text-primary" to="/register"
          >Cadastre-se</router-link
        >
      </div>
    </q-form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { api } from 'boot/axios';
import { useRouter } from 'vue-router';
import { useStorage } from '@vueuse/core';
const user = ref({});
const $router = useRouter();
function login() {
  api.post('/login', user.value).then(({ data }) => {
    const token = useStorage('token', null);
    token.value = data.token;
    $router.push('/app');
  });
}
onMounted(() => {
  const token = useStorage('token', null);
  if (token.value) $router.push('/app');
});
</script>

<style></style>
