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

import { useDispatch, useSelector } from 'react-redux'
import { ActivationCode, ResendActivationCode } from '../../store/action/AuthAction'
import Containers from '../../common/Loader'
import { Toaster } from '../../common/Toaster'
import CountDown from 'react-native-countdown-component';


const CELL_COUNT = 4;

function CodeActivation({ navigation, route }) {

    const [value, setValue] = useState('');
    const dispatch = useDispatch();
    const lang = useSelector(state => state.lang.language);
    const [spinner, setspinner] = useState(false)
    const [loading, setLoading] = useState(false)
    const [showCounter, setShowCounter] = useState(true);
    const [counterID, setCounterID] = useState(1);


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
        dispatch(ResendActivationCode(token, lang,)).then(() => { setShowCounter(true); setCounterID(counterID + 1); })
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
                {
                    showCounter ?
                        <>
                            <Text style={styles.Text}>{i18n.t("sentCode")}</Text>
                            <CountDown
                                id={counterID}
                                until={60 * 2}
                                size={20}
                                onFinish={() => { setShowCounter(false); }}
                                digitStyle={{ backgroundColor: '#FFF' }}
                                digitTxtStyle={{ color: Colors.sky }}
                                timeLabelStyle={{ color: 'red', fontWeight: 'bold' }}
                                separatorStyle={{ color: Colors.sky }}
                                timeToShow={['M', 'S']}
                                timeLabels={{ m: null, s: null }}
                                showSeparator={true}
                                style={{ flexDirection: 'row-reverse', justifyContent: 'center' }}
                            />
                        </> :


                        <BTN title={i18n.t('resendCode')} onPress={ResendCodeToActivate} ContainerStyle={{ marginTop: 20, backgroundColor: Colors.secondary, }} />
                }
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
