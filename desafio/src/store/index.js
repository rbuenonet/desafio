import { createStore, combineReducers } from 'redux';

import login from './login'
import data from './data'

const reducers = {
    login,
    data
};

const store = createStore(combineReducers(reducers), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
export default store;