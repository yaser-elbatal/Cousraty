import axios from 'axios';
import Const from '../../constant/Const';

export const Get_subscriptions = 'Get_subscriptions';


export const GetSubscriptionsPrice = (lang,) => {

    return async dispatch => {
        await axios({
            method: 'POST',
            url: Const.url + 'subscriptions',
            data: { lang },
        }).then(res => {

            if (res.data.success) {

                dispatch({ type: Get_subscriptions, data: res.data })

            }
        })
    }
}