import { AsyncStorage } from 'react-native';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { persistReducer, persistStore } from 'redux-persist';
import Reactotron from '../../ReactotronConfig.js';
import reducers from '../store/reducer/Index.js';

const persistsConfig = {
    key: 'root',
    storage: AsyncStorage,
    whiltelist: ['lang']
};

const persistedReducer = persistReducer(persistsConfig, reducers);

export const store = createStore(persistedReducer, {}, compose(applyMiddleware(thunk), Reactotron.createEnhancer()));
export const persistedStore = persistStore(store);
