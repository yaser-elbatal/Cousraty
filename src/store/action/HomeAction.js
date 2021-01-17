import axios from 'axios';
import Const from '../../constant/Const';

export const get_Plans = 'get_Plans';
export const Get_toutoriales = 'Get_toutoriales';


export const GetPlan = (lang,) => {
    return async dispatch => {
        await axios({
            method: 'POST',
            url: Const.url + 'plans',
            data: { lang },
        }).then(res => {

            if (res.data.success) {

                dispatch({ type: get_Plans, data: res.data })

            }
        })
    }
}

export const GetToutorial = (lang, token, plan_id) => {
    return async dispatch => {
        await axios({
            method: 'POST',
            url: Const.url + 'tutorials',
            data: { lang, plan_id },
            headers: {
                Authorization: 'Bearer ' + token,

            }
        }
        ).then(res => {
            if (res.data.success) {
                dispatch({ type: Get_toutoriales, data: res.data })

            }
        })

    }

}
