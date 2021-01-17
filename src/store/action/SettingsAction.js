import axios from 'axios';
import Const from '../../constant/Const';
import { ToasterNative } from '../../common/ToasterNative';

export const Get_notifications_statue = 'Get_notifications_statue';



export const GetNotificationsStatue = (lang, token) => {

    return async dispatch => {
        await axios({
            method: 'POST',
            url: Const.url + 'change-notify-statue',
            data: { lang },
            headers: {
                Authorization: 'Bearer ' + token,

            },
        }).then(res => {
            ToasterNative(res.data.message, res.data.success ? "success" : "danger", 'bottom')

        })
    }
}



export const ChangePasswords = (old_password, current_password, lang, token) => {

    return async dispatch => {
        await axios({
            method: 'POST',
            url: Const.url + 'edit-password',
            data: { old_password, current_password, lang },
            headers: {
                Authorization: 'Bearer ' + token,

            },
        }).then(res => {
            ToasterNative(res.data.message, res.data.success ? "success" : "danger", 'bottom')

        })
    }
}