export const setUserDetails = (value) => dispatch => {
   return dispatch({
        type:'SET_USER_DETAILS',
        payload:value
    })
};
