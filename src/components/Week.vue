<template>
  <div class="sc-week-wrapper">
    <div class="sc-weekdays">
      <div v-for="(weekday, j) in week.weekdays" class="sc-weekday" :key="'fwd'+j">
        <div class="sc-weekday-label" :data-full="weekday.label" :data-short="weekday.labelShort"></div>
        <div class="sc-weekday-date">{{weekday.date}}</div>
      </div>
    </div>
    <div class="sc-week-hours-wrap">
      <div class="sc-week-hours">
        <template v-for="(hour, index) in week.hours">
          <div :key="'wh'+index" class="sc-week-hour">{{hour.label}}</div>
        </template>
      </div>
    </div>
    <div class="sc-week-events-wrap">
      <div
        v-for="(event, index) in mappedEvents"
        :key="'we'+index"
        style="border-left:thin solid #fff"
        class="sc-week-events"
      >
        <div
          v-for="(item, i) in event"
          :key="'evdd'+i+index"
          :style="{...item.style}"
          class="sc-week-event"
          :class="{'sc-week-event-focused':item.title==focusedEvent.title}"
          @click="focusOnEvent(item)"
        >
          <div v-if="item.title==focusedEvent.title" class="sc-week-event-time">
            <div>{{item.startTime}}</div>
            <div>{{item.endTime}}</div>
          </div>
          <div class="sc-week-event-title">{{item.title}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref, watch } from "@vue/composition-api";
export default {
  name: "week",
  inheritAttrs: false,
  props: ["week"],
  data() {
    return {
      focusedEvent: {}
    };
  },

  computed: {
    events() {
      let left = 0;
      let range = [];
      let _events =   this.week.weekdays
        .map(wd => wd.events)
        .flat()
        .sort((a, b) => {
          return (
            new Date(a.startDate).getHours() - new Date(b.startDate).getHours()
          );
        })
        .map((event, i) => {
          let startHour = new Date(event.startDate).getHours();
          let endHour = new Date(event.endDate).getHours();
          let startMinutes = new Date(event.startDate).getMinutes();
          let endMinutes = new Date(event.endDate).getMinutes();
          range = [];
          event.style = {
            "grid-row": startHour + 1 + "/span " + (endHour - startHour + 1),

            "grid-column": event.weekday + 1,
            // "z-index": startHour + 1,
            background: event.color,
            height: (endHour - startHour) * 32 + (32 * endMinutes) / 60 + "px"
          };

          return event;
        });

      return _events;
    },
      mappedEvents (){
      let _mappedEvents = [];
      for (let h = 1; h <= 24; h++) {
        for (let j = 0; j < 7; j++) {
          _mappedEvents.push(this.getEventsByHour(h, j));
        }
      }

      return _mappedEvents;
    }
  },
  methods: {
   getEventsByHour(hour, day) {
      let _events = this.events.filter(e => {
        let startHour = new Date(e.startDate).getHours();
        return startHour === hour && day === e.weekday;
      });

      return _events.map((e, i) => {
        e.style.left = (i / _events.length) * 90 + "%";
        e.style.top = "0px";
        return e;
      });
    },

   focusOnEvent (event ) {
      this.focusedEvent = event;
    }
  },

};
</script>

<style lang="scss">
@mixin forSmallScreens($media) {
  @media (max-width: $media+px) {
    @content;
  }
}
.sc-week-wrapper {
  display: grid;
  grid-template-columns: 64px auto;
  grid-template-rows: 48px auto;

  background: #f3f3f3;
  border-radius: 4px;
  -webkit-box-shadow: 1px 1px 5px #aaa;
  box-shadow: 1px 1px 5px #aaa;
  position: relative;
  height: 100%;
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
    )
    /*,
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
    grid-column-end: 3;

    display: grid;
    grid-template-columns: repeat(7, 1fr);

    .sc-weekday {
      display: flex;
      height: 100%;
      width: 100%;
      justify-content: center;
      align-items: center;
      flex-direction: column;

      &:not(:last-child) {
        border-right: thin solid #7f7d82;
      }
      &-label {
        &:before {
          content: attr(data-full);
        }
        @include forSmallScreens(640) {
          &:before {
            content: attr(data-short);
          }
        }
      }

      &-date {
        opacity: 0.7;
        font-size: 10pt;
      }
    }
  }

  .sc-week-hours-wrap {
    grid-column: 1/2;
    grid-row: 2/3;
    display: inherit;
    grid-template-columns: 64px;
    grid-template-rows: repeat(24, 32px);
  }

  .sc-week-hours {
    grid-row: 1/25;
    background: var(--primary);
    color: aliceblue;

    .sc-week-hour {
      border-bottom: thin solid #7f7d82;
      grid-column-start: 1;
      grid-column-end: 2;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 32px;
      position: relative;
    }
  }

  .sc-week-events-wrap {
    display: grid;
    grid-template-rows: repeat(24, 32px);
    grid-template-columns: repeat(7, 1fr);
    grid-column-start: 2;
    grid-column-end: 3;
    grid-row-start: 2;
    position: relative;

    .sc-week-events {
      display: flex;
      max-width: 100%;
      position: relative;

      .sc-week-event {
        color: white;
        position: absolute;
        width: 72px;
        z-index: 4;
        cursor: pointer;

        &-time {
          color: white;
          font-size: 9pt;
          padding: 4px;
        }

        &-title {
          display: flex;
          align-items: center;
          padding: 4px;
          font-size: 9pt;
        }

        &-focused,
        &:hover {
          z-index: 10;
          // left: 0;
          border: thin dashed #fff;
          min-height: max-content;
        }
      }
    }
  }
}
</style>
