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
