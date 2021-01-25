import axios from 'axios';
import Const from '../../constant/Const';
import { Toast } from 'native-base';
import { ToasterNative } from '../../common/ToasterNative';

export const Get_Bank = 'Get_Bank';


export const GetBanks = (lang,) => {

    return async dispatch => {
        await axios({
            method: 'POST',
            url: Const.url + 'banks',
            data: { lang },
        }).then(res => {

            if (res.data.success) {

                dispatch({ type: Get_Bank, data: res.data })

            }
        })
    }
}



export const BankTransfer = (account_name, account_number, image, amount, bank_name, bank_id, subscription_id, token, lang, navigation) => {

    return async dispatch => {
        await axios({
            method: 'POST',
            url: Const.url + 'send-transfer',
            data: { account_name, account_number, image, amount, bank_name, bank_id, subscription_id, lang },
            headers: {
                Authorization: 'Bearer ' + token,


            }
        }).then(res => {
            if (res.data.success) {
                navigation.navigate('SuccessPayment', { amount: amount })
            }

            ToasterNative(res.data.message, res.data.success ? "success" : "danger", 'bottom')

        }).catch(err => {
            ToasterNative(err.message, 'danger', 'bottom')
        })
    }
}

