import React, { useState, useEffect } from 'react'
import { View, Text, Image, StyleSheet, I18nManager, TouchableOpacity, Platform, Modal, Linking } from 'react-native'
import { Content, Container, Toast } from 'native-base'
import { Colors } from '../../constant/Colors'
import i18n from '../../../Local/i18n'
import { height, width } from '../../constant/Dimentions'
import { SText } from '../../common/SText'
import { InputApp } from '../../common/InputApp'
import BTN from '../../common/LoginBtn'
import { useDispatch, useSelector } from 'react-redux'
import { useIsFocused } from '@react-navigation/native';
import { GetContactUS, SendComplaiment } from '../../store/action/DrawerAction'
import { Toaster } from '../../common/Toaster'
import { ToasterNative } from '../../common/ToasterNative'




function Contactus({ navigation }) {


    const [modalVisible, setModalVisible] = useState(false);
    const [spinner, setspinner] = useState(false);

    const [Message, setMessage] = useState('');

    const dispatch = useDispatch();
    const isFocused = useIsFocused();

    const lang = useSelector(state => state.lang.language);
    const Contact = useSelector(state => state.drawer.contact ? state.drawer.contact : {});
    const token = useSelector(state => state.auth.user ? state.auth.user.data ? state.auth.user.data.token : null : null);


    useEffect(() => {
        if (isFocused) {
            dispatch(GetContactUS(lang))
        }
    }, [isFocused])


    const OpenURL = (url) => {
        Linking.canOpenURL(url).then(supported => {
            if (!supported) {
                console.log('Can\'t handle url: ' + url);
            } else {
                return Linking.openURL(url);
            }
        }).catch(err => console.error('An error occurred', err));
    }

    const _Valdaite = () => {
        let MessageErr = Message == '' ? i18n.t('messageErr') : null

        return MessageErr
    }

    const SendComplaimentAppUser = () => {
        let val = _Valdaite()

        if (!val) {
            setspinner(true)
            dispatch(SendComplaiment(lang, Message, token)).then(() => setspinner(false)).then(() => setModalVisible(false)).then(() => setMessage(''))

        }
        else {


            ToasterNative(_Valdaite(), 'danger', 'top')

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
                    <Text style={styles.Notify}>{i18n.t('Contact')}</Text>
                </View>

                <View style={styles.SCard}>
                    <Image source={require('../../../assets/Images/contact_us.png')} style={{ width: 190, height: 190 }} resizeMode='contain' />
                    <Text style={styles.SText}>{i18n.t('ContactAp')}</Text>
                </View>

                <View style={styles.contents}>
                    {
                        Contact
                        &&
                        Contact.contact &&
                        <Content >
                            <View style={styles.Line}></View>
                            <Text style={styles.Add} numberOfLines={1} ellipsizeMode="tail"> {i18n.t('Social')} </Text>


                            <View style={styles.Card}>

                                <TouchableOpacity style={styles.centered} onPress={() => { Linking.openURL(`tel://${Contact.contact.phone}`) }}>
                                    <Image source={require('../../../assets/Images/phone_call.png')} style={styles.Icon} resizeMode='contain' />
                                    <Text style={styles.Call}>{Contact.contact.phone}</Text>
                                </TouchableOpacity>

                                <View style={styles.BLine}></View>

                                <TouchableOpacity style={styles.centered} onPress={() => { Linking.openURL('mailto:' + Contact.contact.email) }}>
                                    <Image source={require('../../../assets/Images/email.png')} style={styles.Icon} resizeMode='contain' />
                                    <Text style={styles.Call}>{Contact.contact.email}</Text>
                                </TouchableOpacity>

                                <View style={styles.BLine}></View>

                                <TouchableOpacity style={styles.centered} onPress={() => Linking.openURL(`https://api.whatsapp.com/send?phone=${Contact.contact.whatsapp}`)} >
                                    <Image source={require('../../../assets/Images/whatsapp.png')} style={styles.Icon} resizeMode='contain' />
                                    <Text style={styles.Call}>{Contact.contact.whatsapp}</Text>
                                </TouchableOpacity>
                            </View>

                            <Text style={styles.Add} numberOfLines={1} ellipsizeMode="tail"> {i18n.t('sochialMedia')} </Text>

                            <View style={styles.Card}>
                                {
                                    Contact.socials.map(soc => {
                                        return (
                                            <>
                                                <TouchableOpacity style={styles.centered} key={soc.link} onPress={() => OpenURL("https://" + soc.link)}>
                                                    <Image source={{ uri: soc.icon }} style={styles.Icon} resizeMode='contain' />
                                                    <Text style={styles.Call}>{soc.link}</Text>
                                                </TouchableOpacity>
                                                <View style={[styles.BLine, { height: .9 }]}></View>


                                            </>
                                        )
                                    })
                                }



                            </View>






                        </Content>

                    }
                    <SText title={i18n.t('sendComplaint')} onPress={() => setModalVisible(true)} style={styles.FPass} />

                </View>
            </View>
            <View style={styles.centeredView}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible} >

                    <TouchableOpacity style={[styles.centeredView, {}]} onPress={() => setModalVisible(false)}>
                        <View style={styles.modalView}>
                            <View style={styles.Line}></View>
                            <Text style={styles.Complain}>{i18n.t('sendComplaint')}</Text>

                            <InputApp
                                placeholder={i18n.t('sendComplaint')}
                                onChangeText={(e) => setMessage(e)}
                                value={Message}
                                multiline={true}
                                numberOfLines={10}
                                styleCont={{ marginTop: 10, height: 180 }}
                                inputStyle={{ padding: 0, top: 0, }}

                            />

                            <BTN title={i18n.t('confirm')} onPress={SendComplaimentAppUser} ContainerStyle={{ marginTop: 0, marginVertical: 15 }} />

                        </View>

                    </TouchableOpacity>
                </Modal>
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
        width: Platform.OS === 'ios' ? width * .9 : 335,
        marginTop: 20,
    },
    SText: {
        color: Colors.secondary,
        fontFamily: 'FairuzBold',
        width: 150,
        flex: 1,

    },
    contents: {
        backgroundColor: Colors.white,
        width,
        marginTop: 20,
        borderTopRightRadius: 55,
        borderTopLeftRadius: 55,
        overflow: 'hidden',
        flex: 1,
        marginBottom: 50

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
    Add: {
        color: Colors.secondary,
        fontFamily: 'FairuzBold',
        fontSize: 16,
        alignSelf: 'flex-start',
        marginVertical: 15,
        marginStart: 5
    },

    Card: {
        width: '90%',
        borderRadius: 5,
        marginStart: 20,
        padding: 20,
        marginVertical: 5,
        shadowColor: Colors.white,
        backgroundColor: Colors.white,
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 2,
        shadowColor: "#000",
        shadowOffset: {
            width: 2,
            height: 0,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    centered: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    Icon: {
        width: 25,
        height: 25
    },
    Call: {
        color: Colors.black,
        fontFamily: 'FairuzLight',
        marginStart: 30
    },
    BLine: {
        height: .4,
        width: '90%',
        opacity: .4,
        backgroundColor: Colors.secondary,
        marginHorizontal: '2%',
        marginVertical: 15
    },
    FPass: {
        color: Colors.secondary,
        fontSize: 18,
        textDecorationLine: 'underline'
    },

    centeredView: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
        // backgroundColor: '#737373',
        // opacity: Platform.OS === 'ios' ? .97 : .95,


    },
    modalView: {
        backgroundColor: Colors.white,
        borderTopRightRadius: 25,
        borderTopLeftRadius: 25,
        width: width,
        height: height * .49,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.2,
        shadowRadius: 3.84,
    },
    Complain: {
        color: Colors.secondary,
        fontFamily: 'FairuzBold',
        fontSize: 16,
        alignSelf: 'center',
        marginTop: 20
    }
})

export default Contactus
