import {combineReducers} from 'redux';
import Auth from './Auth'
import Common from './Common'
import StoreReg from './StoreRegistration'

const mainReducer  = combineReducers({
    Auth,
    Common,
    StoreReg
});

export default mainReducer;