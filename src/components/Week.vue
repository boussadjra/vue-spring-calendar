<template>
  <div class="sc-week-wrapper">
    <div class="sc-weekdays">
      <div
        v-for="(weekday, j) in week.weekdays"
        class="sc-weekday spring-centered-content"
        :key="'fwd'+j"
      >{{weekday}}</div>
    </div>
   <div class="sc-week-content">
     <div class="sc-week-hours">
       <template v-for="(hour, index) in week.hours">
      <div :key="'wh'+index" class="sc-week-hour">{{hour.label}}</div>
      
    </template>
     </div>
   
   </div> 
   </div>
  </div>
</template>

<script>
export default {
  name: "week",
  inheritAttrs:false,
  props: ["week"],
  setup(props) {}
};
</script>

<style lang="scss">
.sc-week-wrapper {
  display: grid;
  grid-template-columns: 64px repeat(7, 1fr);

  background: #f3f3f3;
  border-radius: 4px;
  -webkit-box-shadow: 1px 1px 5px #aaa;
  box-shadow: 1px 1px 5px #aaa;
  position: relative;
  height: 100%;
  grid-template-rows: 48px repeat(24, 32px);
  background-color: transparent;
  background-image: linear-gradient(
      0deg,
      transparent 24%,
      #efefef 25%,
      #efefef 26%,
      transparent 27%,
      transparent 74%,
      #efefef 75%,
      #efefef 76%,
      transparent 77%,
      transparent
    )/*,
    linear-gradient(
      90deg,
      transparent 24%,
      #efefef 25%,
      #efefef 26%,
      transparent 27%,
      transparent 74%,
      #efefef 75%,
      #efefef 76%,
      transparent 77%,
      transparent
    )*/;
  background-size: 64px 64px;
  .sc-weekdays {
    background: var(--primary);
    color: white;
    grid-column-start: 2;
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-column-end: 9;
  }
  .sc-week-content{
    grid-column: 1/9;
    grid-row: 2/26;
   display: inherit;
    grid-template-columns: inherit;
  grid-template-rows:  repeat(24, 32px);

}
    .sc-week-hours{
    grid-row: 1/25;
      background: var(--primary);
    color: aliceblue;
    .sc-week-hour{
      border-bottom: thin solid #aeacb1;
        grid-column-start: 1;
        grid-column-end: 2;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 32px;
        position: relative;
    }
    }
  }


</style>
