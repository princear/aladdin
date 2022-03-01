import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../Reducer';

// Connect our store to the reducers
const Store = createStore(reducers, applyMiddleware(thunk));

export default Store;
