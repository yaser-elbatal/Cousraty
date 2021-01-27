import React, { useState } from 'react'
import { HeaderAuth } from '../../common/HeaderAuth'
import { View, Text, StyleSheet } from 'react-native'
import i18n from '../../../Local/i18n'
import { Colors } from '../../constant/Colors'
import BTN from '../../common/LoginBtn'
import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import { validateCode } from '../../common/Validation'
import { Toast } from 'native-base'
import { useDispatch, useSelector } from 'react-redux'
import { ActivationCode, ResendActivationCode } from '../../store/action/AuthAction'
import Containers from '../../common/Loader'
import { Toaster } from '../../common/Toaster'


const CELL_COUNT = 4;

function CodeActivation({ navigation, route }) {

    const [value, setValue] = useState('');
    const dispatch = useDispatch();
    const lang = useSelector(state => state.lang.language);
    const [spinner, setspinner] = useState(false)
    const [loading, setLoading] = useState(false)



    const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });

    const { code, token } = route.params
    console.log(code);
    const _validate = () => {
        let CodeErr = value != code ? i18n.t('codeErre') : null
        return CodeErr
    }

    const SubmitPhoneNum = () => {
        let val = _validate()
        if (!val) {
            setspinner(true)
            dispatch(ActivationCode(value, token, lang, navigation)).then(() => setspinner(false))
        }
        else {
            Toaster(_validate())


        }
    }

    const ResendCodeToActivate = () => {
        setLoading(true)
        dispatch(ResendActivationCode(token, lang,)).then(() => setLoading(false))
    }

    return (
        <HeaderAuth Icon onPress={() => navigation.goBack()}>
            <View style={styles.Wrap}>

                <Text style={styles.TLogin}>{i18n.t('CodeActive')}</Text>
                <CodeField
                    ref={ref}
                    {...props}
                    value={value}
                    onChangeText={setValue}
                    cellCount={CELL_COUNT}
                    rootStyle={styles.codeFieldRoot}
                    keyboardType="number-pad"
                    textContentType="oneTimeCode"
                    renderCell={({ index, symbol, isFocused }) => (
                        <Text
                            key={index}
                            style={[styles.cell, isFocused && styles.focusCell]}
                            onLayout={getCellOnLayoutHandler(index)}>
                            {symbol || (isFocused ? <Cursor /> : null)}
                        </Text>
                    )}
                />
                <Containers loading={spinner}>

                    <BTN title={i18n.t('confirm')} onPress={SubmitPhoneNum} ContainerStyle={{ marginTop: 20 }} />
                </Containers>


                <Containers loading={loading}>

                    <BTN title={i18n.t('resendCode')} onPress={ResendCodeToActivate} ContainerStyle={{ marginTop: 20, backgroundColor: Colors.secondary, }} />
                </Containers>
            </View>
        </HeaderAuth>
    )
}


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
    root: {
        flex: 1,
        padding: 20
    },
    title: {
        textAlign: 'center',
        fontSize: 30
    },
    codeFieldRoot: { marginTop: 20, marginHorizontal: '11%' },
    cell: {
        width: 50,
        height: 50,
        lineHeight: 38,
        fontSize: 24,
        borderWidth: 1,
        borderColor: Colors.main,
        textAlign: 'center',
        borderRadius: 10,
        padding: 5,
        color: Colors.white
    },
    focusCell: {
        borderColor: Colors.main,
    },
});


export default CodeActivation
