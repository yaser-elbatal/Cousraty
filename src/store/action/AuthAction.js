import axios from 'axios';
import { AsyncStorage, } from 'react-native';
import { Toast } from 'native-base'
import i18n from "../../../Local/i18n";
import Const from '../../constant/Const';

export const Sign_up = 'Sign_up';
export const Sign_In = 'Sign_In';
export const Activate_Code = 'Activate_Code'
export const login_failed = 'login_failed'
export const login_success = 'login_success'
export const logout = 'logout'

export const SignIn = (phone, password, device_id, device_type, lang, navigation) => {

    return async (dispatch) => {

        await axios({
            method: 'POST',
            url: Const.url + 'sign-in',
            data: { phone, password, device_id, device_type, lang },

        }).then(res => {
            handelLogin(dispatch, res.data, navigation)
        }).catch(error => {

            Toast.show({
                text: error + `${i18n.t('Somthing')}`,
                type: "danger",
                duration: 3000,
                textStyle: {
                    color: "white",
                    fontFamily: 'FairuzBold',
                    textAlign: 'center'
                }
            })
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

        Toast.show({
            text: error.message,
            type: "danger",
            duration: 3000,
            textStyle: {
                color: "white",
                fontFamily: 'FairuzBold',
                textAlign: 'center'
            }
        });

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
                    lang: data.lang
                },
            }).then(response => {
                dispatch({ type: Sign_up, payload: response.data });
                if (response.data.success) {
                    navigation.navigate('CodeActivation', {
                        token: response.data.data.token,
                        code: response.data.data.code
                    });
                }


                Toast.show({
                    text: response.data.message,
                    type: response.data.success ? "success" : "danger",
                    duration: 3000,
                    textStyle: {
                        color: "white",
                        fontFamily: 'FairuzBold',
                        textAlign: 'center'
                    }
                });

            }).catch((err) => {


                Toast.show({
                    text: err + `${i18n.t('Somthing')}`,
                    type: "danger",
                    duration: 3000,
                    textStyle: {
                        color: "white",
                        fontFamily: 'FairuzBold',
                        textAlign: 'center'
                    }
                });
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
        }
        )


    }

}


// export const CheckPhone = (lang, phone, navigation) => {
//     return async dispatch => {
//         await axios({
//             method: 'POST',
//             url: Const.url + 'forget-password',
//             data: { lang, phone }
//         }).then(res => {
//             if (res.data.success) {

//                 navigation.navigate('NewPassword', {
//                     token: res.data.data.token,
//                     code: res.data.data.code
//                 })

//             }
//             Toast.show({
//                 text: res.data.message,
//                 type: res.data.success ? "success" : "danger",
//                 duration: 3000,
//                 textStyle: {
//                     color: "white",
//                     fontFamily: 'FairuzBold',
//                     textAlign: 'center'
//                 }
//             });

//         })

//     }
// }

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

            Toast.show({
                text: response.data.message,
                type: response.data.success ? "success" : "danger",
                duration: 3000,
                textStyle: {
                    color: "white",
                    fontFamily: 'FairuzBold',
                    textAlign: 'center'
                }
            });

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
                navigation.navigate('Login')
                Toast.show({
                    text: res.data.message,
                    type: res.data.success ? "success" : "danger",
                    duration: 3000,
                    textStyle: {
                        color: "white",
                        fontFamily: 'FairuzBold',
                        textAlign: 'center'
                    }
                });
            }
            else {
                Toast.show({
                    text: res.data.message,
                    type: res.data.success ? "success" : "danger",
                    duration: 3000,
                    textStyle: {
                        color: "white",
                        fontFamily: 'FairuzBold',
                        textAlign: 'center'
                    }
                });
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
