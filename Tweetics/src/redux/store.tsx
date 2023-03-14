import {legacy_createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/root';

const middleware = applyMiddleware(thunk);
const store = legacy_createStore(rootReducer, middleware);
export default store;
