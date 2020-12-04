<template>
<div class="sc-month-wrapper__days">
    <div v-if="month.weekday" class="sc-day sc-day-in-month" :style="{'grid-column-start':'span '+month.weekday}"></div>

    <div v-for="(day, index) in month.days" :key="'day'+index" @click="chooseDay($event,day,index)" :class="{'sc-today':day.isToday}" class="sc-day sc-day-in-month">
        <div>{{day.index}}</div>
        <sup v-if="day.events.length">
            <div class="sc-day-events-count">{{day.events.length}}</div>
        </sup>
        <template v-if="month.extended && day.events.length > 0">
            <div class="sc-day-events">
                <span v-for="(e, index) in sliceEvents(day.events)" :key="'de'+index" class="sc-event">{{e.title}}</span>
                <span class="sc-event-more-indicator" v-if="day.events.length>3">+{{day.events.length - 3}}</span>
                <transition name="slide-fade">
                    <template v-if="indexDayToShowEvents == index && day.events.length > 0 ">
                        <div class="sc-more-events-wrp" :style="{left:day.weekday>3?'-150%':'50%'}">
                            <div class="sc-more-events">
                                <div class="sc-events-detail">
                                    <div class="sc-events-detail-day">{{day.localeFormat}}</div>

                                    <div v-for="(e, i) in day.events" :key="'d'+i" class="sc-event-detail">
                                        <div class="sc-event-detail-time">
                                            <div>{{e.startTime}}</div>
                                            <div>{{e.endTime}}</div>
                                        </div>
                                        <div class="sc-event-detail-title">{{e.title}}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </template>
                </transition>
            </div>
        </template>
    </div>
</div>
</template>

<script>
import {
    Fragment
} from "./Fragment.js";
import {
    useContext
} from "./useContext.js";
import {
    ref
} from "@vue/composition-api";
export default {
    props: ["month"],
    setup(props) {
        const {
            selectDay
        } = useContext();
        const indexDayToShowEvents = ref(-1);

        function setIndexDayToShowEvents(v) {
            indexDayToShowEvents.value = v;
        }

        function sliceEvents(events) {
            return events.slice(0, 3);
        }

        function chooseDay(event, day, dayIndex) {
            if (props.month.extended) {
                dayIndex === indexDayToShowEvents ?
                    setIndexDayToShowEvents(-1) :
                    setIndexDayToShowEvents(dayIndex);
            } else {
                selectDay(day);
            }
        }

        return {
            selectDay,
            sliceEvents,
            chooseDay,
            indexDayToShowEvents
        };
    },
    directives: {
        Fragment
    }
};
</script>

<style lang="scss">
/* Enter and leave animations can use different */
/* durations and timing functions.              */
.slide-fade-enter-active {
    transition: all 0.3s ease;
}

.slide-fade-leave-active {
    transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter,
.slide-fade-leave-to

/* .slide-fade-leave-active below version 2.1.8 */
    {
    transform: translateY(-10px);
    transform: translateX(-100px);
    opacity: 0;
}

.sc-month-wrapper__days {
    display: grid;
    // grid-template-rows: repeat(6, 128px);
    grid-template-columns: repeat(7, 1fr);
    grid-column-start: 1;
    grid-column-end: 8;
    height: 100%
}

.sc-month-wrapper-extended .sc-month-wrapper__days {
    grid-template-rows: repeat(6, 128px);
}
</style>
