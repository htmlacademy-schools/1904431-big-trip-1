import dayjs from 'dayjs';
import {eventLocation} from './event-location';
import {nanoid} from 'nanoid';

const getRandomInt = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const generateDescription = () => {
  const description = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ' +
    'Cras aliquet varius magna, non porta ligula feugiat eget.',
    'Fusce tristique felis at fermentum pharetra.',
    'Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. ' +
    'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
    'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
    'Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. ' +
    'Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.'
  ];

  const randomIndex = getRandomInt(0, description.length - 1);

  return description[randomIndex];
};
const generateEventType = () => {
  const eventType = [
    'Check-in',
    'Sightseeing',
    'Restaurant',
    'Taxi', 
    'Bus', 
    'Train', 
    'Ship',
    'Drive',
    'Flight'
  ];

  const randomIndex = getRandomInt(0, eventType.length - 1);

  return eventType[randomIndex];
};
const generateCities = () => {
  const cities = eventLocation();

  const randomIndex = getRandomInt(0, cities.length - 1);

  return cities[randomIndex];
};
const generateBeginEndDates = () => {
  const maxGap = 14;
  const startDate = dayjs()
    .add(getRandomInt(-maxGap, maxGap), 'day')
    .add(getRandomInt(-maxGap, maxGap), 'hour')
    .add(getRandomInt(-maxGap, maxGap), 'minute');
  const endDate = startDate
    .clone()
    .add(getRandomInt(0, 14), 'day')
    .add(getRandomInt(0, 59), 'hour')
    .add(getRandomInt(0, 59), 'minute');
  return {
    start: startDate.toDate(),
    end: endDate.toDate()
  };
};
const countDuration = (start, end) => {
  const interval = new Date(end - start);

  return {
    days: interval.getUTCDate() - 1,
    hours: interval.getUTCHours(),
    minutes: interval.getUTCMinutes(),
  };

};

const generatePhotos = () => {
  const amountOfPhotos = getRandomInt(1, 5);
  const photos = [];
  for (let i = 0; i < amountOfPhotos; i++){
    photos.push(`http://picsum.photos/248/152?r=${getRandomInt(10, 50)}`);
  }
  return photos;
};

const generatePrice = () => getRandomInt(1, 100) * 10;
const generateOffers = () => {
  const offers = [
    {
      name: 'Add luggage',
      type: 'luggage',
      price: 30,
      isChosen: Boolean(getRandomInt(0,1))
    },
    {
      name: 'Сomfort class',
      type: 'flight',
      price: 100,
      isChosen: Boolean(getRandomInt(0,1))
    },
    {
      name: 'Add meal',
      type: 'meal',
      price: 15,
      isChosen: Boolean(getRandomInt(0,1))
    },
    {
      name: 'Choose seats',
      type: 'flight',
      price: 5,
      isChosen: Boolean(getRandomInt(0,1))
    },
    {
      name: 'Travel by train',
      type: 'train',
      price: 40,
      isChosen: Boolean(getRandomInt(0,1))
    },
    {
      name: 'Rent a car',
      type: 'car',
      price: 200,
      isChosen: Boolean(getRandomInt(0,1))
    },
    {
      name: 'Add breakfast',
      type: 'meal',
      price: 40,
      isChosen: Boolean(getRandomInt(0,1))
    },
    {
      name: 'Lunch in city',
      type: 'meal',
      price: 55,
      isChosen: Boolean(getRandomInt(0,1))
    },
  ];
  let count = getRandomInt(0, 5);
  let len = offers.length;
  const result = new Array(count);
  const taken = new Array(len);
  if (count > len)
  {
    throw new RangeError('getRandom: more elements taken than available');
  }
  while (count--) {
    const x = Math.floor(Math.random() * len);
    result[count] = offers[x in taken ? taken[x] : x];
    taken[x] = --len;
  }
  return result;
};

export const generateTripEvent = () => {
  const dates = generateBeginEndDates();

  return {
    id: nanoid(),
    eventType: generateEventType(),
    location: generateCities(),
    startDate: dates.start,
    endDate: dates.end,
    duration: countDuration(dates.start, dates.end),
    description: generateDescription(),
    photos: generatePhotos(),
    price: generatePrice(),
    offers: generateOffers(),
    isFavorite: Boolean(getRandomInt(0,1)),
    isBeingEdited: false
  };
};