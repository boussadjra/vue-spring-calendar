<template>
  <div id="app">
    <SpringCalendar year="2020" default-type="week" color="#5118ac" show="week" :events="events" locale="en" start-of-week="1"/>
  </div>
</template>

<script>
import SpringCalendar from "./components/SpringCalendar.vue";
export default {
  name: "App",
  data: () => ({
    events: [
      {
        title: "Event 1",
        startDate: "2020-05-22 08:00",
        endDate: "2020-05-22 12:00"
      },
      {
        title: "Event 2",
        startDate: "2020-05-22 09:00",
        endDate: "2020-05-22 12:00"
      },
      {
        title: "Event 3",
        startDate: "2020-05-22 12:00",
        endDate: "2020-05-22 16:00"
      },
      {
        title: "Event 4",
        startDate: "2020-05-22 09:00",
        endDate: "2020-05-22 10:00"
      },
      {
        title: "Event 5",
        startDate: "2020-05-22 09:00",
        endDate: "2020-05-22 14:00"
      },
      {
        title: "Event 6",
        startDate: "2020-05-22 08:00",
        endDate: "2020-05-22 10:00"
      },
      {
        title: "Event 7",
        startDate: "2020-05-22 06:00",
        endDate: "2020-05-22 10:00"
      },
      {
        title: "Event 8",
        startDate: "2020-05-22 18:00",
        endDate: "2020-05-22 22:00"
      },
      {
        title: "Event 9",
        startDate: "2020-05-22 18:00",
        endDate: "2020-05-22 20:00"
      },
      {
        title: "Event 10",
        startDate: "2020-05-18 09:00",
        endDate: "2020-05-18 20:50"
      }
      ,
      {
        title: "Event 11",
        startDate: "2020-05-19 09:00",
        endDate: "2020-05-19 20:30"
      }
       ,
      {
        title: "Event 12",
        startDate: "2020-05-22 09:00",
        endDate: "2020-05-22 12:30"
      }
    ]
  }),
  components: {
    SpringCalendar
  }
};
</script>

<style lang="scss">
</style>
