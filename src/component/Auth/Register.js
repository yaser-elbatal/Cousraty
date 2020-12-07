import React, { useState } from 'react'
import { HeaderAuth } from '../../common/HeaderAuth'
import i18n from '../../../Local/i18n'
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native'
import { InputIcon } from '../../common/InputText';
import { Colors } from '../../constant/Colors';
import { width } from '../../constant/Dimentions';
import BTN from '../../common/LoginBtn';
import { validateUserName, validateEmail, validatePhone, validateTwoPasswords, validatePassword } from '../../common/Validation';
import { Toaster } from '../../common/Toaster';

function Register({ navigation }) {

    const [name, setName] = useState('');
    const [phone, setPhone] = useState("");
    const [email, setemail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [Location, setLocation] = useState(i18n.t('location'))




    const _validate = () => {
        let nameErr = validateUserName(name);
        let emailErr = validateEmail(email);
        let phoenErr = validatePhone(phone);
        let passwordErr = validatePassword(password);
        let CpasswordErr = validateTwoPasswords(password, confirmPassword);

        return nameErr || emailErr || phoenErr || passwordErr || CpasswordErr
    };
    const SubmitRegister = () => {
        let val = _validate()
        if (!val) {
            navigation.navigate('CodeActivation')
        }
        else {
            Toaster(_validate())
        }
    }

    return (
        <HeaderAuth Icon onPress={() => navigation.goBack()}>

            <View style={styles.Wrap}>
                <Text style={styles.TLogin}>{i18n.t('Register')}</Text>

                <InputIcon
                    placeholder={i18n.t('name')}
                    onChangeText={(e) => setName(e)}
                    value={name}
                    styleCont={{ marginTop: 20 }}

                />

                <InputIcon
                    placeholder={i18n.t('email')}
                    onChangeText={(e) => { setemail(e) }}
                    value={email}
                    keyboardType='email-address'
                    styleCont={{ marginTop: 0 }}
                />

                <InputIcon
                    placeholder={i18n.t('phone')}
                    onChangeText={(e) => { setPhone(e) }}
                    value={phone}
                    keyboardType='numeric'
                    styleCont={{ marginTop: 0 }}
                />

                <TouchableOpacity onPress={() => { }} style={styles.Location}>
                    <Text style={styles.TexLoc}>{Location}</Text>
                    <Image source={require('../../../assets/Images/marker.png')} style={styles.Icon} resizeMode='contain' />
                </TouchableOpacity>

                <InputIcon
                    placeholder={i18n.t('password')}
                    onChangeText={(e) => setPassword(e)}
                    value={password}
                    secureTextEntry
                    styleCont={{ marginTop: 20 }}

                />

                <InputIcon
                    placeholder={i18n.t('confirmPass')}
                    onChangeText={(e) => setConfirmPassword(e)}
                    value={confirmPassword}
                    secureTextEntry

                    styleCont={{ marginTop: 0 }}
                />
                <BTN title={i18n.t('Register')} onPress={SubmitRegister} ContainerStyle={styles.Btn} />

            </View>
        </HeaderAuth>
    )
}


const styles = StyleSheet.create({
    Wrap: {
        justifyContent: 'center',
        marginTop: 30,
    }
    , TLogin: {
        color: Colors.white,
        marginStart: 30,
        fontSize: 22,
        fontFamily: 'FairuzBold',
        alignSelf: 'flex-start'
    },
    Btn:
    {
        marginTop: 0,
        marginVertical: 10
    },
    Location: {
        height: width * .14,
        flexDirection: 'row',
        overflow: 'hidden',
        marginHorizontal: "10%",
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingEnd: 20,
        marginTop: 0
    },
    TexLoc: {
        color: Colors.white,
        fontFamily: 'FairuzBold',
        fontSize: 12,
        marginStart: 15
    },
    Icon: {
        width: 15,
        height: 15
    }
})

export default Register
