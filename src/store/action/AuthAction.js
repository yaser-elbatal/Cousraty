import axios from 'axios';
import { AsyncStorage, } from 'react-native';
import { Toast } from 'native-base'
import i18n from "../../../Local/i18n";
import Const from '../../constant/Const';
import { ToasterNative } from '../../common/ToasterNative';
import { Toaster } from '../../common/Toaster';
import { Colors } from '../../constant/Colors';

export const Sign_up = 'Sign_up';
export const Sign_In = 'Sign_In';
export const Activate_Code = 'Activate_Code'
export const login_failed = 'login_failed'
export const login_success = 'login_success'
export const logout = 'logout'
export const Update_profile = 'Update_profile';




export const SignIn = (phone, password, device_id, device_type, lang, navigation) => {

    return async (dispatch) => {

        await axios({
            method: 'POST',
            url: Const.url + 'sign-in',
            data: { phone, password, device_id, device_type, lang },

        }).then(res => {
            handelLogin(dispatch, res.data, navigation)
        }).catch(error => {

            ToasterNative(error + `${i18n.t('Somthing')}`, "danger", 'bottom')



        })
        dispatch({ type: Sign_In })

    }
}

const handelLogin = (dispatch, data, navigation) => {
    if (!data.success) {
        loginFailed(dispatch, data, navigation)
    } else {
        loginSuccess(dispatch, data, navigation)
    }


};


const loginSuccess = (dispatch, data, navigation) => {
    console.log(data.data.active);

    if (data.data.active) {

        AsyncStorage.setItem('token', JSON.stringify(data.data.token))
            .then(() => dispatch({ type: login_success, data }));
        ToasterNative(data.message, "success", 'bottom')


    }
    else {
        navigation.navigate('CodeActivation', { token: data.data.token, code: data.data.code })

    }

};

const loginFailed = (dispatch, error, navigation) => {
    if (!(error.success)) {
        //     navigation.navigate('ActivateCode', {
        //         token: error.data.token,

        //     });
        // }

        dispatch({ type: login_failed, error });


        ToasterNative(error.message, "danger", 'bottom')




    }
};


export const Getregister = (data, navigation) => {
    return async (dispatch) => {
        await AsyncStorage.getItem('deviceID').then(async device_id => {
            await axios({
                url: Const.url + 'sign-up',
                method: 'POST',
                data: {
                    name: data.name,
                    phone: data.phone,
                    email: data.email,
                    latitude: data.latitude,
                    longitude: data.langtiude,
                    password: data.password,
                    device_id,
                    lang: data.lang,
                    address: data.Locations
                },
            }).then(response => {
                dispatch({ type: Sign_up, payload: response.data });
                if (response.data.success) {
                    navigation.navigate('CodeActivation', {
                        token: response.data.data.token,
                        code: response.data.data.code
                    });
                }


                ToasterNative(response.data.message, response.data.success ? "success" : "danger", 'bottom')




            }).catch((err) => {

                ToasterNative(`${i18n.t('Somthing')}` + err, "danger", 'bottom')


            })
        })

    }
};



export const ActivationCode = (code, token, lang, navigation) => {
    return async dispatch => {
        await axios({
            method: 'POST',
            url: Const.url + 'activate',
            data: { code },
            params: { lang },
            headers: {
                Authorization: 'Bearer ' + token,

            }

        }
        ).then(res => {
            if (res.data.success) {
                dispatch({ type: Activate_Code, data: res.data })

            }
            ToasterNative(res.data.message, res.data.success ? "success" : "danger", 'bottom')


        }
        )


    }

}

export const ResendActivationCode = (token, lang) => {
    return async dispatch => {
        await axios({
            method: 'POST',
            url: Const.url + 'resend-code',
            params: { lang },
            headers: {
                Authorization: 'Bearer ' + token,

            }

        }
        ).then(res => {
            if (res.data.success) {

                Toaster(res.data.data.code, Colors.Beeb)

            }
            ToasterNative(res.data.message, res.data.success ? "success" : "danger", 'bottom')



        }
        )


    }

}


export const checkPhone = (phone, lang, navigation) => {
    return async (dispatch) => {
        await axios({
            url: Const.url + 'forget-password',
            method: 'POST',
            data: { phone, lang }
        }).then(response => {
            if (response.data.success) {
                navigation.navigate('NewPassword', { code: response.data.data.code, token: response.data.data.token });

            }
            ToasterNative(response.data.message, response.data.success ? "success" : "danger", 'bottom')



        })
    }
};


export const ResetPassword = (password, token, navigation) => {
    return async dispatch => {
        await axios({
            method: 'POST',
            url: Const.url + 'reset-password',
            data: { password },
            headers: {
                Authorization: 'Bearer ' + token,

            }
        }).then(res => {
            if (res.data.success) {
                navigation.navigate('Login');

                ToasterNative(res.data.message, res.data.success ? "success" : "danger", 'bottom')

            }
            else {

                ToasterNative(res.data.message, res.data.success ? "success" : "danger", 'bottom')


            }
        })
    }
}


export const Logout = (token) => {


    return async dispatch => {
        await AsyncStorage.getItem('deviceID').then(deviceId => {

            axios({
                method: 'POST',
                url: Const.url + 'logout',
                data: { device_id: deviceId },
                headers: {
                    Authorization: 'Bearer ' + token,

                }
            }).then(res => {
                dispatch({ type: logout })


            })
        })

    }
}



export const updateProfile = (name, phone, email, avatar, latitude, longitude, address, lang, token) => {
    return async (dispatch) => {
        await axios({
            url: Const.url + 'update-profile',
            method: 'POST',
            data: { name, phone, email, avatar, latitude, longitude, address, lang, },
            headers: {
                Authorization: 'Bearer ' + token,

            }
        }).then(response => {
            if (response.data.success) {
                dispatch({ type: Update_profile, data: response.data })
            }

            ToasterNative(response.data.message, response.data.success ? "success" : "danger", 'bottom')




        })
    }
};
