<template>
  <div>
    <div class="text-h5">
      Conteudos de:
      <span class="text-primary text-bold">{{ selectedDiscipline.name }}</span>
    </div>
    <div class="flex">
      <q-input
        label="Nome do conteudo"
        hint="Algebra, Movimento linear, Cartografia..."
        dense
        v-model="newDisciplineContent.name"
      >
        <template v-slot:append>
          <q-icon
            class="cursor-pointer"
            @click="createDisciplineContent"
            name="add"
          />
        </template>
      </q-input>
    </div>
    <div class="flex q-gutter-x-md q-my-md">
      <q-chip
        v-for="(disciplineContent, i) in disciplineContents"
        :key="i"
        :label="disciplineContent.name"
        color="secondary"
        class="text-dark font-weight-dark"
        removable
        @remove="removeDisciplineContent(disciplineContent.id)"
      />
    </div>
    <div class="text-h5 text-primary">
      Tudo pronto, vamos agendar nosso primeiro estudo
    </div>
    <q-btn
      text-color="dark"
      label="Seguir para o agendamento"
      color="primary"
      icon-right="arrow_right_alt"
      size="lg"
      rounded
      class="q-mt-lg"
      to="/app/start-scheduling"
    ></q-btn>
  </div>
</template>

<script setup lang="ts">
import { Discipline } from 'components/models';
import { defineProps, ref, watch } from 'vue';
import { api } from 'src/boot/axios';
import { useQuasar } from 'quasar';
const $q = useQuasar();
const props = defineProps({
  selectedDiscipline: {
    default: {
      name: '',
      id: 0,
    },
  },
});
const disciplineContents = ref<Discipline[]>([]);
const newDisciplineContent = ref({
  name: '',
});
watch(props, () => getDisciplineContents());
async function getDisciplineContents() {
  const { data } = await api('discipline-contents', {
    params: { disciplineId: props.selectedDiscipline.id },
  });
  disciplineContents.value = data;
}
async function removeDisciplineContent(id: number) {
  await api.delete('discipline-contents/' + id);
  getDisciplineContents();
}
async function createDisciplineContent() {
  await api.post('discipline-contents', {
    disciplineId: props.selectedDiscipline.id,
    ...newDisciplineContent.value,
  });
  newDisciplineContent.value.name = '';
  $q.notify({
    message: 'Disciplina cadastrada',
    position: 'top',
    color: 'positive',
    icon: 'check',
  });
  getDisciplineContents();
}
getDisciplineContents();
</script>

<style></style>
