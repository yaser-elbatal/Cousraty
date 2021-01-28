import React, { useState, useEffect, useContext, useRef } from 'react'
import { HeaderAuth } from '../../common/HeaderAuth'
import { View, Text, StyleSheet, AsyncStorage, Alert, Platform } from 'react-native'
import { Colors } from '../../constant/Colors'
import { InputIcon } from '../../common/InputText'
import i18n from '../../../Local/i18n'
import { SText } from '../../common/SText'
import BTN from '../../common/LoginBtn'
import { validatePassword, validateEmail, validatePhone } from '../../common/Validation'
import { Toaster } from '../../common/Toaster'
import Constants from 'expo-constants';

import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import Containers from '../../common/Loader'
import { useDispatch, useSelector } from 'react-redux'
import { SignIn } from '../../store/action/AuthAction'

function Login({ navigation }) {

    const [password, setPassword] = useState('');
    const [phone, setphone] = useState('')
    const [spinner, setspinner] = useState(false)
    const [deviceType, setdeviceType] = useState('')
    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();
    const dispatch = useDispatch()
    const lang = useSelector(state => state.lang.language);


    // const getDeviceId = async () => {
    //     const { status: existingStatus } = await Permissions.getAsync(
    //         Permissions.NOTIFICATIONS
    //     );

    //     let finalStatus = existingStatus;

    //     if (existingStatus !== 'granted') {
    //         const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    //         finalStatus = status;
    //     }

    //     if (finalStatus !== 'granted') {
    //         return;
    //     }

    //     const deviceId = await Notifications.getExpoPushTokenAsync();

    //     setDeviceId(deviceId);
    //     setUserId(null);

    //     AsyncStorage.setItem('deviceID', deviceId);
    // };
    // useEffect(() => {
    //     getDeviceId()
    //     setSpinner(false)
    // }, []);



    useEffect(() => {

        Platform.OS === 'android' ?
            setdeviceType('android')
            :
            setdeviceType('ios')

        registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            setNotification(notification);
        });

        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
        });
        registerForPushNotificationsAsync().then(token => AsyncStorage.setItem('deviceID', token));


        return () => {
            Notifications.removeNotificationSubscription(notificationListener);
            Notifications.removeNotificationSubscription(responseListener);
        };
    }, []);

    async function registerForPushNotificationsAsync() {
        let token;
        if (Constants.isDevice) {
            const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
            let finalStatus = existingStatus;
            if (existingStatus !== 'granted') {
                const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
                finalStatus = status;
            }
            if (finalStatus !== 'granted') {

                Alert.alert(
                    //title
                    'Hello',
                    //body
                    'Failed to get push token for push notification!',
                    [
                        // {
                        //     text: 'Yes',
                        //     onPress: () => console.log('Yes Pressed')
                        // },
                        {
                            text: 'ok',
                            onPress: () => console.log('No Pressed'), style: 'cancel'
                        },
                    ],
                    { cancelable: false },
                    //clicking out side of alert will not cancel
                );

                // alert('Failed to get push token for push notification!');
                return;
            }
            token = (await Notifications.getExpoPushTokenAsync()).data;
        } else {
            Alert.alert(
                //title
                'Hello',
                //body
                'Must use physical device for Push Notifications',
                [
                    // {
                    //     text: 'Yes',
                    //     onPress: () => console.log('Yes Pressed')
                    // },
                    {
                        text: 'ok',
                        onPress: () => console.log('No Pressed'), style: 'cancel'
                    },
                ],
                { cancelable: false },
                //clicking out side of alert will not cancel
            );


            // alert('Must use physical device for Push Notifications');
        }

        if (Platform.OS === 'android') {
            Notifications.setNotificationChannelAsync('default', {
                name: 'default',
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: '#FF231F7C',
            });
        }
        AsyncStorage.setItem('deviceID', token);

        return token;
    }

    console.log(expoPushToken);

    const _validate = () => {
        let phoneErr = validatePhone(phone);
        let passwordErr = validatePassword(password);
        return phoneErr || passwordErr;
    };

    const SubmitLogin = async () => {
        let val = _validate()
        if (!val) {
            setspinner(true)
            dispatch(SignIn(phone, password, expoPushToken, deviceType, lang, navigation)).then(() => setspinner(false)).catch(err => {

                setspinner(false)
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


        }
        else {

            Toaster(_validate());

        }
    }



    return (

        <HeaderAuth Icon onPress={() => navigation.goBack()}>

            <View style={styles.Wrap}>

                <Text style={styles.TLogin}>{i18n.t('Login')}</Text>
                <InputIcon
                    placeholder={i18n.t('phone')}
                    onChangeText={(e) => setphone(e)}
                    value={phone}
                    keyboardType='numeric'
                    styleCont={{ marginTop: 20 }}
                />

                <InputIcon
                    placeholder={i18n.t('password')}
                    value={password}
                    onChangeText={(e) => setPassword(e)}
                    secureTextEntry={Platform.OS === 'android' ? password === '' ? false : true : true}
                    styleCont={{ marginTop: 0 }}
                    placeholderStyle={{ fontFamily: 'FairuzBold', }}

                />

                <SText title={i18n.t('forgetPassword')} onPress={() => navigation.navigate('ForgetPass')} />
                <Containers loading={spinner}>
                    <BTN title={i18n.t('entry')} onPress={SubmitLogin} ContainerStyle={{ marginTop: 20 }} />

                </Containers>

                <View style={styles.Centerd}>
                    <SText title={i18n.t('haveAcc')} disabled />
                    <SText title={i18n.t('createAcc')} onPress={() => navigation.navigate('Register')} style={styles.FPass} />
                </View>

            </View>
        </HeaderAuth>
    )
}

export default Login
const styles = StyleSheet.create({
    Wrap: {
        justifyContent: 'center',
        marginTop: 100,
    }
    , TLogin: {
        color: Colors.white,
        marginStart: 30,
        fontSize: 22,
        fontFamily: 'FairuzBold',
        alignSelf: 'flex-start'
    },
    FPass: {
        color: Colors.main,
        fontSize: 16,
        textDecorationLine: 'underline'
    },
    Centerd: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    }
})