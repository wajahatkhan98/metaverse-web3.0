const getStorageItem = (key) => {
    const data = localStorage.getItem(key);
    console.log('getStorageItem', data);
    return data;
};


const saveStorageItem = (key, value) => {
    const data = localStorage.setItem(key, JSON.stringify(value));
    console.log('saveStorageItem', data);
    return data;
}

export {getStorageItem, saveStorageItem}
export default class localStorage {
}