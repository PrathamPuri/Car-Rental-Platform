import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import {carReducer} from './reducer/carReducer'; 
import { alertReducers } from './reducer/alertsReducers';
import { bookingReducer } from './reducer/bookingReducer';

const rootReducer = combineReducers({
    cars: carReducer,
    alertReducers,
    bookingReducer
    
});


const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(thunk),
    devTools: process.env.NODE_ENV !== 'production',
});

export default store;
