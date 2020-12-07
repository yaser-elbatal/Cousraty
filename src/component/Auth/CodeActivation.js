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
import { Toaster } from '../../common/Toaster'


const CELL_COUNT = 4;

function CodeActivation({ navigation }) {

    const [value, setValue] = useState('');
    const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });
    const _validate = () => {
        let CodeErr = validateCode(value);
        return CodeErr
    }

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

                <BTN title={i18n.t('confirm')} onPress={SubmitPhoneNum} ContainerStyle={{ marginTop: 20 }} />

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
