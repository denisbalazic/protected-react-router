import {seed} from "./seed";

export const seedLocalStorage = () => {
    localStorage.setItem('DOGS', JSON.stringify(seed.dogs));
}

export const addItemToLocalStorage = (resourceName: string, item: any) => {
    const items = JSON.parse(localStorage.getItem(resourceName) || '[]');
    const updatedItem = {...item, id: items.length + 1};
    const updatedItems = [...items, updatedItem];
    localStorage.setItem(resourceName, JSON.stringify(updatedItems));
}

export const editItemInLocalStorage = (resourceName: string, item: any) => {
    const items = JSON.parse(localStorage.getItem(resourceName) || '[]');
    const updatedItems = items.map((i: any) => i.id === item.id ? item : i);
    localStorage.setItem(resourceName, JSON.stringify(updatedItems));
}

export const getItemsFromLocalStorage = (resourceName: string) => {
    return JSON.parse(localStorage.getItem(resourceName) || '[]');
}

export const getItemFromLocalStorage = (resourceName: string, id: number) => {
    const items = JSON.parse(localStorage.getItem(resourceName) || '[]')
    return items.find((i: any) => i.id === id);
}
