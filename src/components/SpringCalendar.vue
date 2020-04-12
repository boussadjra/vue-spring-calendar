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
          :class="{'spring-button-active':calendar.selectedDate.type === 'month'}"
          @click="changeContent('month')"
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
import {
  reactive,
  computed,
  ref,
  watch,
  watchEffect
} from "@vue/composition-api";

import useCalendar from "./useCalendar";
import { provideContext } from "./useContext";
/****
 * * export script
 */

export default {
  props: ["year", "locale", "color", "events"],
  setup(props) {
    const { year, color, events, locale } = props;
    /*** */
    const mainContent = ref("year");

    const extendedMonth = ref(false);
    /*** */

    const { calendar, changeView, gotoNext, gotoPrev } = useCalendar(
      year,
      locale,
      events
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
    Month
  }
};
</script>

<style lang="scss" src="./style.scss">
</style>
