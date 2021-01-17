import axios from 'axios';
import Const from '../../constant/Const';
import { Toast } from 'native-base';

export const Get_notify = 'Get_notify';


export const GetnotificationsApps = (lang, token) => {

    return async dispatch => {
        await axios({
            method: 'POST',
            url: Const.url + 'notifications',
            data: { lang },
            headers: {
                Authorization: 'Bearer ' + token,

            },
        }).then(res => {

            if (res.data.success) {

                dispatch({ type: Get_notify, data: res.data })

            }
        })
    }
}



export const deletNotfications = (lang, token, id) => {

    return async dispatch => {
        await axios({
            method: 'POST',
            url: Const.url + 'delete-notifications',
            data: { lang, id },
            headers: {
                Authorization: 'Bearer ' + token,

            },
        }).then(res => {

            Toast.show({
                text: res.data.message,
                type: res.data.success ? "success" : "danger",
                duration: 3000,
                textStyle: {
                    color: "white",
                    fontFamily: 'FairuzBold',
                    textAlign: 'center'
                }
            })
        })
    }
}