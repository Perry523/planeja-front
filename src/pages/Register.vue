<template>
  <div class="row flex-center container window-height">
    <q-form
      @submit="handleSubmit"
      class="col-12 col-sm-6 col-md-4 col-lg-3 q-pb-xl"
    >
      <q-img
        class="q-mb-xl"
        height="170px"
        fit="contain"
        src="favicon.ico"
      ></q-img>
      <q-input
        :rules="[(email) => validateEmail(email) || 'Email inválido']"
        label="Email"
        outlined
        lazy-rules
        dense
        v-model="user.email"
      />
      <div class="row q-col-gutter-x-md justify-between">
        <q-input
          label="Senha"
          outlined
          dense
          class="q-mt-sm col"
          lazy-rules
          v-model="user.password"
          :rules="[
            (password) =>
              (password && password.length >= 6) ||
              'A senha deve possuir no mínimo 6 digitos',
          ]"
          type="password"
        />
        <q-input
          label="Confirmar Senha"
          outlined
          dense
          type="password"
          class="q-mt-sm col"
          :rules="[(val) => val === user.password || 'As senhas não coindidem']"
          lazy-rules
          v-model="confirmPassword"
        />
      </div>
      <q-btn
        type="submit"
        color="secondary"
        label="entrar"
        class="full-width q-mt-md q-py-sm text-black"
      />
      <q-row class="q-mt-sm flex justify-end">
        Já possui uma conta?
        <router-link class="q-ml-xs text-primary" to="/login"
          >Entrar</router-link
        >
      </q-row>
    </q-form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { api } from 'boot/axios';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
const $q = useQuasar();
const router = useRouter();
type User = {
  email: string;
  password: string;
};
const user = ref<User>({
  email: '',
  password: '',
});
const confirmPassword = ref('');
async function handleSubmit() {
  await api
    .post('/register', user.value)
    .then(async () => {
      $q.notify({
        message: 'Cadastro realizado, se autentique',
        position: 'top',
        color: 'positive',
        icon: 'check',
      });
      router.push('/login');
    })
    .catch(() => {
      $q.notify({
        message: 'Ocorreu um erro, tente novamente',
        position: 'top',
        color: 'warning',
      });
    });
}
function validateEmail(email: string) {
  return !!String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
}
</script>

<style></style>
