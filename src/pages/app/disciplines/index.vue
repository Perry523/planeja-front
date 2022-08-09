<template>
  <div class="q-px-xl q-py-lg">
    <div class="row items-center q-mb-xl">
      <div class="text-h4">Minhas disciplinas</div>
      <q-btn
        class="q-ml-md"
        color="primary"
        icon="add"
        label="adicionar disciplina"
        text
        @click="createDisciplineDialog = true"
      />
    </div>
    <div class="row q-col-gutter-lg">
      <div v-for="(discipline, i) in disciplines" :key="i" class="col-3">
        <q-card class="text-dark" :title="discipline.name">
          <q-card-section>
            <div class="row">
              <div class="text-h6 text-center col q-ml-md">
                {{ discipline.name }}
              </div>
              <q-btn dense flat icon="more_vert">
                <q-menu>
                  <q-list>
                    <q-item
                      @click="editar(discipline, i)"
                      clickable
                      v-close-popup
                    >
                      <q-item-section>Editar</q-item-section>
                    </q-item>
                    <q-item
                      @click="deleteDiscipline(discipline)"
                      clickable
                      v-close-popup
                    >
                      <q-item-section>Excluir</q-item-section>
                    </q-item>
                  </q-list>
                </q-menu>
              </q-btn>
            </div>
          </q-card-section>
          <q-card-section class="q-pt-none">
            <div class="row q-mb-sm">
              <div class="q-mr-sm">Conteúdos:</div>
              <q-btn
                text-color="dark"
                size="xs"
                icon="add"
                color="primary"
                round
                @click="addContent(discipline)"
              />
            </div>

            <q-chip
              size="sm"
              v-for="(content, j) in discipline.contents"
              :key="j"
              class="text-body1 text-center"
            >
              {{ content.name }}
            </q-chip>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <q-dialog @hide="clearDiscipline" v-model="createDisciplineDialog">
      <q-card style="width: 400px">
        <q-card-section class="q-pb-none">
          <div class="text-h6 text-center">
            {{ isEdit ? 'Editar' : 'Novo' }} Disciplina
          </div>
        </q-card-section>
        <q-card-section>
          <q-form class="q-gutter-y-md full-width" @submit="saveDiscipline">
            <q-input
              label="Nome da disciplina"
              name="name"
              v-model="newDiscipline.name"
              required
            />
            <div class="row justify-between q-mb-md">
              <div class="text-h6 q-mr-md">Conteúdos:</div>
              <q-btn
                class="q-px-sm"
                size="xs"
                color="tertiary"
                icon="add"
                round
                @click="newDiscipline.contents.push({ name: '' })"
              />
            </div>
            <div class="column no-wrap" style="height: 200px; overflow: auto">
              <div
                class="row items-center"
                v-for="(content, i) in newDiscipline.contents"
                :key="i"
              >
                <q-input
                  label="Nome do conteúdo"
                  name="name"
                  class="col"
                  v-model="content.name"
                  :index="i"
                  required
                />
                <q-icon
                  v-if="isEdit"
                  size="md"
                  :name="content.id ? 'edit' : 'add_circle'"
                  color="green"
                  class="cursor-pointer q-mx-md"
                  @click="editContent(content)"
                />
                <q-icon
                  size="md"
                  color="red"
                  name="delete"
                  class="cursor-pointer"
                  @click="removeContent(content, i)"
                />
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
    <q-dialog v-model="deleteDisciplineDialog" style="width: 400px">
      <q-card>
        <q-card-section class="q-pb-none">
          <div class="text-h6 text-center">Excluir Disciplina</div>
        </q-card-section>
        <q-card-section>
          <div class="text-h6 text-center">
            Você tem certeza que deseja excluir esta disciplina?
          </div>
          <q-btn
            class="full-width"
            color="primary"
            label="Excluir"
            @click="deleteDisciplineDialog = false"
          />
        </q-card-section>
      </q-card>
    </q-dialog>
    <q-dialog v-model="createContentDialog">
      <q-card>
        <q-card-section class="q-pb-none">
          <div class="text-h6 text-center">Adicionar Conteúdo</div>
        </q-card-section>
        <q-card-section>
          <q-form
            class="q-gutter-md full-width"
            @submit="createDisciplineContent"
          >
            <q-input
              label="Nome do conteúdo"
              name="name"
              v-model="newContent.name"
              required
            />
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
const $q = useQuasar();
type Content = {
  id?: number;
  name: string;
};
type Discipline = {
  name: string;
  id?: number;
  contents: Array<Content>;
};
const disciplines = ref<Discipline[]>([]);
const newDiscipline = ref<Discipline>({
  name: '',
  contents: [],
});
const newContent = ref<Content>({
  name: '',
});
const createContentDialog = ref(false);
const deleteDisciplineDialog = ref(false);
const createDisciplineDialog = ref(false);
const isEdit = ref(false);
const selectedIndex = ref(-1);
const selectedDiscipline = ref<Discipline>({
  name: '',
  contents: [],
});
async function createDisciplineContent() {
  await api.post('discipline-contents', {
    disciplineId: selectedDiscipline.value.id,
    name: newContent.value.name,
  });
  newContent.value.name = '';
  $q.notify({
    message: 'Disciplina cadastrada',
    position: 'top',
    color: 'positive',
    icon: 'check',
  });
  getDisciplines();
}
const getDisciplines = async () => {
  setTimeout(async () => {
    const response = await api.get('/disciplines/getAll');
    disciplines.value = response.data;
  }, 50);
};
const editar = (discipline: Discipline, index: number) => {
  selectedIndex.value = index;
  isEdit.value = true;
  newDiscipline.value = {
    name: discipline.name,
    id: discipline.id,
    contents: JSON.parse(JSON.stringify(discipline.contents)),
  };
  selectedDiscipline.value = Object.assign({}, discipline);

  createDisciplineDialog.value = true;
};
const saveDiscipline = async () => {
  if (isEdit.value) {
    await api.put(
      `/disciplines/${newDiscipline.value.id}`,
      newDiscipline.value.name
    );
  } else {
    console.log(newDiscipline.value);
    const { data } = await api.post('/disciplines', newDiscipline.value);
    const [id] = data;
    newDiscipline.value.contents.forEach((content) => {
      api.post('discipline-contents', {
        disciplineId: id,
        name: content.name,
      });
    });
  }
  newDiscipline.value = {
    name: '',
    contents: [],
  };
  isEdit.value = false;
  createDisciplineDialog.value = false;
  getDisciplines();
};
const addContent = (discipline: Discipline) => {
  selectedDiscipline.value = JSON.parse(
    JSON.stringify(Object.assign({}, discipline))
  );
  createContentDialog.value = true;
};
const clearDiscipline = () => {
  newDiscipline.value = {
    name: '',
    contents: [],
  };
  isEdit.value = false;
  createDisciplineDialog.value = false;
};
const removeContent = async (discipline: any, index: number) => {
  if (discipline.id) {
    await api.delete(`/discipline-contents/${discipline.id}`);
  } else {
    newDiscipline.value.contents.splice(index, 1);
  }
  await getDisciplines();
  updateDiscipline();
};
const editContent = async (discipline: any) => {
  if (discipline.id) {
    api.put(`/discipline-contents/${discipline.id}`, {
      name: discipline.name,
    });
    $q.notify({
      message: 'Conteúdo editado',
      position: 'top',
      color: 'positive',
      icon: 'check',
    });
  } else {
    api.post('/discipline-contents', {
      name: discipline.name,
      disciplineId: selectedDiscipline.value.id,
    });
    $q.notify({
      message: 'Conteúdo adicionado',
      position: 'top',
      color: 'positive',
      icon: 'check',
    });
  }
  await getDisciplines();
  updateDiscipline();
};
const updateDiscipline = async () => {
  setTimeout(() => {
    if (isEdit.value) {
      newDiscipline.value = Object.assign(
        {},
        disciplines.value[selectedIndex.value]
      );
    }
  }, 200);
};
const deleteDiscipline = async (discipline: Discipline) => {
  await api.delete(`/disciplines/${discipline.id}`);
  getDisciplines();
};
onMounted(getDisciplines);
</script>

<style></style>
