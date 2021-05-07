import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';
import setAuthToken from '../util/setAuthToken';

import {
    SET_CURRENT_USER,
    USER_LOADING
} from './types';

export const loginUser = () => dispatch => {
    const user = Cookies.get('discord-user');
    if(!user) {
        window.location.assign(`http://localhost:5000/discord`);
    } else {
        setAuthToken(user);
        const decoded = jwt_decode(user);

        dispatch(setCurrentUser(decoded));
    }
};

export const logoutUser = () => dispatch => {
    Cookies.remove('discord-user');
    setAuthToken(false);
    dispatch(setCurrentUser({}));
};

export const setCurrentUser = user => {
    return {
        type: SET_CURRENT_USER,
        payload: user,
    };
};

export const setUserLoading = () => {
    return {
        type: USER_LOADING,
    };
};