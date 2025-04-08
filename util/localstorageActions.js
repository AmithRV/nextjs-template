function saveToLocalStorage(key, value) {
  return new Promise((resolve, reject) => {
    try {
      const data = JSON.stringify(value);
      localStorage.setItem(key, data);
      resolve(`Saved "${key}" to localStorage`);
    } catch (error) {
      reject(`Failed to save "${key}" to localStorage: ${error}`);
    }
  });
}

function getFromLocalStorage(key) {
  return new Promise((resolve, reject) => {
    try {
      const item = localStorage.getItem(key);
      if (item === null) {
        reject(`No data found for key "${key}"`);
      } else {
        const parsed = JSON.parse(item);
        resolve(parsed);
      }
    } catch (error) {
      reject(`Failed to read "${key}" from localStorage: ${error}`);
    }
  });
}

export { saveToLocalStorage, getFromLocalStorage };
