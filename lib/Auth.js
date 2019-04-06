import auth0 from 'auth0-js';
import {AUTH_CONFIG} from './auth0-variables';
import jwtDecode from 'jwt-decode'
import Cookie from 'js-cookie';
import {redirectTo} from "./helpers";


const getQueryParams = () => {
    const params = {};
    window.location.href.replace(/([^(?|#)=&]+)(=([^&]*))?/g, ($0, $1, $2, $3) => {
        params[$1] = $3
    });
    return params
};

export default class Auth {
    accessToken;
    idToken;

    auth0 = new auth0.WebAuth({
        domain: AUTH_CONFIG.domain,
        clientID: AUTH_CONFIG.clientId,
        redirectUri: AUTH_CONFIG.callbackUrl,
        responseType: 'token id_token',
        scope: 'openid profile email'
    });

    constructor() {
        this.login = this.login.bind(this);
        this.handleAuthentication = this.handleAuthentication.bind(this);
        this.isAuthenticated = this.isAuthenticated.bind(this);
    }

    login() {
        this.auth0.authorize();
    }

    extractInfoFromHash = () => {
        if (process.server) return;
        const {id_token} = getQueryParams();
        return {
            token: id_token,
            user_details: (jwtDecode(id_token))
        }
    };

    getQueryParams = () => {
        const params = {};
        window.location.href.replace(/([^(?|#)=&]+)(=([^&]*))?/g, ($0, $1, $2, $3) => {
            params[$1] = $3
        });
        return params
    }


    handleAuthentication() {
        return new Promise(((resolve, reject) => {
            this.auth0.parseHash((err, authResult) => {
                if (authResult && authResult.accessToken && authResult.idToken) {
                    resolve(authResult);
                } else if (err) {
                    console.error(err);
                    reject(err)
                }
            });
        }));
    }

    isAuthenticated() {
        // Check whether the current time is past the
        // access token's expiry time
        return new Date().getTime() < expiresAt;
    }
}

export const logout = function () {
    Cookie.remove('accessToken');
    window.localStorage.removeItem('accessToken');
    redirectTo('/')
};

export const setToken = (currentValue)  => {
    Cookie.set('accessToken', currentValue);
    window.localStorage.setItem('accessToken', currentValue);
    return true;
};

