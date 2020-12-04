<template>
<div class="sc-wrapper">
    <div class="sc-year-wrapper">
        <div class="sc-year" :class="{ 'sc-month-year': calendar.selectedDate.type !== 'year' }">
            <PrevButton @click.native="gotoPrev()" />
            <h2>{{ calendar.selectedDate.value }}</h2>
            <NextButton @click.native="gotoNext()" />
        </div>
        <div class="sc-toggle">
            <div class="spring-button" :class="{
            'spring-button-active': calendar.selectedDate.type === 'day',
          }" @click="changeContent('day')">
                Day
            </div>
            <div class="spring-button" :class="{
            'spring-button-active': calendar.selectedDate.type === 'week',
          }" @click="changeContent('week')">
                Week
            </div>
            <div class="spring-button" :class="{
            'spring-button-active': calendar.selectedDate.type === 'month',
          }" @click="
            changeContent('month');
            extendedMonth = true;
          ">
                Month
            </div>

            <div class="spring-button" :class="{
            'spring-button-active': calendar.selectedDate.type === 'year',
          }" @click="changeContent('year')">
                Year
            </div>
        </div>
    </div>
    <div class="spring-main-content">
        <component :is="mainContent" :extended="extendedMonth" :months="calendar.selectedDate.months" :month="calendar.selectedDate.month" :week="calendar.selectedDate.week" :day="calendar.selectedDate"></component>
    </div>
</div>
</template>

<script>
import {
    NextButton,
    PrevButton
} from "./buttons";
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
    onMounted,
} from "@vue/composition-api";

import useCalendar from "./useCalendar";
import {
    provideContext
} from "./useContext";
import colors from "./colors"
/****
 * * export script
 */

export default {
    name: "spring-calendar",

    props: {
        year: {
            type: String,
            default: String(new Date().getFullYear()),
        },
        locale: {
            type: String,
            default: "en",
        },
        color: {
            type: String,
            default: "#5118ac",
        },
        events: {
            type: Array,
            default: () => [],
        },
        defaultType: {
            type: String,
            default: "year",
        },
    },
    setup(props) {
        const {
            year,
            color,
            events,
            locale,
            defaultType
        } = props;
        /*** */
        const mainContent = ref("year");
        /*** */
        const extendedMonth = ref(false);
        /*** */

        let coloredEvents = events.map((event) => {
            event.color = colors[Math.round(Math.random() * 56) - 1];
            return event;
        });
        const {
            calendar,
            changeView,
            gotoNext,
            gotoPrev
        } = useCalendar(
            year,
            locale,
            coloredEvents
        );
        /***
         * * watchers
         */
        watch("props.color", () => {
            color
                ?
                document.documentElement.style.setProperty("--primary", color) :
                document.documentElement.style.setProperty("--primary", "#5118ac");
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

        provideContext({
            selectMonth,
            selectDay
        });
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
            extendedMonth,
        };
    },

    components: {
        NextButton,
        PrevButton,
        Year,
        Day,
        Month,
        Week,
    },
};
</script>

<style lang="scss" src="./style.scss">
</style>
