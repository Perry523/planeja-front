<template>
  <div class="q-px-xl q-py-lg">
    <div class="row items-center q-mb-xl">
      <div class="text-h4">Meus planos de estudo</div>
      <q-btn
        class="q-ml-md"
        color="primary"
        icon="add"
        label="adicionar plano de estudo"
        text
        @click="createPlanDialog = true"
      />
    </div>
    <div class="row q-col-gutter-lg">
      <div v-for="(plan, i) in plans" :key="i" class="col-4">
        <q-card
          class="text-dark"
          :class="plan.pos ? 'bg-blue' : 'bg-amber'"
          :title="plan.name"
        >
          <q-card-section>
            <div class="row">
              <div class="text-h6 text-center col q-ml-md">{{ plan.name }}</div>
              <q-btn dense flat icon="more_vert">
                <q-menu>
                  <q-list>
                    <q-item
                      @click="generateCicle(plan)"
                      clickable
                      v-close-popup
                    >
                      <q-item-section>Gerar ciclo</q-item-section>
                    </q-item>
                    <q-item @click="editar(plan)" clickable v-close-popup>
                      <q-item-section>Editar</q-item-section>
                    </q-item>
                    <q-item
                      v-if="!plan.pos"
                      @click="editar(plan)"
                      clickable
                      v-close-popup
                    >
                      <q-item-section>Transformar em pós edital</q-item-section>
                    </q-item>
                    <q-item @click="deletePlan(plan)" clickable v-close-popup>
                      <q-item-section>Excluir</q-item-section>
                    </q-item>
                  </q-list>
                </q-menu>
              </q-btn>
            </div>
          </q-card-section>
          <q-card-section class="q-pt-none">
            <q-chip
              size="sm"
              v-for="(discipline, j) in plan.disciplines"
              :key="j"
              class="text-body1 text-center"
            >
              {{ discipline.name }}
            </q-chip>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <q-dialog @hide="clearPlan" v-model="createPlanDialog">
      <q-card style="width: 400px">
        <q-card-section class="q-pb-none">
          <div class="text-h6 text-center">
            {{ isEdit ? 'Editar' : 'Novo' }} Plano
          </div>
        </q-card-section>
        <q-card-section>
          <q-form class="q-gutter-md full-width" @submit="savePlan">
            <q-input
              label="Nome do plano"
              name="name"
              v-model="newPlan.name"
              required
            />
            <q-input
              label="Nome do concurso (Opcional)"
              name="name"
              v-model="newPlan.concurso"
            />
            <q-toggle label="Pos Edital?" v-model="newPlan.pos" required />
            <div style="height: 250px; overflow: auto">
              <div class="text-h6">Disciplinas</div>
              <div v-for="(discipline, i) in allDisciplines" :key="i">
                <div class="q-pl-sm q-mb-sm text-body1 text-capitalize">
                  {{ discipline.name }}
                </div>
                <q-item
                  v-for="content in discipline.contents"
                  :key="content.id"
                  tag="label"
                  v-ripple
                  dense
                >
                  <q-item-section avatar>
                    <q-checkbox
                      v-model="newPlan.disciplines"
                      :val="content.id"
                    />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{ content.name }}</q-item-label>
                  </q-item-section>
                </q-item>
              </div>
            </div>
            <q-btn
              class="full-width"
              type="submit"
              color="primary"
              label="Salvar"
            />
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup lang="ts">
import { api } from 'src/boot/axios';
import { ref, onMounted } from 'vue';
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';
const router = useRouter();
const $q = useQuasar();
const createPlanDialog = ref(false);
const isEdit = ref(false);
type Discipline = {
  id?: number;
  name: string;
  contents: Array<{
    id?: number;
    name: string;
  }>;
};
type Plan = {
  id?: number;
  name: string;
  pos: boolean;
  concurso: string;
  disciplines: Array<{
    name: string;
    id: number;
  }>;
};
const newPlan = ref<Plan>({
  name: '',
  pos: false,
  concurso: '',
  disciplines: [],
});

const plans = ref<Plan[]>([]);
const allDisciplines = ref<Discipline[]>([]);
const getAllDisciplines = async () => {
  const { data } = await api.get('/disciplines/getAll');
  allDisciplines.value = data;
};
const clearPlan = () => {
  newPlan.value = {
    name: '',
    pos: false,
    concurso: '',
    disciplines: [],
  };
  isEdit.value = false;
  createPlanDialog.value = false;
};
const editar = (plan: Plan) => {
  newPlan.value = Object.assign(
    {
      name: '',
      pos: false,
      concurso: '',
      disciplines: [],
    },
    plan
  );
  isEdit.value = true;
  newPlan.value.pos = !!newPlan.value.pos;
  createPlanDialog.value = true;
};
const getPlans = async () => {
  const { data } = await api.get('/study-plans');
  plans.value = data;
};
const generateCicle = async (plan: Plan) => {
  router.push({ path: '/app/create-cicle', query: { id: plan.id } });
};
const savePlan = async () => {
  if (isEdit.value) {
    await api.put(`/study-plans/${newPlan.value.id}`, newPlan.value);
  } else {
    const { data } = await api.post('/study-plans', newPlan.value);
    const [planId] = data;
    await api.post('/study-plans/insert-contents', {
      disciplines: newPlan.value.disciplines,
      study_plan_id: planId,
    });

    clearPlan();
  }
  getPlans();
};
const deletePlan = async (plan: Plan) => {
  await api.delete(`/study-plans/${plan.id}`);
  getPlans();
};
onMounted(() => {
  getPlans();
  getAllDisciplines();
});
</script>

<style></style>
