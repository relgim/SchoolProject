import {createContext} from 'react';

export const SearchContext = createContext({
    animeData: [],
    singleData: {},
    savedData: [],
    editData: {},
    list: {},
    deleteList: () => {},
    setL: () => {},
    setDelete: () => {},
    setEdit: () => {},
    search: () => {},
    setData: () => {},
    setSingle: () => {},
    setSaved: () => {},
});