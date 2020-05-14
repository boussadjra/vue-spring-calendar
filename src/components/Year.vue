<template>
  <div class="sc-year-months">
    <div v-for="(month, index) in months" :key="index">
      <Month :month="month" :key="'my'+index"/>
    </div>
  </div>
</template>
<script>
import Month from "./Month";
import { Fragment } from "./Fragment.js";
export default {
  name: "year",
  props: ["months"],
  components: {
    Month
  },
  directives:{
    Fragment
  }
};
</script>

<style>
</style>
