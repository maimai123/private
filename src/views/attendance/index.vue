/* eslint-disable */
<template>
  <div class="attendance">
    <h2>考勤时段校验规则及考勤时段直观图</h2>
    <time-frame :list="this.form.adClasses" />
    <!-- <attendance-graphic :data="this.form.adClasses" /> -->

    <el-form
      :model="form"
      :rules="rules"
      ref="$classes"
      label-position="top"
      class="class-form"
    >
      <el-form-item label="考勤时段设置">
        <div class="class-form-header">
          <div>
            <el-button
              v-if="form.adClasses.length < 3"
              type="primary"
              plain
              size="mini"
              class="btn-add"
              @click="handleAddClass"
            >
              <!-- <NewFilled /> -->
              Add
            </el-button>
          </div>
          <div v-if="!!planWorkMinute" class="time-count">
            {{
              `上班时长：${parseInt(planWorkMinute / 60, 10)}小时${
                planWorkMinute % 60
              }分`
            }}
          </div>
        </div>
        <div
          class="class-item"
          v-for="(item, index) in form.adClasses"
          :key="index"
        >
          <div class="class-item-signIn">
            <el-form-item
              label="上班时间"
              :prop="'adClasses.' + index + '.signInTime'"
              :rules="rules.signInTime(index)"
            >
              <el-time-picker
                v-model="item.signInTime"
                suffix-icon="el-icon-time"
                format="HH:mm"
                value-format="HH:mm:00"
                @change="handleSubmit"
                :picker-options="{
                  selectableRange:
                    index !== 0
                      ? cutTime(
                          formatAdClasses[0].signInTime,
                          formatAdClasses[index - 1].signOutTime
                        )
                      : null,
                }"
              >
              </el-time-picker>
              <span
                class="nextDay"
                v-if="
                  isTomorrow(formatAdClasses[index].signInDate) &&
                  checkNextDay(
                    item.signInTime,
                    index > 0 ? formatAdClasses[index - 1].signOutTime : ''
                  )
                "
                >次日</span
              >
            </el-form-item>
            <el-form-item label="上班打卡时间段">
              <div class="timeRange">
                <el-form-item
                  :prop="'adClasses.' + index + '.signInStart'"
                  :rules="rules.signInStart(index)"
                >
                  <el-time-picker
                    v-model="item.signInStart"
                    suffix-icon="el-icon-time"
                    format="HH:mm"
                    value-format="HH:mm:00"
                    @change="handleSubmit"
                  />
                </el-form-item>
                <span class="unit">-</span>
                <el-form-item
                  :prop="'adClasses.' + index + '.signInEnd'"
                  :rules="rules.signInEnd(index)"
                >
                  <el-time-picker
                    v-model="item.signInEnd"
                    suffix-icon="el-icon-time"
                    format="HH:mm"
                    value-format="HH:mm:00"
                    @change="handleSubmit"
                  />
                </el-form-item>
                <span
                  class="nextDay"
                  v-if="checkNextDay(item.signInEnd, item.signInTime)"
                >
                  次日
                </span>
              </div>
            </el-form-item>
            <el-form-item
              label="允许迟到"
              class="suffix"
              :prop="'adClasses.' + index + '.lateMinute'"
              :rules="rules.lateMinute(index)"
            >
              <el-input v-model="item.lateMinute" @change="handleSubmit" /> 分
            </el-form-item>
          </div>
          <div class="class-item-signOut">
            <el-form-item
              label="下班时间"
              :prop="'adClasses.' + index + '.signOutTime'"
              :rules="rules.signOutTime(index)"
            >
              <el-time-picker
                v-model="item.signOutTime"
                suffix-icon="el-icon-time"
                format="HH:mm"
                value-format="HH:mm:00"
                @change="handleSubmit"
                :picker-options="{
                  selectableRange:
                    index !== 0
                      ? cutTime(formatAdClasses[0].signInTime, item.signInTime)
                      : null,
                }"
              >
              </el-time-picker>
              <span
                class="nextDay"
                v-if="
                  isTomorrow(formatAdClasses[index].signOutDate) &&
                  checkNextDay(item.signOutTime, item.signInTime)
                "
              >
                次日
              </span>
            </el-form-item>
            <el-form-item label="下班打卡时间段">
              <div class="timeRange">
                <el-form-item
                  :prop="'adClasses.' + index + '.signOutStart'"
                  :rules="rules.signOutStart"
                >
                  <el-time-picker
                    v-model="item.signOutStart"
                    suffix-icon="el-icon-time"
                    format="HH:mm"
                    value-format="HH:mm:00"
                    @change="handleSubmit"
                  />
                </el-form-item>
                <span class="unit">-</span>
                <el-form-item
                  :prop="'adClasses.' + index + '.signOutEnd'"
                  :rules="rules.signOutEnd(index)"
                >
                  <el-time-picker
                    v-model="item.signOutEnd"
                    suffix-icon="el-icon-time"
                    format="HH:mm"
                    value-format="HH:mm:00"
                    @change="handleSubmit"
                  />
                </el-form-item>
                <span
                  class="nextDay"
                  v-if="checkNextDay(item.signOutEnd, item.signOutTime)"
                >
                  次日
                </span>
              </div>
            </el-form-item>
            <el-form-item
              label="允许早退"
              class="suffix"
              :prop="'adClasses.' + index + '.earlyMinute'"
              :rules="rules.earlyMinute(index)"
            >
              <el-input v-model="item.earlyMinute" @change="handleSubmit" /> 分
            </el-form-item>
          </div>
          <div
            v-if="index !== 0"
            class="class-item-close"
            @click="removeClass(index)"
          >
            x
            <!-- <FailFilled /> -->
          </div>
        </div>
        <div v-if="!!planWorkMinute" class="time-count">
          {{
            `上班时长：${parseInt(planWorkMinute / 60, 10)}小时${
              planWorkMinute % 60
            }分`
          }}
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSubmit">check</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import moment from 'moment';
import timeFrame from './timeFrame';
import attendanceGraphic from './AttendanceGraphic';

import {
  checkNextDay,
  addDay,
  isDuringDate,
  cutTime,
  getIsInTimeRange,
  formatAdClassesList
} from './utils';
import { deepCopy } from '@/utils/common.js';

export default {
  data () {
    return {
      form: {
        adClasses: [
          {
            signInTime: '09:00:00', // 上班时间
            signInStart: '08:00:00', // 上班打卡开始时间
            signInEnd: '10:00:00', // 上班打卡结束时间
            lateMinute: '50', // 允许迟到时长
            signOutTime: '12:00:00', // 下班时间
            signOutStart: '11:00:00', // 下班打卡开始时间
            signOutEnd: '12:30:00', // 下班打卡结束时间,
            earlyMinute: '50', // 允许早退时长
            classType: '1'
          },
          {
            signInTime: '13:00:00', // 上班时间
            signInStart: '12:30:00', // 上班打卡开始时间
            signInEnd: '14:00:00', // 上班打卡结束时间
            lateMinute: '50', // 允许迟到时长
            signOutTime: '00:20:00', // 下班时间
            signOutStart: '23:00:00', // 下班打卡开始时间
            signOutEnd: '02:00:00', // 下班打卡结束时间,
            earlyMinute: '50', // 允许早退时长
            classType: '1'
          },
          {
            signInTime: '03:00:00', // 上班时间
            signInStart: '02:20:00', // 上班打卡开始时间
            signInEnd: '03:30:00', // 上班打卡结束时间
            lateMinute: '30', // 允许迟到时长
            signOutTime: '05:00:00', // 下班时间
            signOutStart: '04:00:00', // 下班打卡开始时间
            signOutEnd: '06:00:00', // 下班打卡结束时间,
            earlyMinute: '50', // 允许早退时长
            classType: '1'
          }
        ]
      },
      rules: {
        signInTime: (index) => [
          {
            validator: (rule, value, callback) => {
              if (!value) {
                return callback(new Error('请选择上班时间'));
              } else if (this.getIsConflict(index)) {
                return callback(new Error('当前时间段与其他时间段有冲突'));
              } else {
                return callback();
              }
            },
            trigger: 'blur'
          }
        ],
        signInStart: (index) => [
          {
            validator: (rule, value, callback) => {
              const adClasses = this.form.adClasses;
              if (!value) {
                return callback(new Error('请选择开始时间'));
              } else {
                return callback();
              }
            },
            trigger: 'blur'
          }
        ],
        signInEnd: (index) => [
          {
            validator: (rule, value, callback) => {
              const adClasses = this.form.adClasses;
              if (!value) {
                return callback(new Error('请选择结束时间'));
              } else if (
                adClasses[index].signInTime &&
                adClasses[index].signInStart &&
                adClasses[index].signInEnd &&
                !isDuringDate(
                  `${this.formatAdClasses[index].signInDate} ${adClasses[index].signInTime}`,
                  `${this.formatAdClasses[index].SignInStartDate} ${adClasses[index].signInStart}`,
                  `${this.formatAdClasses[index].SignInEndDate} ${adClasses[index].signInEnd}`
                )
              ) {
                return callback(new Error('上班时间必须处于上班打卡时间段内'));
              } else if (
                value &&
                adClasses[index].signOutStart &&
                moment(
                  `${this.formatAdClasses[index].SignInEndDate} ${value}`
                ).valueOf() >
                  moment(
                    `${this.formatAdClasses[index].SignOutStartDate} ${adClasses[index].signOutStart}`
                  ).valueOf()
              ) {
                return callback(
                  new Error('上班打卡时间段必须小于下班打卡时间段开始时间')
                );
              } else {
                return callback();
              }
            },
            trigger: 'blur'
          }
        ],
        lateMinute: (index) => [
          {
            validator: (rule, value, callback) => {
              const adClasses = this.form.adClasses;
              if (!value) {
                return callback(new Error('请输入允许迟到'));
              } else if (!(/(^[1-9]\d*$)/.test(+value))) {
                return callback(new Error('请输入有效数字'));
              } else if (
                +value >
                moment(
                  `${this.formatAdClasses[index].SignInEndDate} ${adClasses[index].signInEnd}`
                ).diff(
                  moment(
                    `${this.formatAdClasses[index].SignInDate} ${adClasses[index].signInTime}`
                  ),
                  'minute'
                )
              ) {
                return callback(
                  new Error('允许迟到时间必须小于等于最迟打卡时间 - 上班时间值')
                );
              } else {
                return callback();
              }
            },
            trigger: 'blur'
          }
        ],
        signOutTime: (index) => [
          {
            validator: (rule, value, callback) => {
              if (!value) {
                return callback(new Error('请选择下班时间'));
              } else if (this.planWorkMinute > 24 * 60) {
                return callback(new Error('上班时间不得超过24小时'));
              } else {
                return callback();
              }
            },
            trigger: 'blur'
          }
        ],
        signOutStart: [
          {
            required: true,
            message: '请选择开始时间',
            trigger: 'blur'
          }
        ],
        signOutEnd: (index) => [
          {
            validator: (rule, value, callback) => {
              const adClasses = this.form.adClasses;
              if (!value) {
                return callback(new Error('请选择结束时间'));
              } else if (
                !isDuringDate(
                  `${this.formatAdClasses[index].signOutDate} ${adClasses[index].signOutTime}`,
                  `${this.formatAdClasses[index].SignOutStartDate} ${adClasses[index].signOutStart}`,
                  `${this.formatAdClasses[index].SignOutEndDate} ${adClasses[index].signOutEnd}`
                )
              ) {
                return callback(new Error('下班时间必须处于下班打卡时间段内'));
              } else if (
                value &&
                index !== adClasses.length - 1 &&
                adClasses[index + 1].signInStart &&
                moment(
                  `${this.formatAdClasses[index].SignOutEndDate} ${value}`
                ).valueOf() >
                  moment(
                    `${this.formatAdClasses[index + 1].SignInStartDate} ${
                      adClasses[index + 1].signInStart
                    }`
                  ).valueOf()
              ) {
                return callback(
                  new Error('下班打卡时间段必须小于上班打卡时间段开始时间')
                );
              } else if (
                value &&
                index === adClasses.length - 1 &&
                adClasses[0].signInStart &&
                moment(
                  `${this.formatAdClasses[index].SignOutEndDate} ${value}`
                ).valueOf() >
                  moment(
                    `${this.formatAdClasses[0].SignInStartDate} ${adClasses[0].signInStart}`
                  )
                    .add(1, 'days')
                    .valueOf()
              ) {
                return callback(
                  new Error(
                    '下班打卡时间结束时间必须小于第一个上班打卡开始时间'
                  )
                );
              } else {
                return callback();
              }
            },
            trigger: 'blur'
          }
        ],
        earlyMinute: (index) => [
          {
            validator: (rule, value, callback) => {
              const adClasses = this.form.adClasses;
              if (!value) {
                return callback(new Error('请输入允许早退'));
              } else if (!(/(^[1-9]\d*$)/.test(+value))) {
                return callback(new Error('请输入有效数字'));
              } else if (
                +value >
                moment(
                  `${this.formatAdClasses[index].signOutDate} ${adClasses[index].signOutTime}`
                ).diff(
                  moment(
                    `${this.formatAdClasses[index].SignOutStartDate} ${adClasses[index].signOutStart}`
                  ),
                  'minute'
                )
              ) {
                return callback(
                  new Error('允许早退时间必须小于等于下班时间 - 最早打卡时间值')
                );
              } else {
                return callback();
              }
            },
            trigger: 'blur'
          }
        ]
      },
      checkNextDay,
      addDay,
      cutTime
    };
  },
  components: {
    timeFrame,
    attendanceGraphic
  },
  computed: {
    planWorkMinute () {
      const adClasses = this.formatAdClasses;
      let total = 0;
      adClasses.forEach((item) => {
        if (item.signOutTime && item.signInTime) {
          total += moment(`${item.signOutDate} ${item.signOutTime}`).diff(
            moment(`${item.signInDate} ${item.signInTime}`),
            'minute'
          );
        }
      });
      return total || 0;
    },
    formatAdClasses () {
      const adClasses = this.form.adClasses;
      return formatAdClassesList(adClasses);
    }
  },
  methods: {
    /* 考勤时间段设置 */
    handleAddClass () {
      this.form.adClasses.push({
        signInTime: !this.form.adClasses.length ? '09:00:00' : '', // 上班时间
        signInStart: '', // 上班打卡开始时间
        signInEnd: '', // 上班打卡结束时间
        lateMinute: '', // 允许迟到时长
        signOutTime: !this.form.adClasses.length ? '18:00:00' : '', // 下班时间
        signOutStart: '', // 下班打卡开始时间
        signOutEnd: '', // 下班打卡结束时间,
        earlyMinute: '', // 允许早退时长
        classType: '1' // 类型是固定班制
      });
    },
    removeClass (i) {
      this.form.adClasses.splice(i, 1);
      setTimeout(() => {
        this.handleSubmit();
      }, 1);
    },
    handleSubmit () {
      this.$refs.$classes.validate();
    },
    // 当前时间段与遍历全局查看是否有冲突时间段
    getIsConflict (index) {
      let flag = false;
      const adClasses = this.form.adClasses;
      adClasses.forEach((item, i) => {
        if (
          index !== i &&
          getIsInTimeRange(
            `${this.formatAdClasses[index].signInDate} ${this.formatAdClasses[index].signInTime}`,
            `${this.formatAdClasses[index].signOutDate} ${this.formatAdClasses[index].signOutTime}`,
            `${this.formatAdClasses[i].signInDate} ${this.formatAdClasses[i].signInTime}`,
            `${this.formatAdClasses[i].signOutDate} ${this.formatAdClasses[i].signOutTime}`
          )
        ) {
          flag = true;
        }
      });
      return flag;
    },
    isTomorrow (time) {
      return time === moment().add(1, 'days').format('YYYY-MM-DD');
    },
    setFormData (list) {
      this.form.adClasses = deepCopy(list);
    }
  }
};
</script>
<style lang="less" scoped>
  .attendance {
    width: 100%;
    padding: 16px;
    text-align: left;
    background: #fff;

    >h2 {
      margin: 20px auto;
      text-align: center;
    }

    .btn-add {
      margin-bottom: 16px;
    }
  }

  .class-form {
    width: 100%;

    &-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .class-item {
      position: relative;
      display: flex;
      flex-direction: column;
      padding: 8px 16px 0;
      background-color: #fafbfc;

      &-signIn {
        margin-bottom: 10px;
      }

      &-signIn,
      &-signOut {
        display: flex;

        > * + * {
          margin-left: 24px;
        }

        .nextDay {
          position: absolute;
          right: 0;
          z-index: 1;
          width: 40px;
        }
      }

      .suffix {
        /deep/.el-form-item__content {
          display: flex;

          .el-input {
            width: 120px;
            margin-right: 8px;
          }
        }
      }

      &-close {
        position: absolute;
        top: 16px;
        right: 16px;

        > * {
          color: #83898f;
          font-size: 16px;
        }
      }
    }

    .class-item + .class-item {
      margin-top: 16px;
    }

    .timeRange {
      display: flex;

      /deep/.el-input {
        width: 120px;
      }

      .unit {
        margin: 0 16px 0 8px;
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #bfc3c7;
        letter-spacing: 0;
      }
    }
    .time-count {
      text-align: right;
      color: #bfc3c7;
    }
  }
</style>
