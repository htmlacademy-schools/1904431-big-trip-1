import dayjs from 'dayjs';

export const sortTaskDay = (eventA, eventB) => dayjs(eventA.startDate).diff(dayjs(eventB.startDate));

export const sortTaskDuration = (eventA, eventB) => {
  const durationEventA = dayjs(eventA.endDate).diff(dayjs(eventA.startDate));
  const durationEventB = dayjs(eventB.endDate).diff(dayjs(eventB.startDate));

  if (durationEventB - durationEventA !== 0) {
    return durationEventB - durationEventA;
  } else {
    return dayjs(eventA.startDate).diff(dayjs(eventB.startDate));
  }
};

export const sortTaskPrice = (eventA, eventB) => {
  if (eventB.price - eventA.price !== 0) {
    return eventB.price - eventA.price;
  } else {
    return dayjs(eventA.startDate).diff(dayjs(eventB.startDate));
  }
};