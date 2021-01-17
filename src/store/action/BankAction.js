import axios from 'axios';
import Const from '../../constant/Const';
import { Toast } from 'native-base';

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

