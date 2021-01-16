/* eslint-disable */
<template>
  <div>
    <div class="legend">
      <span>考勤时间图例</span>
      <ul>
        <li>签到、签退</li>
        <li>迟到、早退</li>
        <li>允许迟到、允许早退</li>
      </ul>
    </div>
    <div class="fragment">
      <div class="fragment-scroll">
        <div class="time">
          <div class="time-item" v-for="(item, index) in finalArr" :key="index">
            {{ index % 24 < 10 ? `0${index % 24}` : index % 24 }}
          </div>
        </div>
        <div class="block">
          <div
            class="block-item"
            v-for="(item, index) in finalArr"
            :key="index"
          ></div>
        </div>
        <div
          class="timeLine"
          v-for="(item, index) in getTimeList"
          :key="index"
          :class="item.class"
          :style="`width: ${item.minutes * oneMinute}%;
                 left: ${item.left * oneMinute + 100 / 24 / 2}%`"
        ></div>
      </div>
    </div>
  </div>
</template>
<script>
import { formatAdClassesList } from './utils';
import moment from 'moment';
const oneMinute = 100 / 24 / 60;

export default {
  data () {
    return {
      oneMinute,
      finalArr: new Array(48).fill(undefined)
    };
  },
  props: {
    list: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  computed: {
    formatAdClasses () {
      return formatAdClassesList(this.list);
    },
    getTimeList () {
      const timeList = [];
      const startDate = moment(
        `${this.formatAdClasses[0].signInDate} 00:00:00`
      );
      this.formatAdClasses.forEach((item) => {
        // 绿色
        timeList.push({
          class: 'green',
          color: 'rgba(70,207,132, 0.1)',
          minutes: moment(`${item.signOutDate} ${item.signOutTime}`).diff(
            moment(`${item.signInDate} ${item.signInTime}`),
            'minutes'
          ),
          left: moment(`${item.signInDate} ${item.signInTime}`).diff(
            startDate,
            'minutes'
          )
        });
        // 红色 迟到
        timeList.push({
          class: 'red',
          color: 'rgba(255,71,71,0.1)',
          minutes: moment(`${item.SignInEndDate} ${item.signInEnd}`).diff(
            moment(`${item.SignInLateDateTime}`),
            'minutes'
          ),
          left: moment(`${item.SignInLateDateTime}`).diff(startDate, 'minutes')
        });
        // 红色 早退
        timeList.push({
          class: 'red',
          color: 'rgba(255,71,71,0.1)',
          minutes: moment(`${item.SignOutEarlyDateTime}`).diff(
            moment(`${item.SignOutStartDate} ${item.signOutStart}`),
            'minutes'
          ),
          left: moment(`${item.SignOutStartDate} ${item.signOutStart}`).diff(
            startDate,
            'minutes'
          )
        });
        // 黄色 允许迟到
        timeList.push({
          class: 'yellow',
          color: 'rgba(255,248,227,0.1)',
          minutes: moment(`${item.SignInLateDateTime}`).diff(
            moment(`${item.signInDate} ${item.signInTime}`),
            'minutes'
          ),
          left: moment(`${item.signInDate} ${item.signInTime}`).diff(
            startDate,
            'minutes'
          )
        });
        // 黄色 允许早退
        timeList.push({
          class: 'yellow',
          color: 'rgba(255,248,227,0.1)',
          minutes: moment(`${item.signOutDate} ${item.signOutTime}`).diff(
            moment(`${item.SignOutEarlyDateTime}`),
            'minutes'
          ),
          left: moment(`${item.SignOutEarlyDateTime}`).diff(
            startDate,
            'minutes'
          )
        });
      });
      return timeList;
    }
  }
};
</script>
<style lang="less" scoped>
  .legend {
    display: flex;
    justify-content: space-between;
    margin-bottom: 16px;

    ul {
      display: flex;

      li {
        position: relative;
        font-size: 14px;
        color: #565e66;

        &:nth-child(1) {
          &::before {
            background: #ecfaf3;
          }
        }
        &:nth-child(2) {
          &::before {
            background: #ffecec;
          }
        }
        &:nth-child(3) {
          &::before {
            background: #fff8e3;
          }
        }

        &::before {
          content: "";
          position: absolute;
          left: -30px;
          top: 2px;
          width: 16px;
          height: 16px;
        }
      }
      li + li {
        margin-left: 60px;
      }
    }
  }
  .fragment {
    position: relative;
    overflow-x: auto;
    border-bottom: 1px solid #f0f2f5;

    &-scroll {
      width: 200%;
    }

    .time,
    .block {
      display: flex;
      overflow-x: auto;
      padding: 10px 0;
      padding-right: calc(100vw / 48);

      &-item {
        width: calc(100vw / 24);
        text-align: center;
        color: #565e66;
        font-size: 12px;
      }

      .block-item {
        position: relative;
        height: 56px;
        &::after {
          position: absolute;
          top: 0;
          left: 50%;
          height: 56px;
          border-right: 1px dashed #f0f2f5;
          content: "";
        }
      }
    }

    .time {
      background: #fafbfc;
    }

    .green {
      background: #ecfaf3;
    }

    .red {
      background: #ffecec;
      z-index: 2;
    }

    .yellow {
      background: #fff8e3;
      z-index: 2;
    }

    .timeLine {
      position: absolute;
      top: 65px;
      height: 28px;
    }
  }
</style>
