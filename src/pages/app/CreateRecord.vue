<template>
  <q-form class="q-pa-lg column window-height">
    <div class="text-h5">Vamos iniciar a configuração</div>
    <div class="row q-col-gutter-md q-my-md">
      <q-select
        outlined
        :rules="[]"
        filled
        class="col-2"
        label="Disciplina"
        v-model="discipline"
        option-label="name"
        :options="disciplines"
      ></q-select>
      <q-select
        outlined
        :rules="[]"
        filled
        v-model="record.discipline_content_id"
        :options="disciplineContents"
        class="col-2"
        map-options
        emit-value
        option-label="name"
        option-value="id"
        label="Conteudo"
      ></q-select>

      <q-select
        outlined
        :rules="[]"
        filled
        class="col-2"
        label="Sensação de domínio"
        v-model="record.domain_level"
        :options="[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].reverse()"
      />
    </div>
    <div class="row q-col-gutter-md q-mb-md">
      <q-input
        outlined
        :rules="[]"
        filled
        label="Data do estudo"
        class="col-2"
        v-model="record.date"
      >
        <template v-slot:append>
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy
              cover
              transition-show="scale"
              transition-hide="scale"
            >
              <q-date mask="DD/MM/YYYY" v-model="record.date">
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="Close" color="primary" flat />
                </div>
              </q-date>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
      <q-input
        label="hora do estudo"
        class="col-2"
        filled
        v-model="record.hour"
        fill-mask="00:00"
        mask="time"
      >
        <template v-slot:append>
          <q-icon name="access_time" class="cursor-pointer">
            <q-popup-proxy
              cover
              transition-show="scale"
              transition-hide="scale"
            >
              <q-time v-model="record.hour">
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="Close" color="primary" flat />
                </div>
              </q-time>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
      <q-input
        label="duração do estudo"
        class="col-2"
        filled
        v-model="record.studied_time"
        mask="##:##"
        fill-mask="00:00"
        reverse-fill-mask
        app
      />

      <q-select
        outlined
        :rules="[]"
        filled
        class="col-2"
        label="Tipo de estudo"
        v-model="record.study_type"
        :options="['Questões', 'Aulas', 'Revisão', 'Redação']"
      />
      <q-input
        v-if="record.study_type === 'Aulas'"
        outlined
        :rules="[]"
        filled
        label="Aulas assistidas"
        v-model="lessonsWatched"
        class="col-2"
      />
    </div>
    <template v-if="record.study_type === 'Questões'">
      <div class="row q-col-gutter-md q-mb-md">
        <q-input
          outlined
          :rules="[]"
          filled
          label="Questões corretas"
          v-model="correctAnswers"
          class="col-2"
        />
        <q-input
          outlined
          :rules="[]"
          filled
          label="Questões erradas"
          v-model="wrongAnswers"
          class="col-2"
        />
        <q-input
          outlined
          :rules="[]"
          filled
          label="Questões em branco"
          v-model="wrongAnswers"
          class="col-2"
        />
        <q-toggle label="Método Cebraspe" v-model="record.cebraspe" />
      </div>
    </template>
    <template v-if="record.study_type === 'Redação'">
      <div class="row q-col-gutter-md q-mb-md">
        <q-input
          outlined
          :rules="[]"
          filled
          label="Nota competencia 1"
          v-model="correctAnswers"
          class="col-2"
        />
        <q-input
          outlined
          :rules="[]"
          filled
          label="Nota competencia 2"
          v-model="wrongAnswers"
          class="col-2"
        />
        <q-input
          outlined
          :rules="[]"
          filled
          label="Nota competencia 3"
          v-model="wrongAnswers"
          class="col-2"
        />
        <q-input
          outlined
          :rules="[]"
          filled
          label="Nota competencia 4"
          v-model="wrongAnswers"
          class="col-2"
        />
        <q-input
          outlined
          :rules="[]"
          filled
          label="Nota competencia 5"
          v-model="wrongAnswers"
          class="col-2"
        />
      </div>
    </template>
    <div class="row q-col-gutter-md q-mb-md">
      <q-input
        outlined
        :rules="[]"
        filled
        label="Observações pessoais"
        v-model="record.personal_notes"
        class="col-5"
        type="textarea"
      />
      <q-input
        outlined
        :rules="[]"
        filled
        label="Observações do professor"
        v-model="record.teacher_notes"
        type="textarea"
        class="col-5"
      />
    </div>
    <q-toggle label="Estudo concluido?" v-model="record.completed_lesson" />
    <q-btn
      color="primary"
      text-color="dark"
      class="full-width q-py-md q-mt-auto"
      label="Finalizar"
      @click="finish"
    ></q-btn>
  </q-form>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { api } from 'src/boot/axios';
import dayjs from 'dayjs';
import { Record, Discipline } from 'components/models';
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';
const $q = useQuasar();
const $router = useRouter();
const defaultDiscipline: Discipline = {
  name: '',
  id: 0,
};
const record = ref<Record>({
  study_type: '',
  discipline_content_id: null,
  personal_notes: '',
  teacher_notes: '',
  completed_lesson: true,
  domain_level: 0,
  studied_time: '00:00',
  date: dayjs().format('DD/MM/YYYY'),
  hour: '00:00',
  cebraspe: false,
});
const lessonsWatched = ref(0);
const correctAnswers = ref(0);
const wrongAnswers = ref(0);
const discipline = ref<Discipline>(defaultDiscipline);
const disciplines = ref<Discipline[]>([]);
const disciplineContents = ref<Discipline[]>([]);

watch(discipline, (value) => {
  getDisciplineContents(value.id);
});
watch(
  () => record.value.studied_time,
  (value) => {
    const [rawHours, rawMinutes] = value?.split(':');
    const hour = Number(rawHours);
    const minutes = Number(rawMinutes);
    if (minutes > 60) {
      const formatedMinutes = minutes - 60;
      const formatedHours = hour + 1;
      record.value.studied_time = `${formatedHours}:${formatedMinutes}`;
    }
  }
);
async function getDisciplines() {
  const { data } = await api('/disciplines');
  disciplines.value = data;
}
async function getDisciplineContents(id: number) {
  const { data } = await api('discipline-contents', {
    params: { disciplineId: id },
  });
  disciplineContents.value = data;
}
async function finish() {
  const MILISECONDS = 1000;
  const formatedDate = record.value.date.split('/').reverse().join('-');
  const study_date = `${formatedDate}T${record.value.hour}:00-03:00`;
  const [hour, minutes] = record.value.studied_time.split(':');
  const studied_time =
    Number(minutes) * 60 * MILISECONDS + Number(hour) * 3600 * MILISECONDS;
  const payload = Object.assign(
    { ...record.value },
    {
      study_date,
      studied_time,
    }
  );
  api.post('/study-records', payload);
  $q.notify({
    message: 'Cadastro realizado',
    position: 'top',
    color: 'positive',
    icon: 'check',
  });
  $router.push('/app/study-records');
}
onMounted(() => {
  getDisciplines();
});
</script>

<style></style>
