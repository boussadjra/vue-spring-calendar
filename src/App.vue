<template>
<div id="app">
    <SpringCalendar year="2020" default-type="week" color="#5118ac" show="month" :events="events" locale="en" start-of-week="0" :labels-config="config" />
</div>
</template>

<script>
import SpringCalendar from "./components/SpringCalendar.vue";
export default {
    name: "App",
    data: () => ({

        config: {
            title: "name",
            startDate: 'start',
            endDate: 'end'
        },
        events: [{
                title: "Event 1",
                startDate: "2020-12-24 08:00",
                endDate: "2020-12-24 12:00"
            },
            {
                title: "Event 2",
                startDate: "2020-12-24 09:00",
                endDate: "2020-12-24 12:00"
            },
            {
                title: "Event 3",
                startDate: "2020-12-24 12:00",
                endDate: "2020-12-24 16:00"
            },
            {
                title: "Event 4",
                startDate: "2020-12-24 09:00",
                endDate: "2020-12-24 10:00"
            },
            {
                title: "Event 5",
                startDate: "2020-12-28 09:00",
                endDate: "2020-12-28 14:00"
            },
            {
                title: "Event 6",
                startDate: "2020-12-28 08:00",
                endDate: "2020-12-28 10:00"
            },
            {
                title: "Event 7",
                startDate: "2020-12-28 06:00",
                endDate: "2020-12-28 10:00"
            },
            {
                title: "Event 8",
                startDate: "2020-12-24 18:00",
                endDate: "2020-12-24 22:00"
            },
            {
                title: "Event 9",
                startDate: "2020-12-24 18:00",
                endDate: "2020-12-24 20:00"
            },
            {
                title: "Event 10",
                startDate: "2020-12-23 09:00",
                endDate: "2020-12-23 20:50"
            },
            {
                title: "Event 11",
                startDate: "2020-12-27 09:00",
                endDate: "2020-12-27 20:30"
            },
            {
                title: "Event 12",
                startDate: "2020-12-24 09:00",
                endDate: "2020-12-24 12:30"
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
