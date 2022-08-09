<template>
  <div class="column window-height">
    <div v-if="!cicles.length">
      <div class="text-h5">Vamos começar criando um ciclo</div>
      <div class="flex">
        <q-input
          :rules="[
            (name) =>
              name?.length >= 4 ||
              'O nome do ciclo deve possuir ao menos 4 digitos',
          ]"
          label="Nome do ciclo"
          dense
          class="col-6"
          v-model="newCicle.name"
        >
          <template v-slot:append>
            <q-icon
              class="cursor-pointer"
              @click="createCicle"
              v-if="newCicle.name?.length >= 4"
              name="add"
            />
          </template>
        </q-input>
      </div>
    </div>
    <template v-else>
      <div class="row">
        <div class="column col-6">
          <div class="text-h5">Selecione o ciclo</div>
          <div class="row q-gutter-x-md">
            <q-chip
              v-for="(cicle, i) in cicles"
              :key="i"
              :color="selectedCicle.id === cicle.id ? 'primary' : 'secondary'"
              text-color="dark"
              @click="selectedCicle = cicle"
              clickable
            >
              {{ cicle.name }}
            </q-chip>
          </div>
          <div class="text-h5">Vamos adicionar disciplinas ao ciclo</div>
          <div class="row q-col-gutter-md q-mt-xs q-mb-md">
            <q-select
              outlined
              :rules="[]"
              filled
              class="col-6"
              label="Disciplina"
              v-model="discipline"
              option-label="name"
              :options="disciplines"
            ></q-select>
            <q-select
              outlined
              :rules="[]"
              filled
              v-model="cicleItem.discipline_content_id"
              :options="disciplineContents"
              class="col-6"
              map-options
              emit-value
              option-label="name"
              option-value="id"
              label="Conteudo"
            ></q-select>
          </div>
          <div class="row q-col-gutter-x-md">
            <q-input
              label="duração do estudo"
              class="col-6"
              filled
              v-model="total_time"
              mask="##:##"
              fill-mask="00:00"
              reverse-fill-mask
              app
            />
            <div class="flex flex-center col-6">
              <div>Dificuldade do conteúdo</div>
              <q-slider
                v-model="cicleItem.difficulty"
                color="primary"
                label
                markers
                switch-label-side
                label-color="secondary"
                label-text-color="dark"
                label-always
                :label-value="sliderLabel"
                :min="1"
                :max="5"
              />
            </div>
          </div>
          <q-input
            filled
            label="Notas pessoais"
            type="textarea"
            class="q-mt-md"
            v-model="cicleItem.notes"
          >
          </q-input>
          <q-btn
            class="full-width q-mt-md"
            color="primary"
            @click="createCicleContent"
            text-color="dark"
            label="Adicionar"
          />
        </div>
        <div class="column col-6 q-pl-md">
          <div class="text-h5">Ciclo: {{ selectedCicle.name }}</div>
          <div class="row q-col-gutter-md q-mt-md">
            <div
              class="col-4"
              v-for="(cicleContent, i) in selectedCicleContents"
              :key="i"
            >
              <q-card>
                <q-card-section>
                  {{ cicleContent.name }}
                </q-card-section>
              </q-card>
            </div>
          </div>
        </div>
      </div>
    </template>
    <q-btn
      v-if="selectedCicleContents.length"
      class="full-width q-mt-auto q-py-sm"
      color="secondary"
      text-color="dark"
      label="Finalizar"
      to="/app"
    ></q-btn>
  </div>
</template>

<script setup lang="ts">
import { Discipline, CicleItem } from 'components/models';
import { api } from 'boot/axios';
import { ref, onMounted, watch, computed } from 'vue';
import { useQuasar } from 'quasar';
const $q = useQuasar();
const total_time = ref('00:00');
const defaultDiscipline: Discipline = {
  name: '',
  id: -1,
};
const newCicle = ref({
  name: '',
});
const cicleItem = ref<CicleItem>({
  study_cicle_id: -1,
  discipline_content_id: null,
  notes: '',
  difficulty: 1,
  total_time: 0,
});
const selectedCicle = ref<Discipline>({ id: -1, name: '' });
const selectedCicleContents = ref<CicleItem[]>([]);
const cicles = ref<Discipline[]>([]);
const discipline = ref<Discipline>(defaultDiscipline);
const disciplines = ref<Discipline[]>([]);
const disciplineContents = ref<Discipline[]>([]);

watch(discipline, (value) => {
  getDisciplineContents(value.id);
});
watch(selectedCicle, (value) => {
  getCicleContents();
  cicleItem.value.study_cicle_id = value.id;
});
watch(
  () => total_time.value,
  (value) => {
    const [rawHours, rawMinutes] = value?.split(':');
    const hour = Number(rawHours);
    const minutes = Number(rawMinutes);
    if (minutes > 60) {
      const formatedMinutes = minutes - 60;
      const formatedHours = hour + 1;
      total_time.value = `${formatedHours}:${formatedMinutes}`;
    }
  }
);
const sliderLabel = computed(() => {
  switch (cicleItem.value.difficulty) {
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
      return 0;
      break;
  }
});
async function createCicle() {
  await api.post('/cicles', newCicle.value);
  $q.notify({
    message: 'Ciclo cadastrado',
    position: 'top',
    color: 'positive',
    icon: 'check',
  });
  getCicles();
}
async function createCicleContent() {
  const MILISECONDS = 1000;
  const [hour, minutes] = total_time.value.split(':');
  cicleItem.value.total_time =
    Number(minutes) * 60 * MILISECONDS + Number(hour) * 3600 * MILISECONDS;
  await api.post('/cicle-contents', cicleItem.value);
  $q.notify({
    message: 'Ciclo cadastrado',
    position: 'top',
    color: 'positive',
    icon: 'check',
  });
  getCicleContents();
}
async function getDisciplines() {
  const { data } = await api('/disciplines');
  disciplines.value = data;
}
async function getCicles() {
  const { data } = await api('/cicles');
  cicles.value = data;
}
async function getCicleContents() {
  const { data } = await api('/cicle-contents', {
    params: {
      cicle_id: selectedCicle.value.id,
    },
  });
  selectedCicleContents.value = data;
}
async function getDisciplineContents(id: number) {
  const { data } = await api('discipline-contents', {
    params: { disciplineId: id },
  });
  disciplineContents.value = data;
}
onMounted(() => {
  getCicles();
  getDisciplines();
});
</script>

<style></style>
