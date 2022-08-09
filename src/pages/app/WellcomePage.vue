<template>
  <div>
    <div class="text-h4 text-primary">Vamos começar</div>
    <div class="q-mt-lg text-h5">Inicie criando uma disciplina</div>
    <div class="flex q-mt-sm">
      <q-input
        :rules="[
          (name) =>
            name?.length >= 4 || 'A disciplina deve possuir ao menos 4 digitos',
        ]"
        label="Nome da disciplina"
        dense
        v-model="newDiscipline.name"
      >
        <template v-slot:append>
          <q-icon
            class="cursor-pointer"
            @click="createDiscipline"
            v-if="newDiscipline.name?.length >= 4"
            name="add"
          />
        </template>
      </q-input>
    </div>
    <template v-if="disciplines?.length">
      <div transition-show="slide-left" class="text-h5 q-my-md">
        Bom trabalho, agora vamos cadastrar o conteúdo das disciplinas
      </div>
      <div class="flex q-gutter-x-lg">
        <q-chip
          v-for="(discipline, i) in disciplines"
          :key="i"
          :label="discipline.name"
          :color="
            discipline.id === selectedDiscipline?.id ? 'primary' : 'secondary'
          "
          size="lg"
          class="text-dark font-weight-dark"
          removable
          clickable
          square
          @click="selectedDiscipline = discipline"
          @remove="removeDiscipline(discipline.id)"
        >
        </q-chip>
      </div>
      <div class="q-mb-md">
        Você pode alterar a disciplina selecionada clicando sobre ela
      </div>
      <create-subdiscipline :selected-discipline="selectedDiscipline" />
    </template>
  </div>
</template>

<script setup lang="ts">
import CreateSubdiscipline from 'components/SubDiscipline.vue';
import { ref, watch } from 'vue';
import { api } from 'src/boot/axios';
import { useQuasar } from 'quasar';
type Discipline = {
  name: string;
  id: number;
};
const $q = useQuasar();
const disciplines = ref<Discipline[]>([]);
const selectedDiscipline = ref<Discipline>();

const newDiscipline = ref({
  name: '',
});
watch(disciplines, (value) => {
  if (!selectedDiscipline.value) {
    const [firstValue] = value;
    selectedDiscipline.value = firstValue;
  }
});
async function getDisciplines() {
  const { data } = await api('/disciplines');
  disciplines.value = data;
}
async function createDiscipline() {
  await api.post('/disciplines', newDiscipline.value);
  newDiscipline.value.name = '';
  $q.notify({
    message: 'Disciplina cadastrada',
    position: 'top',
    color: 'positive',
    icon: 'check',
  });
  getDisciplines();
}
async function removeDiscipline(id: number) {
  await api.delete(`/disciplines/${id}`);
  $q.notify({
    message: 'Disciplina removida',
    position: 'top',
    color: 'positive',
    icon: 'check',
  });
  getDisciplines();
}
getDisciplines();
</script>

<style></style>
