import React, { useState, useEffect } from 'react'
import { View, Text, Image, StyleSheet, I18nManager, TouchableOpacity, Switch, Platform, KeyboardAvoidingView, Modal, AsyncStorage, ScrollView } from 'react-native'
import { Content, Container } from 'native-base';
import { useSelector, useDispatch } from 'react-redux'

import { Colors } from '../../constant/Colors'
import i18n from '../../../Local/i18n'
import { height, width } from '../../constant/Dimentions'
import { changeLanguage } from '../../store/action/LangAction'
import BTN from '../../common/LoginBtn'
import { InputApp } from '../../common/InputApp'
import { GetNotificationsStatue, ChangePasswords } from '../../store/action/SettingsAction';
import Containers from '../../common/Loader';
import { validatePassword, validateTwoPasswords } from '../../common/Validation';
import { ToasterNative } from '../../common/ToasterNative';



function Settings({ navigation }) {


    const Language = useSelector(state => state.lang.language)
    const dispatch = useDispatch();

    const token = useSelector(state => state.auth.user ? state.auth.user.data ? state.auth.user.data.token : null : null);



    const [Lang, setLang] = useState('');
    const [Direction, setDirection] = useState('');
    const [spinner, setSpinner] = useState(false)
    const [isEnabled, setIsEnabled] = useState(true);

    const toggleSwitch = () => {
        setIsEnabled(previousState => !previousState)
        dispatch(GetNotificationsStatue(Language, token))
    };


    const [modalVisible, setModalVisible] = useState(false);
    const [modalPassword, setModalPasword] = useState(false);


    const [password, setPassword] = useState('');
    const [Newpassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');


    const changeLang = async (lang, direction) => {
        await dispatch(changeLanguage(lang, direction,))


    };

    const _Valdiation = () => {
        let PasswordErr = validatePassword(password);
        let PasswordE = validatePassword(Newpassword);
        let passConfirm = validateTwoPasswords(Newpassword, confirmPassword)

        return PasswordErr || PasswordE || passConfirm
    }


    useEffect(() => {
        AsyncStorage.getItem("lang").then((lang) => {
            setLang(lang)
        })
    }, [])

    const ChangeMyPass = () => {
        let val = _Valdiation()

        if (!val) {
            setSpinner(true)
            dispatch(ChangePasswords(password, Newpassword, Language, token)).then(() => setSpinner(false)).then(() => setModalPasword(false)).then(() => {
                setPassword('')
                setNewPassword('')
                setConfirmPassword('')
            })
        }
        else {
            ToasterNative(_Valdiation(), "danger", 'top')

        }


    }

    return (
        <Container style={{ flex: 1 }}>
            <Image source={require('../../../assets/Images/img_menu.png')} style={styles.ImgBack} />

            <View style={styles.Abs}>
                <View style={styles.clmn}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        {
                            I18nManager.isRTL ?
                                <Image source={require('../../../assets/Images/white_back.png')} style={styles.IconBack} resizeMode='contain' />
                                :
                                <Image source={require('../../../assets/Images/arrow_left.png')} style={styles.IconBack} resizeMode='contain' />

                        }
                    </TouchableOpacity>
                    <Text style={styles.Notify}>{i18n.t('settings')}</Text>
                </View>

                <View style={styles.SCard}>
                    <Image source={require('../../../assets/Images/settings.png')} style={{ width: 190, height: 140 }} resizeMode='contain' />
                    <Text style={styles.SText}>{i18n.t('SettApp')}</Text>
                </View>

                <View style={styles.contents}>
                    <Content >
                        <View style={styles.Line}></View>

                        <TouchableOpacity style={styles.Wrap} onPress={() => setModalVisible(true)}>
                            <Text style={{ fontFamily: 'FairuzBold' }}>{i18n.t('lang')}</Text>
                            {
                                I18nManager.isRTL ?
                                    <Image source={require('../../../assets/Images/left_arrow.png')} style={styles.arrow} resizeMode='contain' />
                                    :
                                    <Image source={require('../../../assets/Images/gray_right_arrow.png')} style={styles.arrow} resizeMode='contain' />

                            }
                        </TouchableOpacity>

                        <View style={styles.breakLine}></View>

                        <TouchableOpacity style={styles.Wrap} onPress={() => setModalPasword(true)}>
                            <Text style={{ fontFamily: 'FairuzBold' }}>{i18n.t('changePass')}</Text>
                            {
                                I18nManager.isRTL ?
                                    <Image source={require('../../../assets/Images/left_arrow.png')} style={styles.arrow} resizeMode='contain' />
                                    :
                                    <Image source={require('../../../assets/Images/gray_right_arrow.png')} style={styles.arrow} resizeMode='contain' />

                            }
                        </TouchableOpacity>

                        <View style={styles.BLine}></View>

                        <TouchableOpacity style={styles.Wrap} onPress={toggleSwitch} >
                            <Text style={{ fontFamily: 'FairuzBold' }}>{i18n.t('notification')}</Text>
                            <Switch
                                trackColor={{ false: "#767577", true: Colors.main }}
                                thumbColor={isEnabled ? Colors.white : "#f4f3f4"}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={toggleSwitch}
                                value={isEnabled}
                            />
                        </TouchableOpacity>


                        <View style={styles.centeredView}>
                            <Modal
                                animationType="slide"
                                transparent={true}
                                visible={modalVisible} >

                                <TouchableOpacity style={[styles.centeredView, {}]} onPress={() => setModalVisible(false)}>
                                    <View style={styles.modalView}>
                                        <View style={styles.Line}></View>

                                        <TouchableOpacity onPress={() => { setLang('ar'), setDirection('RTL'); }} style={[styles.oPress, { borderStyle: Lang === 'ar' ? 'solid' : 'dotted', borderColor: Lang === 'ar' ? Colors.main : 'black', borderWidth: .7 }]}>
                                            <Text style={styles.Language}>{i18n.t('arab')}</Text>
                                            {
                                                Lang === 'ar' ?
                                                    <Image source={require('../../../assets/Images/right.png')} style={styles.Img} resizeMode='contain' />
                                                    : null
                                            }
                                        </TouchableOpacity>

                                        <TouchableOpacity onPress={() => { setLang('en'), setDirection('LTR'); }} style={[styles.oPress, { borderStyle: Lang === 'en' ? 'solid' : 'dotted', borderColor: Lang === 'en' ? Colors.main : 'black', borderWidth: .7 }]}>

                                            <Text style={styles.Language}>English</Text>
                                            {
                                                Lang === 'en' ?
                                                    <Image source={require('../../../assets/Images/right.png')} style={styles.Img} resizeMode='contain' />
                                                    : null
                                            }
                                        </TouchableOpacity>

                                        <BTN title={i18n.t('confirm')} onPress={() => changeLang(Lang, Direction)} />

                                    </View>

                                </TouchableOpacity>
                            </Modal>
                        </View>




                        <View style={[styles.centeredView, {
                            backgroundColor: '',
                            opacity: Platform.OS === 'ios' ? 1 : 1,
                        }]}>
                            <Modal
                                animationType="slide"
                                transparent={true}
                                visible={modalPassword} >

                                <TouchableOpacity style={[styles.centeredView, {
                                    backgroundColor: '',
                                    opacity: Platform.OS === 'ios' ? 1 : 1,
                                }]} onPress={() => setModalPasword(false)}>
                                    <View style={[styles.modalView, { height: height * .6, }]}>
                                        <ScrollView style={styles.Scroll} showsVerticalScrollIndicator={false}>
                                            <View style={styles.Line}></View>
                                            <KeyboardAvoidingView
                                                behavior={Platform.OS == "ios" ? "padding" : "height"}
                                                style={{ flex: 1, }}
                                                keyboardVerticalOffset
                                            >

                                                <InputApp
                                                    label={i18n.t('password')}
                                                    placeholder={i18n.t('password')}
                                                    onChangeText={(e) => setPassword(e)}
                                                    value={password}
                                                    secureTextEntry={Platform.OS === 'android' ? password === '' ? false : true : true}
                                                    styleCont={{ marginTop: 30 }}

                                                />
                                                <InputApp
                                                    label={i18n.t('NewPassword')}
                                                    placeholder={i18n.t('NewPassword')}
                                                    onChangeText={(e) => setNewPassword(e)}
                                                    value={Newpassword}
                                                    secureTextEntry={Platform.OS === 'android' ? Newpassword === '' ? false : true : true}
                                                    styleCont={{ marginTop: 10 }}



                                                />
                                                <InputApp
                                                    label={i18n.t('confirmPass')}
                                                    placeholder={i18n.t('confirmPass')}
                                                    onChangeText={(e) => setConfirmPassword(e)}
                                                    value={confirmPassword}
                                                    secureTextEntry={Platform.OS === 'android' ? confirmPassword === '' ? false : true : true}
                                                    styleCont={{ marginTop: 10 }}


                                                />
                                                <Containers loading={spinner}>
                                                    <BTN title={i18n.t('confirm')} onPress={ChangeMyPass} ContainerStyle={{ marginTop: 0, marginVertical: 20, }} />
                                                </Containers>

                                            </KeyboardAvoidingView>
                                        </ScrollView>

                                    </View>

                                </TouchableOpacity>
                            </Modal>
                        </View>
                    </Content>



                </View>
            </View>
        </Container>
    )
}



const styles = StyleSheet.create({
    ImgBack: {
        width,
        height
    },
    IconBack: {
        width: 40,
        height: 40
    },
    Abs: {
        position: 'absolute',
        top: 50,
        height
    },
    Notify: {
        color: Colors.white,
        fontSize: 24,
        fontFamily: 'FairuzBold',
        alignSelf: 'flex-start',
        marginTop: 10
    },
    clmn: {
        flexDirection: 'column',
        marginHorizontal: '4%',

    },
    SCard: {
        backgroundColor: Colors.white,
        flexDirection: 'row',
        height: 120,
        borderRadius: 25,
        alignItems: 'center',
        marginHorizontal: '5%',
        width: Platform.OS === 'ios' ? width * .9 : 330,
        marginTop: 20
    },
    SText: {
        color: Colors.secondary,
        fontFamily: 'FairuzBold',
        width: 150
    },
    contents: {
        backgroundColor: Colors.white,
        width, marginTop: 20,
        borderTopRightRadius: 55,
        borderTopLeftRadius: 55,
        overflow: 'hidden',
        flex: 1
    },
    Line: {
        justifyContent: 'center',
        height: 6,
        width: '25%',
        borderRadius: 5,
        opacity: .1,
        marginTop: 20,
        backgroundColor: Colors.black,
        alignSelf: 'center'
    },
    Wrap: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: '8%',
        alignItems: 'center',
        marginTop: 20
    },
    Line: {
        justifyContent: 'center',
        height: 6,
        width: '25%',
        borderRadius: 5,
        opacity: .1,
        marginTop: 20,
        backgroundColor: Colors.black,
        alignSelf: 'center'
    },
    arrow:
    {
        width: 25,
        height: 25
    }
    , breakLine:
    {
        height: .25,
        width: '85%',
        opacity: .5,
        backgroundColor: Colors.secondary,
        marginHorizontal: '8%',
        marginTop: 15
    },
    BLine: {
        height: .5,
        width: '85%',
        opacity: .5,
        backgroundColor: Colors.secondary,
        marginHorizontal: '8%',
        marginTop: 15
    }
    ,
    centeredView: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
        backgroundColor: '#737373',
        opacity: Platform.OS === 'ios' ? .97 : .95,


    },
    modalView: {
        backgroundColor: Colors.white,
        borderTopRightRadius: 25,
        borderTopLeftRadius: 25,
        width: width,
        height: height * .45,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.2,
        shadowRadius: 3.84,
    },

    oPress: {
        height: width * .14,
        flexDirection: 'row',
        overflow: 'hidden',
        marginHorizontal: "10%",
        backgroundColor: Colors.white,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingEnd: 20,
        marginTop: 15
    },
    Img: {
        width: 25,
        height: 25
    },
    Language: {
        color: Colors.secondary,
        fontSize: 16,
        marginStart: 10,
        fontFamily: 'FairuzNormal',
    },
    Scroll: {
        flex: 1,
        backgroundColor: Colors.white,
        borderTopRightRadius: 25,
        borderTopLeftRadius: 25,
    }

})

export default Settings
