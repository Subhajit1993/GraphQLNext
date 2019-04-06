export const setStoreRegFields = (input_key, input_value) => (dispatch, getState) => {// if (name === 'ownership') {
    if (input_key === 'ownership') {
        if (input_value === 'owner') {
            dispatch({
                type:'SET_BOOK_STORE_FIELDS',
                payload:{
                    input_key:'owner_email',
                    input_value:getState().Auth.user_details.Email
                }
            })
            dispatch({
                type:'SET_BOOK_STORE_FIELDS',
                payload:{
                    input_key:'owner_name',
                    input_value:getState().Auth.user_details.Name
                }
            })
        }
        else {
            dispatch({
                type:'SET_BOOK_STORE_FIELDS',
                payload:{
                    input_key:'owner_email',
                    input_value:''
                }
            })
            dispatch({
                type:'SET_BOOK_STORE_FIELDS',
                payload:{
                    input_key:'owner_name',
                    input_value:''
                }
            })
        }



    }
    dispatch({
        type:'SET_BOOK_STORE_FIELDS',
        payload:{
            input_key,
            input_value
        }
    })

};
