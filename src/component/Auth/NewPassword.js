import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native'

import { HeaderAuth } from '../../common/HeaderAuth'
import { Colors } from '../../constant/Colors'
import { InputIcon } from '../../common/InputText';
import BTN from '../../common/LoginBtn';
import i18n from '../../../Local/i18n'
import { validatePassword, validateTwoPasswords, validateCode } from '../../common/Validation';
import { Toaster } from '../../common/Toaster';

function NewPassword({ navigation }) {

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [code, setCode] = useState('');


    const _validate = () => {
        let CodeErr = validateCode(code);
        let passwordErr = validatePassword(password);
        let CpasswordErr = validateTwoPasswords(password, confirmPassword);

        return CodeErr || passwordErr || CpasswordErr
    };

    const SubmitPhoneNum = () => {
        let val = _validate()
        if (!val) {
            navigation.navigate('Login')
        }
        else {

            Toaster(_validate());

        }
    }

    return (
        <HeaderAuth Icon onPress={() => navigation.goBack()}>
            <View style={styles.Wrap}>
                <Text style={styles.TLogin}>{i18n.t('NewPass')}</Text>

                <InputIcon
                    placeholder={i18n.t('code')}
                    onChangeText={(e) => setCode(e)}
                    value={code}
                    styleCont={{ marginTop: 20 }}
                    keyboardType='numeric'
                />

                <InputIcon
                    placeholder={i18n.t('password')}
                    onChangeText={(e) => setPassword(e)}
                    value={password}
                    secureTextEntry
                    styleCont={{ marginTop: 0 }}
                />
                <InputIcon
                    placeholder={i18n.t('confirmPass')}
                    onChangeText={(e) => setConfirmPassword(e)}
                    value={confirmPassword}
                    secureTextEntry
                    styleCont={{ marginTop: 0 }}
                />
                <BTN title={i18n.t('confirm')} onPress={SubmitPhoneNum} ContainerStyle={{ marginTop: 0 }} />

            </View>
        </HeaderAuth>
    )
}


const styles = StyleSheet.create({
    Wrap: {
        justifyContent: 'center',
        marginTop: 100,
    },
    TLogin: {
        color: Colors.white,
        marginStart: 30,
        fontSize: 22,
        fontFamily: 'FairuzBold',
        alignSelf: 'flex-start'
    }
})

export default NewPassword
