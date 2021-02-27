export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const padLeft = (str, len, padChar = "0") => {
  return str.padStart(len, padChar);
};

export const makeId = (length = 10) => {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

export function formatNumber(num = 0) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}

export function currencyFormat(num, defaultValue = 0) {
  if (!num) return defaultValue;
  const val = typeof num === "string" ? Number(num) : num;
  return val.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}

export const groupBy = (list, key) => {
  return list.reduce((rv, item) => {
    (rv[item[key]] = rv[item[key]] || []).push(item);
    return rv;
  }, {});
};

export const getCurrentYear = () => {
  const currDate = new Date();
  return currDate.getFullYear();
};

export const integerRangeToArray = (from, to) => {
  const range = [];
  for (let i = from; i <= to; i++) {
    range.push(i);
  }
  return range;
};

export const getUrlParameter = (location, key) => {
  const params = new URLSearchParams(location.search);
  return params.get(key);
};

export const getDuration = (from, to, unit = "d") => {
  if (!from) return "";
  const start = from ? dayjs(from) : dayjs(new Date());
  const end = to ? dayjs(to) : dayjs(new Date());
  return end.diff(start, unit);
};


export const dateAdd = (duration, unit = "d") => {
  dayjs().add(duration, unit);
  return dayjs.toISOString();
};

export const formatDate = (dt, pattern = "MMMM D, YYYY") => {
  return dayjs(dt).format(pattern);
};

export const isDateBefore = (dt, refDate) => {
  return dayjs(dt).isBefore(refDate);
};

export const isDateAfter = (dt, refDate) => {
  if (refDate) {
    return dayjs(dt).isAfter(refDate);
  }
  return dayjs(dayjs(dt)).isAfter();
};

export const randomInt = (len = 6) => {
  return Math.floor(Math.random() * len) + 1;
};