<template>
  <q-form @submit="saveCicle" class="column no-wrap">
    <div class="text-h5 q-mb-lg">Vamos criar seu ciclo</div>
    <div class="row q-mb-md">
      <q-input
        v-model="newCicle.name"
        label="Nome do ciclo"
        dense
        class="col-3"
      >
      </q-input>
    </div>
    <div class="row q-col-gutter-lg">
      <q-input
        label="Horas disponíveis na semana"
        class="col-3"
        v-model="newCicle.weekly_time"
        mask="###"
        app
      />
      <q-input
        label="Dias de estudo na semana"
        class="col-3"
        v-model="newCicle.week_days"
        mask="#"
      />
    </div>
    <div class="text-h6 q-my-lg">Adicionar disciplinas</div>
    <div style="height: 40px" class="row q-pl-xl q-ml-md text-body1 text-bold">
      <div class="col-2">Nome</div>
      <div class="col-3 col-sm-4 col-md-3">Dificuldade da disciplina</div>
      <div class="col-3 q-ml-lg q-pl-sm">Relevância da disciplina</div>
    </div>
    <div v-for="(discipline, i) in allDisciplines" :key="i">
      <div
        v-for="content in discipline.disciplines"
        :key="content.id"
        class="q-pa-none row"
        tag="label"
        dense
      >
        <q-item-section avatar>
          <q-checkbox v-model="newCicle.disciplines" :val="content" />
        </q-item-section>
        <q-item-section class="col-2">
          <q-item-label>{{ content.name }}</q-item-label>
        </q-item-section>
        <q-item-section class="col-3 col-sm-4 col-md-3">
          <div style="max-width: 210px">
            <q-slider
              v-model="content.difficulty"
              color="primary"
              label
              markers
              label-color="secondary"
              label-text-color="dark"
              :label-value="difficultyLabel(content.difficulty)"
              :min="1"
              :max="5"
            />
          </div>
        </q-item-section>
        <q-item-section class="col-2 col-md-2 col-lg-2 q-ml-xl">
          <q-slider
            v-model="content.relevance"
            color="primary"
            label
            markers
            label-color="secondary"
            label-text-color="dark"
            :label-value="relevanceLabel(content.relevance)"
            :min="1"
            :max="3"
          />
        </q-item-section>
      </div>
    </div>

    <q-btn
      class="full-width q-mt-auto q-py-sm"
      color="primary"
      text-color="dark"
      label="Finalizar"
      type="submit"
    ></q-btn>
  </q-form>
</template>

<script setup lang="ts">
import { api } from 'boot/axios';
import { ref, onMounted, reactive } from 'vue';
import { useQuasar } from 'quasar';
import { useRoute } from 'vue-router';
const name = ref('');
const $q = useQuasar();
const route = useRoute();
type Discipline = {
  id?: number;
  name: string;
  disciplines: Array<{
    id?: number;
    name: string;
    difficulty: number;
    relevance: number;
  }>;
};
type Cicle = {
  id?: number;
  name: string;
  weekly_time: number;
  week_days: number;
  disciplines: Array<number>;
};
const newCicle = ref<Cicle>({
  name: '',
  weekly_time: 0,
  week_days: 0,
  disciplines: [],
});
const allDisciplines = ref<Discipline[]>([]);
const difficultyLabel = (i) => {
  switch (i) {
    case 1:
      return 'Muito fácil';
    case 2:
      return 'Fácil';
    case 3:
      return 'Normal';
    case 4:
      return 'Difícil';
    case 5:
      return 'Muito difícil';
    default:
      return 'Selecione uma dificuldade';
      break;
  }
};
const relevanceLabel = (i) => {
  switch (i) {
    case 1:
      return 'Baixa';
    case 2:
      return 'Média';
    case 3:
      return 'Alta';
    default:
      return 'Selecione uma relevância';
      break;
  }
};
const getAllDisciplines = async () => {
  const { data } = await api.get('/disciplines/getAll');
  allDisciplines.value = data;
};
const getPlan = async () => {
  const id = route.query.id;
  const { data } = await api.get(`/study-plans/${id}`);
  allDisciplines.value = data.map((discipline: Discipline) => {
    discipline.disciplines.map((content) => {
      content.difficulty = content.difficulty || 3;
      content.relevance = content.relevance || 2;
      newCicle.value.disciplines.push(content);
    });
  });
  allDisciplines.value = data;
};
async function saveCicle() {
  console.log(newCicle.value);
  const { data } = await api.post('/cicles', newCicle.value);
  $q.notify({
    message: 'Ciclo salvo com sucesso',
    color: 'positive',
  });
  const [id] = data;
  api.post('/cicle-contents', {
    study_cicle_id: id,
    disciplines: newCicle.value.disciplines,
  });
}
onMounted(() => {
  getPlan();
});
</script>

<style></style>
