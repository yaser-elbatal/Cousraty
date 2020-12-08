import React, { useState, useEffect, useContext } from 'react'
import { HeaderAuth } from '../../common/HeaderAuth'
import { View, Text, StyleSheet, AsyncStorage } from 'react-native'
import { Colors } from '../../constant/Colors'
import { InputIcon } from '../../common/InputText'
import i18n from '../../../Local/i18n'
import { SText } from '../../common/SText'
import BTN from '../../common/LoginBtn'
import { validatePassword, validateEmail } from '../../common/Validation'
import { Toaster } from '../../common/Toaster'
import { UserContext } from '../../routes'

function Login({ navigation }) {

    const [password, setPassword] = useState('');
    const [email, setemail] = useState('')

    const { setLogin, setLogout } = useContext(UserContext);


    const _validate = () => {
        let emailErr = validateEmail(email);
        let passwordErr = validatePassword(password);
        return emailErr || passwordErr;
    };

    const SubmitLogin = async () => {
        let val = _validate()
        if (!val) {
            setLogin()

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
                    placeholder={i18n.t('email')}
                    onChangeText={(e) => setemail(e)}
                    value={email}
                    keyboardType='email-address'
                    styleCont={{ marginTop: 20 }}
                />

                <InputIcon
                    placeholder={i18n.t('password')}
                    value={password}
                    onChangeText={(e) => setPassword(e)}
                    styleCont={{ marginTop: 0 }}
                    secureTextEntry={true}
                />

                <SText title={i18n.t('forgetPassword')} onPress={() => navigation.navigate('ForgetPass')} />
                <BTN title={i18n.t('entry')} onPress={SubmitLogin} ContainerStyle={{ marginTop: 20 }} />

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