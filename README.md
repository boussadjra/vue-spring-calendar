## Vue Spring Calendar
 It's a Vue based component which provides the functionality of a full-calendar that 
 shows daily events. 

## Installation


 `npm install vue-spring-calendar --save`


## Usage

```js 
<template>
  <div id="app">
    <SpringCalendar year="2020" color="#41b883" :events="events" locale="en"/>
  </div>
</template>

<script>
import SpringCalendar from "vue-spring-calendar";
export default {
  name: "App",
  data: () => ({
    events:[
    {
        title:'Event 1',
        startDate:'2020-04-09 08:00',
        endDate:'2020-04-09 12:00',
    },
    {
        title:'Event 2',
        startDate:'2020-04-09 09:00',
        endDate:'2020-04-09 12:00',
    },
    {
        title:'Event 3',
        startDate:'2020-04-09 12:00',
        endDate:'2020-04-09 16:00',
    },
   

  }),
  components: {
    SpringCalendar
  }
};
</script>


```

## Demo 

[Vue Spring Calendar demo](https://boussadjra.github.io/vue-spring-calendar/)