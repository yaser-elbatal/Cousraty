import axios from 'axios';
import Const from '../../constant/Const';
import { ToasterNative } from '../../common/ToasterNative';

export const Get_Terms = 'Get_Terms';
export const Get_About = 'Get_About'
export const Get_Ques = 'Get_Ques';
export const Get_contactus = 'Get_contactus';



export const GetTerms = (lang,) => {

    return async dispatch => {
        await axios({
            method: 'POST',
            url: Const.url + 'terms',
            data: { lang },
        }).then(res => {

            if (res.data.success) {

                dispatch({ type: Get_Terms, data: res.data })

            }
        })
    }
}


export const GetAboutApp = (lang,) => {

    return async dispatch => {
        await axios({
            method: 'POST',
            url: Const.url + 'about-app',
            data: { lang },
        }).then(res => {

            if (res.data.success) {

                dispatch({ type: Get_About, data: res.data })

            }
        })
    }
}

export const GetQuestionApp = (lang,) => {

    return async dispatch => {
        await axios({
            method: 'POST',
            url: Const.url + 'fqs',
            data: { lang },
        }).then(res => {

            if (res.data.success) {

                dispatch({ type: Get_Ques, data: res.data })

            }
        })
    }
}


export const GetContactUS = (lang,) => {

    return async dispatch => {
        await axios({
            method: 'POST',
            url: Const.url + 'contact-us',
            data: { lang },
        }).then(res => {

            if (res.data.success) {

                dispatch({ type: Get_contactus, data: res.data })

            }
        })
    }
}


export const SendComplaiment = (lang, complaint, token) => {

    return async dispatch => {
        await axios({
            method: 'POST',
            url: Const.url + 'send-complaint',
            data: { lang, complaint },
            headers: {
                Authorization: 'Bearer ' + token,

            },
        }).then(res => {
            ToasterNative(res.data.message, res.data.success ? "success" : "danger", 'bottom')

        })
    }
}