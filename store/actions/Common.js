export const toogleDrawerMobile = () => (dispatch, getState) => {
    let currentDrawerState = getState().Common.DrawerState.mobileDrawerIsOpen
    return dispatch({
        type:'SET_MOBILE_DRAWER',
        payload:!currentDrawerState
    })
};


export const setSnackBar = (msg, color, open) => (dispatch, getState) => {
    return dispatch({
        type:'SNACKBAR',
        payload:{msg, color, open}
    })
};