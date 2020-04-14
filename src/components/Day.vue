<template>
  <div class="sc-full-day">
    <template v-for="(hour, index) in day.hours">
      <div :key="index" class="sc-full-day-hour">{{hour.label}}</div>
      <div class="sc-full-day-time-line-item">
        <div class="sc-full-day-time-line-circle"/>
      </div>
    </template>

      <div class="sc-full-day-events" >
      <div
        v-for="(event, index) in day.events"
        :key="index"
        :style="{gridRow:new Date(event.startDate).getHours() + 1 +'/span ' +(new Date(event.endDate).getHours() - new Date(event.startDate).getHours() + 1),}"
        class="sc-full-day-event"
        :index="index"
      >
        <div class="sc-full-day-event-time">
          <div>{{event.startTime}}</div>
          <div>{{event.endTime}}</div>
        </div>
        <div class="sc-full-day-event-title">{{event.title}}</div>
      </div>
      </div>
   
  </div>
</template>

<script>
export default {
  name: "Day",
  props: ["day"]
};
</script>

<style>
.list-item {
  display: inline-block;
  margin-right: 10px;
}
.list-enter-active, .list-leave-active {
  transition: all 1s;
  position: absolute

}
.list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(-100px);
}

</style>
