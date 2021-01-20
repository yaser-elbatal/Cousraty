import React, { useState } from 'react'
import { HeaderAuth } from '../../common/HeaderAuth'
import { View, StyleSheet, Text } from 'react-native';

import { InputIcon } from '../../common/InputText'
import { Colors } from '../../constant/Colors';
import BTN from '../../common/LoginBtn';
import i18n from '../../../Local/i18n'
import { validatePhone } from '../../common/Validation';
import { Toaster } from '../../common/Toaster';
import { useDispatch, useSelector } from 'react-redux';
import Containers from '../../common/Loader';
import { CheckPhone, checkPhone } from '../../store/action/AuthAction';
import { Toast } from 'native-base';

function ForgetPass({ navigation }) {

    const [Phone, setPhone] = useState('');
    const [spinner, setspinner] = useState(false)

    const dispatch = useDispatch()
    const lang = useSelector(state => state.lang.language);

    const _validate = () => {
        let PhoneErr = validatePhone(Phone);
        return PhoneErr;
    };


    const SubmitPhoneNum = () => {
        let val = _validate()
        if (!val) {
            setspinner(true)
            dispatch(checkPhone(Phone, lang, navigation)).then(() => setspinner(false)).catch((err) => {
                setspinner(false)
                Toaster(err);

            })

        }
        else {
            Toaster(_validate());
        }
    }

    return (
        <HeaderAuth Icon onPress={() => navigation.goBack()}>
            <View style={styles.Wrap}>

                <Text style={styles.TLogin}>{i18n.t('RecoverPass')}</Text>

                <InputIcon
                    placeholder={i18n.t('phone')}
                    keyboardType='numeric'
                    styleCont={{ marginTop: 20 }}
                    onChangeText={(e) => setPhone(e)}
                    value={Phone}

                />
                <Containers loading={spinner}>
                    <BTN title={i18n.t('send')} onPress={SubmitPhoneNum} ContainerStyle={{ marginTop: 0 }} />

                </Containers>

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

export default ForgetPass
