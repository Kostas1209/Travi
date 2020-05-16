import { createStore, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from "./rootReducer";
import { AsyncStorage } from "react-native";
import { persistStore, persistReducer } from 'redux-persist';

const persistConfig = {
    // Root
    key: 'root',
    // Storage Method (React Native)
    storage: AsyncStorage,
    // Whitelist (Save Specific Reducers)
    whitelist: [
      'user',
      'travelling',
      'neededThings'
    ],
    // Blacklist (Don't Save Specific Reducers)
    blacklist: [
      'counterReducer',
    ],
};


const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer,composeWithDevTools(applyMiddleware(thunk)) )
let persistor = persistStore(store);

export {
    store,
    persistor
}