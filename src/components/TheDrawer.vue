<template>
  <q-drawer
    v-model="drawerState"
    show-if-above
    :width="120"
    :breakpoint="0"
    bordered
    class="bg-tertiary"
  >
    <q-scroll-area class="fit flex column">
      <q-list
        dark
        class="flex items-center q-py-none"
        padding
        separator
        bordered
        to="/login"
      >
        <q-item class="q-mx-auto flex justify-center full-width" clickable>
          <q-item-section class="items-center q-pr-none q-py-md" avatar>
            <q-avatar src="favicon.ico">
              <q-img src="favicon.ico"></q-img>
            </q-avatar>
          </q-item-section>
        </q-item>
        <q-item
          v-for="(drawerItem, i) in items"
          active-class="text-secondary"
          class="q-mx-auto flex justify-center full-width"
          :key="i"
          clickable
          v-ripple
          :to="drawerItem.redirectTo"
        >
          <q-item-section class="items-center q-pr-none" avatar>
            <q-icon class="q-mb-xs" :name="drawerItem.icon" />
            <q-item-section
              :class="drawerItem.classes"
              class="text-center smaller-line"
            >
              {{ drawerItem.name }}
            </q-item-section>
          </q-item-section>
        </q-item>
      </q-list>
    </q-scroll-area>
  </q-drawer>
</template>

<script setup lang="ts">
import { DrawerItem } from './models';
import { ref } from 'vue';
const drawerState = ref(true);
const items = ref<DrawerItem[]>([
  {
    name: 'Minhas disciplinas',
    icon: 'menu_book',
    redirectTo: '/app/disciplinas',
    classes: '',
  },
  {
    name: 'Meus planos',
    icon: 'newspaper',
    redirectTo: '/app/plans',
    classes: 'q-py-xs',
  },
  {
    name: 'Meus ciclos',
    icon: 'play_circle',
    redirectTo: '/app/cicles',
    classes: 'q-py-xs',
  },
  {
    name: 'Histórico',
    icon: 'history',
    redirectTo: '/app/history',
    classes: 'q-py-xs',
  },
  {
    name: 'Configurações',
    icon: 'settings',
    redirectTo: '/app/settings',
    classes: 'q-py-xs',
  },
]);
</script>

<style>
.smaller-line {
  line-height: 0.9;
}
</style>
