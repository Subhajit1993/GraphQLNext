import constants from './constants'

export default function () {
    return{
        UPLOAD_PICS_GET_URL:{
            url:constants.backend_host+'user/upload_file',
            method:'post'
        },
        UPLOAD_STORE_LOGO_GET_URL:{
            url:constants.backend_host+'user/upload_logo_file',
            method:'post'
        }
    }
}