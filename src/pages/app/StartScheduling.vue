<template>
  <div class="column flex-center window-height">
    <div class="text-h4 text-center text-primary q-mb-xl">
      Escolha uma opção
    </div>
    <div class="row justify-around">
      <div
        v-for="(button, i) in buttons"
        :key="i"
        class="col-4"
        style="max-width: 370px"
      >
        <div
          v-html="button.text"
          class="text-body1"
          style="height: 100px"
        ></div>
        <q-card
          @click="$router.push(button.to)"
          class="cursor-pointer bg-white q-mt-sm text-dark q-py-sm"
        >
          <q-card-section class="text-center">
            <q-icon size="80px" color="dark" :name="button.icon"></q-icon>
          </q-card-section>
          <q-card-section class="q-pt-none">
            <div class="text-h5 text-bold text-uppercase text-center">
              {{ button.name }}
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const buttons = [
  {
    text: "Você pode optar pelo nosso <b class='text-primary'>ciclo dinâmico</b>, com temporizador e funcionalidades exclusivas (indicado)",
    icon: 'play_circle',
    name: 'ciclo',
    to: '/app/create-cicle',
  },
  {
    text: "Você pode optar pelo <b class='text-primary'>registro manual</b>, quem melhor para controlar seus estudos que você mesmo?",
    icon: 'edit_calendar',
    name: 'Manual',
    to: '/app/create-record',
  },
];
</script>

<style></style>
