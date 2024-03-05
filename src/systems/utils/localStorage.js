const getItem = (key, defaultValue) => JSON.parse(localStorage.getItem(key)) ?? defaultValue;

const setItem = (key, data) => localStorage.setItem(key, JSON.stringify(data));
const removeAt = key => localStorage.removeItem(key);

export default {
  getItem,
  setItem,
  removeAt
};
