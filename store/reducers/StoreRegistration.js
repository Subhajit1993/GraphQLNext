let defaultState = {
    store_name: 'Store Name',
    reg_no: '12345',
    reg_year: '2015',
    owner_name: 'Owner Name',
    owner_phone: '8994949494',
    owner_email: 'ajay@gmail.com',
    store_type: [],
    ownership: 'owner',
    uploaded_files: [],
    uploaded_logo_url: '',
    store_land_line_number:'',
    store_phone_number:'',
    store_website:'',
    store_email_id:'',
    Location:{
        lat:-33.8617374,
        lng:151.2021291
    }
};

export default function Auth(state = defaultState, actions) {
    switch (actions.type) {
        case 'SET_BOOK_STORE_FIELDS':
            return {
                ...state,
                [actions.payload.input_key]: actions.payload.input_value
            };
        case 'SET_UPLOADED_IMAGE_FILES':
            return {
                ...state,
                uploaded_files: actions.payload.files
            };
        case 'SET_UPLOADED_LOGO_URL':
            return {
                ...state,
                uploaded_logo_url: actions.payload.url
            };
        case 'SET_LAT_LNG':
            let latLng = {
                lat:actions.payload.lat,
                lng:actions.payload.lng,
            }
            return {
                ...state,
                location: latLng
            };
        default:
            return state
    }
};
