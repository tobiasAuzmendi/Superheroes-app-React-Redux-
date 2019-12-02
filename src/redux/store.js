import { combineReducers, createStore } from 'redux';
import heroesList from './reducers/heroesList';
import selectedHero from './reducers/selectHero';

const reducer = combineReducers({
    heroesList,
    selectedHero
});

const store = createStore(reducer);

export default store;