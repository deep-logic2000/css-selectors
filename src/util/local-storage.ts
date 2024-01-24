import { ProgressObjType } from '../types';

const setLocalStorage = (key: string, value: ProgressObjType): void => {
    localStorage.setItem(key, JSON.stringify(value));
};

const getLocalStorage = (key: string) => JSON.parse(localStorage.getItem(key) || '');

export { setLocalStorage, getLocalStorage };
