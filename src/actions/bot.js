import axios from 'axios';

import {
    SET_BOT,
    BOT_LOADING
} from './types';

export const getBot = () => async dispatch => {
    const { data } = await axios.post('http://localhost:5000/bot/self');

    dispatch(setBot(data));
};

export const setBot = bot => {
    return {
        type: SET_BOT,
        payload: bot,
    };
};

export const setBotLoadiong = () => {
    return {
        type: BOT_LOADING,
    };
};