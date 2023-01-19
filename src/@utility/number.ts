import _ from 'lodash';

const addComma = (num: number | undefined) => {
  if (_.isUndefined(num)) return num;
  return num.toLocaleString();
};

const cutOff__10000 = (num: number | undefined) => {
  if (_.isUndefined(num)) return num;
  return num / 10000;
};

const randomNumber__1__6 = () => {
  const num = Number(Math.random().toString(6).slice(0, 3)) * 10;

  return num === 0 ? 1 : num;
};
export {addComma, cutOff__10000, randomNumber__1__6};
