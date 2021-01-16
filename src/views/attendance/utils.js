import moment from 'moment';
import { deepCopy } from '@/utils/common.js';

export const checkNextDay = (current, start) => {
  if (!current || !start) return false;
  const date = new Date();
  const hour = current.split(':');
  const mins = start.split(':');
  return date.setHours(hour[0], hour[1]) <= date.setHours(mins[0], mins[1]);
};

// 判断日期是否需要+1
export const addDay = (current, start, format = 'yyyy-MM-DD HH:mm:ss') => {
  if (checkNextDay(current, start)) {
    return moment(`${moment().format('YYYY-MM-DD')} ${current}`)
      .add(1, 'days')
      .format(format);
  }
  return moment(`${moment().format('YYYY-MM-DD')} ${current}`).format(format);
};

export const isDuringDate = (current, start, end) => {
  if (!current || !start || !end) return false;
  if (
    moment(current).valueOf() >=
    moment(start).valueOf() &&
    moment(current).valueOf() <=
    moment(end).valueOf()
  ) {
    return true;
  }
  return false;
};

// 上下班时间允许选择时间
export const cutTime = (start, end) => {
  if (!start || !end) return null;
  if (!checkNextDay(end, start)) {
    return [`00:00:00 - ${start}`, `${end} - 23:59:00`];
  } else {
    return [`${end} - ${start}`];
  }
};

/*
 * 判断两个时间段是否冲突
 * 实例 （'12:30 - 14:30'，'13:00 - 14:30'），（'16:00 - 17:30'，'13:00 - 14:30'）
 */

export const getIsInTimeRange = (startTime, endTime, starTimeX, endTimeY) => {
  if (
    moment(starTimeX).valueOf() < moment(endTime).valueOf() &&
    moment(startTime).valueOf() < moment(endTimeY).valueOf()
  ) {
    return true;
  }
  return false;
};

/*
 * 把传入时间点列表为时间添加日期的概念
 */
export const formatAdClassesList = (list) => {
  const adClasses = deepCopy(list)
  const date = moment().format('YYYY-MM-DD')
  const nextDay = moment().add(1, 'days').format('YYYY-MM-DD')

  let FLAG = date
  try {
    adClasses.map((item, i) => {
      /* 设置上下班日期 ---- START ----- */
      item.signInDate = FLAG
      item.signOutDate = FLAG
      if (checkNextDay(item.signOutTime, item.signInTime)) {
        FLAG = nextDay
        item.signOutDate = nextDay
      }
      if (
        i !== 0 &&
        checkNextDay(item.signInTime, adClasses[i - 1].signInTime)
      ) {
        FLAG = nextDay
        item.signInDate = nextDay
        item.signOutDate = nextDay
      }
      item.signInStamp =
        item.signInTime &&
        moment(`${item.signInDate} ${item.signInTime}`).valueOf()
      item.signOutStamp =
        item.signOutTime &&
        moment(`${item.signInDate} ${item.signOutTime}`).valueOf()
      /* 设置上下班日期 ---- END ----- */
      /* 设置上下班打卡时间日期 ---- START ----- */

      // 上班时间开始时间 加上时间
      if (i !== 0 && checkNextDay(item.signInTime, item.signInStart)) {
        console.log('上班时间开始时间 加上时间')
        item.SignInStartDate = moment(item.signOutDate)
          .subtract(1, 'days')
          .format('YYYY-MM-DD')
      } else {
        item.SignInStartDate = item.signInDate
      }
      // 上班时间结束时间 加上时间
      if (checkNextDay(item.signInEnd, item.signInTime)) {
        console.log('上班时间结束时间 加上时间')
        item.SignInEndDate = moment(item.signInDate)
          .add(1, 'days')
          .format('YYYY-MM-DD')
      } else {
        item.SignInEndDate = item.signInDate
      }
      // 下班时间开始时间 加上时间
      if (checkNextDay(item.signOutTime, item.signOutStart)) {
        console.log('下班时间开始时间 加上时间')
        item.SignOutStartDate = moment(item.signOutDate)
          .subtract(1, 'days')
          .format('YYYY-MM-DD')
      } else {
        item.SignOutStartDate = item.signOutDate
      }

      // 下班时间结束时间 加上时间
      if (checkNextDay(item.signOutEnd, item.signOutTime)) {
        console.log('下班时间结束时间 加上时间')
        item.SignOutEndDate = moment(item.signOutDate)
          .add(1, 'days')
          .format('YYYY-MM-DD')
      } else {
        item.SignOutEndDate = item.signOutDate
      }
      /* 设置上下班打卡时间日期 ---- END ----- */

      /* 设置迟到早退时间 ---- START ----- */
      item.SignInLateDateTime = moment(`${item.signInDate} ${item.signInTime}`).add(+item.lateMinute, 'minutes').format('YYYY-MM-DD HH:mm:ss')
      item.SignOutEarlyDateTime = moment(`${item.signOutDate} ${item.signOutTime}`).subtract(+item.earlyMinute, 'minutes').format('YYYY-MM-DD HH:mm:ss')
      /* 设置迟到早退时间 ---- END ----- */
    })
  } catch (err) {
    console.log(err)
  }
  return adClasses
}
