<template>
  <div class="sc-wrapper">
    <div class="sc-year-wrapper">
      <div class="sc-year" :class="{'sc-month-year':calendar.selectedDate.type !== 'year'}">
        <PrevButton @click.native="gotoPrev()"/>
        <h2>{{calendar.selectedDate.value}}</h2>
        <NextButton @click.native="gotoNext()"/>
      </div>
      <div class="sc-toggle">
        <div
          class="spring-button"
          :class="{'spring-button-active':calendar.selectedDate.type === 'day'}"
          @click="changeContent('day')"
        >Day</div>
        <div
          class="spring-button"
          :class="{'spring-button-active':calendar.selectedDate.type === 'week'}"
          @click="changeContent('week');"
        >Week</div>
        <div
          class="spring-button"
          :class="{'spring-button-active':calendar.selectedDate.type === 'month'}"
          @click="changeContent('month');extendedMonth=true;"
        >Month</div>

        <div
          class="spring-button"
          :class="{'spring-button-active':calendar.selectedDate.type === 'year'}"
          @click="changeContent('year')"
        >Year</div>
      </div>
    </div>
    <div class="spring-main-content">
      <component
        :is="mainContent"
        :extended="extendedMonth"
        :months="calendar.selectedDate.months"
        :month="calendar.selectedDate.month"
        :week="calendar.selectedDate.week"
        :day="calendar.selectedDate"
      ></component>
    </div>
  </div>
</template>

<script>
import { NextButton, PrevButton } from "./buttons";
import Year from "./Year";
import Month from "./Month";
import Day from "./Day";
import Week from "./Week";
import {
  reactive,
  computed,
  ref,
  watch,
  watchEffect,
  onMounted
} from "@vue/composition-api";

import useCalendar from "./useCalendar";
import { provideContext } from "./useContext";

/****
 * * export script
 */

export default {
  name: "spring-calendar",
  // props: ["year", "locale", "color", "events"],

  props: {
    year: {
      type: String,
      default: String(new Date().getFullYear())
    },
    locale: {
      type: String,
      default: "en"
    },
    color: {
      type: String,
      default: "#5118ac"
    },
    events: {
      type: Array,
      default: () => []
    },
    defaultType: {
      type: String,
      default: "year"
    },
  },
  setup(props) {
    const { year, color, events, locale ,defaultType} = props;
    /*** */
    const mainContent = ref("year");
    /*** */
    const extendedMonth = ref(false);
    /*** */
const colors=["#004D40", "#00695C", "#2e003e", "#3d2352", "#05386B", "#379683", "#022140", "#265077", "#0c0023", "#190061", "#38003c", "#e90052", "#330136", "#5E1742", "#191226", "#F2355B", "#702C8E", "#ED1651", "#2A4C59", "#A62D43", "#103754", "#D53D13", "#332851", "#CA3074", "#2D4057", "#4097AA", "#214D72", "#2C7695", "#071E22", "#EE2E31", "#434858", "#FC6453", "#651e3e", "#851e3e", "#0072ff", "#00c6ff", "#34495e", "#41b883", "#2b2d5c", "#3465d8", "#323E40", "#D97D0D", "#1D1D2C", "#E40C2B", "#1D1D2C", "#C3002F", "#306073", "#F2385A", "#0f256e", "#01a168", "#05004E", "#fd5f00", "#3e1063", "#401372", "#2F2440", "#BA0F30"]
let coloredEvents=events.map(event=>{
  event.color=colors[Math.round(Math.random()*56)-1];
  return event;
})
    const { calendar, changeView, gotoNext, gotoPrev } = useCalendar(
      year,
      locale,
    coloredEvents
    );
    /***
     * * watchers
     */
    watch("props.color", () => {
      color
        ? document.documentElement.style.setProperty("--primary", color)
        : document.documentElement.style.setProperty("--primary", "#5118ac");
    });
    /******* */
    watch(
      () => calendar.selectedDate,
      () => {
        setMainContent(calendar.selectedDate.type);
      }
    );

    /**
     * * functions
     */

    function setMainContent(value) {
      mainContent.value = value;
    }

    function changeContent(content) {
      changeView(content, calendar.selectedDate.value, false, true);
    }
    onMounted(() => {
      changeContent(defaultType);
    });
    function selectMonth(month) {
      extendedMonth.value = true;
      changeView("month", month.fullLabel, false);
    }

    /**** */
    function selectDay(day) {
      changeView("day", day.label, false);
    }

    provideContext({ selectMonth, selectDay });
    /**
     * * return data
     */
    return {
      mainContent,
      calendar,
      changeView,
      gotoNext,
      gotoPrev,
      changeContent,
      extendedMonth
    };
  },

  components: {
    NextButton,
    PrevButton,
    Year,
    Day,
    Month,
    Week
  }
};
</script>

<style lang="scss" src="./style.scss">
</style>
