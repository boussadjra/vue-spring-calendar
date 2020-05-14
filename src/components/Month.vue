<template>
  <div :class="{'sc-month-wrapper-extended':extended}" class="sc-month-wrapper">
    <div class="sc-month spring-centered-content" @click="selectMonth(month)">{{ month.label}}</div>

    <div
      v-for="(weekday, j) in month.weekdaysShort"
      class="sc-weekday spring-centered-content"
      :key="'mwd'+j"
    >{{weekday}}</div>

    <Days :month="{...month,extended}"/>
  </div>
</template>

<script>
import Days from "./Days";
import { useContext } from "./useContext.js";
export default {
  name: "Month",
  props: ["extended", "month"],
  setup(props) {
    const { selectMonth } = useContext();

    return {
      selectMonth
    };
  },
  components: {
    Days
  }
};
</script>

<style>
</style>
