import {combineReducers} from "redux";

let defaultState = {
    mobileDrawerIsOpen: false,
    snackBarOpen: false,
    snackBarText: null,
    snackBarColor: 'success',
};

function DrawerState(state = defaultState, actions) {
    switch (actions.type) {
        case 'SET_MOBILE_DRAWER':
            return {
                ...state,
                mobileDrawerIsOpen: actions.payload
            };
        default:
            return state
    }
}

function Main (state = defaultState, actions) {
    switch (actions.type) {
        case 'SNACKBAR':
            return {
                ...state,
                snackBarOpen: actions.payload.snackBarOpen,
                snackBarText:actions.payload.snackBarText,
                snackBarColor:actions.payload.snackBarColor,
            };
        default:
            return state
    }
}


const mainReducer = combineReducers({
    DrawerState,
    Main
});

export default mainReducer