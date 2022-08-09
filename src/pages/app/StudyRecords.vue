<template>
  <div class="row justify-center">
    <div style="display: flex; max-width: 800px; width: 100%; height: 500px">
      <q-calendar-day
        ref="calendar"
        v-model="selectedDate"
        view="week"
        locale="pt-BR"
        dense
        hour24-format
        animated
        @change="onChange"
        @moved="onMoved"
        @click-date="onClickDate"
        @click-time="onClickTime"
        @click-interval="onClickInterval"
        @click-head-intervals="onClickHeadIntervals"
        @click-head-day="onClickHeadDay"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { QCalendarDay, today } from '@quasar/quasar-ui-qcalendar/src/index.js';
import { api } from 'src/boot/axios';
import '@quasar/quasar-ui-qcalendar/src/QCalendarVariables.sass';
import '@quasar/quasar-ui-qcalendar/src/QCalendarTransitions.sass';
import '@quasar/quasar-ui-qcalendar/src/QCalendarDay.sass';

function getStudyRecords() {
  api('/study-records');
}
getStudyRecords();
const selectedDate = ref(today());
// function onToday() {
//   this.$refs.calendar.moveToToday();
// }
function onMoved(data) {
  console.log('onMoved', data);
}
function onChange(data) {
  console.log('onChange', data);
}
function onClickDate(data) {
  console.log('onClickDate', data);
}
function onClickTime(data) {
  console.log('onClickTime', data);
}
function onClickInterval(data) {
  console.log('onClickInterval', data);
}
function onClickHeadIntervals(data) {
  console.log('onClickHeadIntervals', data);
}
function onClickHeadDay(data) {
  console.log('onClickHeadDay', data);
}
</script>

<style></style>
