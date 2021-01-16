<template>
  <div class="fragment">
    <div class="fragment-scroll">
      <div
        class="fragment-scroll-item"
        v-for="(item, index) in finalArr"
        :key="index"
      >
        <p class="time">
          <span class="time-text">{{ index > 23 ? index - 24 : index }}</span>
        </p>
        <div class="block">
          <div
            v-for="(child, childIndex) in item"
            :key="childIndex"
            class="block-item"
            :style="`left: ${(child.size && child.size.left) || 0}; width: ${
              (child.size && child.size.width) || 0
            }; background: ${child.color}`"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: "AttendanceGraphic",
  props: {
    data: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      finalArr: new Array(48).fill(undefined),
    };
  },
  methods: {
    calculation(obj) {
      const data = { ...obj };
      // 得到允许迟到的时间点
      const allowTime = moment(
        moment(`2020-01-01 ${data.signInTime}`).add(data.lateMinute, "minute")
      ).format("HH:mm:ss");
      const signArr = this.timeToArr(data.signInTime, data.signOutTime, data);
      const allowArr = this.timeToArr(data.signInTime, allowTime, data);
      const lateArr = this.timeToArr(allowTime, data.signInEnd, data);
      // 得到 允许早退的时间节点
      const allowEndTime = moment(
        moment(`2020-01-01 ${data.signOutTime}`).subtract(
          data.earlyMinute,
          "minute"
        )
      ).format("HH:mm:ss");
      const allowEndArr = this.timeToArr(allowEndTime, data.signOutTime, data);
      const lateEndArr = this.timeToArr(
        data.signOutStart,
        allowEndTime,
        data,
        "last"
      );
      let finalArr = new Array(48).fill([]);
      finalArr = finalArr.map((item, index) => {
        if (
          signArr[index] ||
          allowArr[index] ||
          lateArr[index] ||
          allowEndArr[index] ||
          lateEndArr[index]
        ) {
          return [
            { color: "#ECFAF3", size: signArr[index] },
            { color: "#FFECEC", size: lateArr[index] || lateEndArr[index] },
            { color: "#FFF8E3", size: allowArr[index] || allowEndArr[index] },
          ];
        }
        return undefined;
      });
      this.finalArr.forEach((item, index) => {
        if (finalArr[index]) {
          this.finalArr[index] = finalArr[index];
        }
      });
    },
    timeToArr(startTime, endTime, data) {
      const { signInTime, tomorrow: wholeTomorrow } = data;
      const arr = new Array(48).fill(0);
      const start = startTime.split(":");
      const end = endTime.split(":");
      const allStart = signInTime.split(":");
      let tomorrow = false;
      if (
        moment(endTime, "HH:mm:ss").valueOf() <
        moment(startTime, "HH:mm:ss").valueOf()
      ) {
        tomorrow = true;
      }
      // 如果 结束时间的小时位 比开始时间的小时位小的话，说明是第二天了
      if (Number(allStart[0]) > Number(start[0]) || wholeTomorrow) {
        start[0] = Number(start[0]) + 24;
      }
      if (Number(allStart[0]) > Number(end[0]) || wholeTomorrow) {
        end[0] = Number(end[0]) + 24;
      }
      const size = moment(
        tomorrow ? `2020-01-02 ${endTime}` : `2020-01-01 ${endTime}`
      ).diff(moment(`2020-01-01 ${startTime}`), "minute");
      arr[Number(start[0])] = {
        left: `${(Math.abs(Number(start[1])) / 60) * 100}%`,
        width: `${(Math.abs(size) / 60) * 100}%`,
      };
      return arr;
    },
  },
  created() {},
  watch: {
    data: {
      handler(val) {
        this.finalArr = new Array(48).fill(undefined);
        val.forEach((item, index) => {
          if (index > 0) {
            const current = moment(item.signInTime, "HH:mm:ss").valueOf();
            const prev = moment(
              this.data[index - 1].signInTime,
              "HH:mm:ss"
            ).valueOf();
            this.$set(
              item,
              "tomorrow",
              current < prev || this.data[index - 1].tomorrow
            );
          }
          this.calculation(item);
        });
      },
      immediate: true,
      deep: true,
    },
  },
};
</script>

<style lang="less" scoped>
  .fragment {
    margin-bottom: 200px;
    overflow-x: auto;
    border-bottom: 1px solid #f0f2f5;
    padding: 0 20px;

    &-scroll {
      display: flex;
      &-item {
        width: calc(100vw / 24);
        display: inline-table;
      }
      .time {
        height: 40px;
        line-height: 40px;
        background: #fafbfc;
        border-radius: 1px;
        &-text {
          display: inline-block;
          width: 24px;
          text-align: center;
          margin-left: -12px;
        }
      }
      .block {
        position: relative;
        height: 54px;
        &::after {
          position: absolute;
          top: 0;
          left: 0;
          height: 54px;
          border-right: 1px dashed #f0f2f5;
          content: "";
          z-index: 200;
        }
        &-item {
          position: absolute;
          height: 28px;
          z-index: 100;
          margin: 13px 0;
        }
      }
    }
  }
</style>
