import { legacy_createStore as createStore } from 'redux';
import rootReducer from './Reducer/index'

const Store = createStore(rootReducer)

export default Store;