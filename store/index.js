import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import reducer from './reducers'
// import { persistStore, persistReducer } from 'redux-persist'
// import storage from 'redux-persist/lib/storage' // defaults to localStorage for web and AsyncStorage for react-native


let initialState = {

};

//
// const persistConfig = {
//     key: 'root',
//     storage,
// };

// const persistedReducer = persistReducer(persistConfig, reducer)



export const initStore = (initData) => {
    return createStore(
        reducer, // Or we can use "persistedReducer"
        initData,
        composeWithDevTools(applyMiddleware(thunkMiddleware))
    )
};

export default initStore
