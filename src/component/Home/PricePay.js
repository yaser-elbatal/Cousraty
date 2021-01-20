import React, { useState, useEffect } from 'react'
import { View, Image, StyleSheet, TouchableOpacity, Text, I18nManager, Platform, Modal, FlatList, Keyboard } from 'react-native'
import { height, width } from '../../constant/Dimentions'
import i18n from '../../../Local/i18n'
import { Colors } from '../../constant/Colors'
import { Container, Content, Toast, } from 'native-base'
import BTN from '../../common/LoginBtn'
import { InputApp } from '../../common/InputApp'
import { SText } from '../../common/SText'
import { useDispatch, useSelector } from 'react-redux'
import { useIsFocused } from '@react-navigation/native';
import { GetSubscriptionsPrice } from '../../store/action/Subscribtionaction'
import { GetBanks, BankTransfer } from '../../store/action/BankAction'
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { Toaster } from '../../common/Toaster'
import Containers from '../../common/Loader'
import { GetTerms } from '../../store/action/DrawerAction'
import { ToasterNative } from '../../common/ToasterNative'



function PricePay({ navigation }) {

    const [Click, setClick] = useState(0)
    const [pay, setPay] = useState(0)

    const [Bankename, setBankename] = useState('');
    const [Accountname, SetAccountname] = useState('');
    const [AccountNumber, setAccountNumber] = useState('');
    const [MoneyPaid, setMoneyPaid] = useState('');
    const [base64, setBase64] = useState('');
    const [userImage, setUserImage] = useState('');



    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisible2, setModalVisible2] = useState(false);
    const [modalVisible3, setModalVisible3] = useState(false);
    const [spinner, setspinner] = useState(false);


    const token = useSelector(state => state.auth.user ? state.auth.user.data.token : null);
    const lang = useSelector(state => state.lang.language);
    const SubScriptions = useSelector(state => state.subs.subs);
    const banks = useSelector(state => state.banks.banks);
    const terms = useSelector(state => state.drawer.terms);




    const dispatch = useDispatch();
    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused) {
            setPay(0)
            setClick(0)
            dispatch(GetSubscriptionsPrice(lang))
            dispatch(GetBanks(lang))
            dispatch(GetTerms(lang))

        }
    }, [isFocused])



    const askPermissionsAsync = async () => {
        await Permissions.askAsync(Permissions.CAMERA);
        await Permissions.askAsync(Permissions.CAMERA_ROLL);

    };
    const _pickImage = async () => {

        let { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

        if (status === 'granted') {
            let result = await ImagePicker.launchImageLibraryAsync({
                base64: true,
                aspect: [4, 3],
                quality: .5,
            });

            if (!result.cancelled) {
                setUserImage(result.uri);
                setBase64(result.base64);
            }

        }
        else {
            ToasterNative(i18n.t('CammeraErr'), "danger", 'top')

        }
        console.log(status);


    };



    const _Valdation = () => {

        let PlanErr = Click === 0 ? i18n.t('PlanErr') : null
        let Bankerr = pay === 0 ? i18n.t('BankErr') : null
        let BaseErr = base64 == '' ? i18n.t('BaseErr') : null
        let BankNameErr = Bankename == '' ? i18n.t('BanknameErr') : null
        let AccountnameErr = Accountname == '' ? i18n.t('AccountnameErr') : null
        let AccountnNumberErr = AccountNumber == '' ? i18n.t('AccountnNumberErr') : null
        let MoneyPaidErr = MoneyPaid == '' ? i18n.t('MoneyPaidErr') : null


        return PlanErr || Bankerr || BankNameErr || AccountnameErr || AccountnNumberErr || MoneyPaidErr || BaseErr


    }




    const _ValdationBanks = () => {
        let BaseErr = base64 == '' ? i18n.t('BaseErr') : null
        let BankNameErr = Bankename == '' ? i18n.t('BanknameErr') : null
        let AccountnameErr = Accountname == '' ? i18n.t('AccountnameErr') : null
        let AccountnNumberErr = AccountNumber == '' ? i18n.t('AccountnNumberErr') : null
        let MoneyPaidErr = MoneyPaid == '' ? i18n.t('MoneyPaidErr') : null



        return BaseErr || BankNameErr || AccountnameErr || AccountnNumberErr || MoneyPaidErr


    }

    const HandleChangeTransfer = () => {
        let Val = _ValdationBanks();
        if (!Val) {
            setModalVisible2(false)
        }
        else {
            Keyboard.dismiss()
            Toast.show({
                text: _ValdationBanks(),
                position: 'top',
                type: "danger",
                duration: 3000,
                textStyle: {
                    color: "white",
                    fontFamily: 'FairuzBold',
                    textAlign: 'center'
                }
            });

        }


    }


    const SentBankTransfer = () => {
        let val = _Valdation();
        if (!val) {
            setspinner(true)
            dispatch(BankTransfer(Accountname, AccountNumber, base64, MoneyPaid, Bankename, pay, Click, token, lang, navigation)).then(() => setspinner(false)).catch((err) => {
                setspinner(false)
                Toast.show({
                    text: err,
                    type: "danger",
                    duration: 3000,
                    textStyle: {
                        color: "white",
                        fontFamily: 'FairuzBold',
                        textAlign: 'center'
                    }
                })
            })

            setAccountNumber('');
            setUserImage('')
            SetAccountname('')
            setBankename('')
            setMoneyPaid('')

        }
        else {
            Toast.show({
                text: _Valdation(),
                position: 'bottom',
                type: "danger",
                duration: 3000,
                textStyle: {
                    color: "white",
                    fontFamily: 'FairuzBold',
                    textAlign: 'center'
                }
            });

        }

    }

    const HandleBank = () => {
        if (pay === 0) {
            // setModalVisible(false)

            Toast.show({
                text: i18n.t('BankErr'),
                position: 'top',
                type: "danger",
                duration: 3000,
                textStyle: {
                    color: "white",
                    fontFamily: 'FairuzBold',
                    textAlign: 'center'
                }
            });


        }
        else {
            setModalVisible2(true)
            setModalVisible(false)

        }
    }

    return (
        <Container style={{ flex: 1, }}>
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
                    <Text style={styles.Notify}>{i18n.t('PricePaln')}</Text>
                </View>

                <View style={styles.SCard}>
                    <Image source={require('../../../assets/Images/calender.png')} style={{ width: 190, height: 140 }} resizeMode='contain' />
                    <Text style={styles.SText}>{i18n.t('choosePlane')}</Text>
                </View>
                <View style={styles.contents}>
                    <Content >
                        <View style={styles.Line}></View>

                        <FlatList
                            data={SubScriptions}
                            horizontal={false}
                            showsVerticalScrollIndicator={false}
                            keyExtractor={item => item.id}
                            renderItem={({ item, index }) => {
                                return (

                                    <TouchableOpacity onPress={() => { setClick(item.id) }} style={[styles.oPress, { borderStyle: Click === item.id ? 'solid' : 'dotted', borderColor: Click === item.id ? Colors.main : 'black', borderWidth: 1 }]}>
                                        {
                                            Click === item.id ?
                                                I18nManager.isRTL ?
                                                    <Image source={require('../../../assets/Images/active_box.png')} style={styles.Img} resizeMode='contain' />
                                                    :
                                                    <Image source={require('../../../assets/Images/active_box_inverse.png')} style={styles.Img} resizeMode='contain' />

                                                : null
                                        }
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: '4%', alignItems: 'center', marginTop: Click !== item.id ? 25 : -10 }}>
                                            <View style={{ flexDirection: 'column', }}>
                                                <Text style={[styles.month, { color: Click === item.id ? Colors.main : Colors.secondary }]}>{item.title}</Text>
                                                <Text style={styles.lesson}>{item.duration_word}</Text>
                                            </View>
                                            <Text style={styles.price}>{item.price} {i18n.t('Rs')}</Text>
                                        </View>

                                    </TouchableOpacity>
                                )
                            }}
                        />

                        <Text style={{ fontFamily: 'FairuzBold', fontSize: 16, margin: 20, color: Colors.secondary }}>{i18n.t('chooseBank')} : </Text>



                        <TouchableOpacity onPress={() => setModalVisible(true)} style={{ height: width * .14, flexDirection: 'row', overflow: 'hidden', marginHorizontal: "10%", borderWidth: .3, borderColor: Colors.InputColor, borderRadius: 5, alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Image source={require('../../../assets/Images/world_ball.png')} style={{ width: 20, height: 20 }} resizeMode='contain' />
                                <Text style={{ color: Colors.secondary, fontFamily: 'FairuzBold', fontSize: 14, marginStart: 10 }} numberOfLines={1}>{i18n.t('Transfermony')}</Text>
                            </View>

                            <Image source={require('../../../assets/Images/dropdown.png')} style={{ width: 15, height: 20 }} resizeMode='contain' />
                        </TouchableOpacity>

                        <View style={styles.centeredView}>
                            <Modal
                                animationType="slide"
                                transparent={true}
                                visible={modalVisible} >

                                <TouchableOpacity style={[styles.centeredView, {}]} onPress={() => setModalVisible(false)}>
                                    <View style={styles.modalView}>
                                        <TouchableOpacity style={{ borderRadius: 55, height: 80, justifyContent: 'center' }} onPress={() => setModalVisible(false)}>
                                            <Text style={{ alignSelf: 'center', color: Colors.white, fontFamily: 'FairuzBold', marginTop: 14 }}>{i18n.t('chooseBank')}</Text>

                                        </TouchableOpacity>


                                        <Content style={{ backgroundColor: Colors.white, }}>
                                            <FlatList
                                                data={banks}
                                                horizontal={false}
                                                showsVerticalScrollIndicator={false}
                                                keyExtractor={item => item.id}
                                                renderItem={({ item, index }) => {
                                                    return (
                                                        <TouchableOpacity onPress={() => { setPay(item.id) }} style={[styles.oPress, { borderStyle: pay === item.id ? 'solid' : 'dotted', borderColor: pay === item.id ? Colors.main : 'black', borderWidth: 1.8, height: 100 }]}>

                                                            <View style={{ flexDirection: 'row', alignItems: 'center', marginStart: 10 }}>
                                                                <Image source={{ uri: item.icon }} style={{ width: 80, height: 90, }} resizeMode='contain' />
                                                                <View style={{ width: '100%', paddingHorizontal: 15, flex: 1 }}>
                                                                    <View style={{ flexDirection: 'row' }}>
                                                                        <Text style={[styles.month, { paddingHorizontal: 5, }]}>{i18n.t('BankName')} : </Text>
                                                                        <Text style={[styles.month, { paddingHorizontal: 5 }]}>{item.name}</Text>
                                                                    </View>
                                                                    <View style={{ flexDirection: 'row' }}>
                                                                        <Text style={[styles.month, { paddingHorizontal: 5, }]}>{i18n.t('AccName')} : </Text>
                                                                        <Text style={[styles.month, { paddingHorizontal: 5 }]}> {item.account_number}</Text>
                                                                    </View>
                                                                    <View style={{ flexDirection: 'row' }}>
                                                                        <Text style={[styles.month, { paddingHorizontal: 5, }]}>{i18n.t('AccNamer')} : </Text>
                                                                        <Text style={[styles.month, { paddingHorizontal: 5 }]}>{item.account_name}</Text>
                                                                    </View>
                                                                    <View style={{ flexDirection: 'row', }}>
                                                                        <Text style={[styles.month, { paddingHorizontal: 5, }]}>{i18n.t('IBAN')} : </Text>
                                                                        <Text style={[styles.month, { paddingHorizontal: 5 }]}>{item.iban}</Text>
                                                                    </View>
                                                                </View>
                                                            </View>

                                                        </TouchableOpacity>
                                                    )
                                                }} />





                                        </Content>
                                        <BTN title={i18n.t('confirm')} onPress={HandleBank} ContainerStyle={{ marginTop: 350, marginBottom: 20, height: 50, borderRadius: 25, position: 'absolute', backgroundColor: Colors.main }} />

                                    </View>


                                </TouchableOpacity>
                            </Modal>
                        </View>




                        <View style={[styles.centeredView]}>
                            <Modal
                                animationType="slide"
                                transparent={true}
                                visible={modalVisible2} >

                                <View style={[styles.centeredView, {}]} >
                                    <View style={styles.modalView}>
                                        <TouchableOpacity style={{ borderRadius: 55, height: 80, justifyContent: 'center' }} onPress={() => setModalVisible2(false)}>
                                            <Text style={{ alignSelf: 'center', color: Colors.white, fontFamily: 'FairuzBold', marginTop: 14 }}>{i18n.t('BankData')}</Text>

                                        </TouchableOpacity>



                                        <Content style={{ backgroundColor: Colors.white, }}>
                                            <TouchableOpacity onPress={_pickImage} style={{ marginHorizontal: '15%', marginVertical: '6%' }}>

                                                {
                                                    userImage === '' ?
                                                        <Image source={require('../../../assets/Images/add_photo.png')} style={{ width: 100, height: 80, marginTop: 30, alignSelf: 'center', borderRadius: 5 }} resizeMode='contain' />
                                                        :
                                                        <Image source={{ uri: userImage }} style={{ width: 200, height: 150, marginTop: 30, alignSelf: 'center', borderRadius: 15 }} resizeMode='contain' />

                                                }
                                            </TouchableOpacity>
                                            <InputApp
                                                label={i18n.t('BankNameTr')}
                                                placeholder={i18n.t('BankNameTr')}
                                                onChangeText={(e) => setBankename(e)}
                                                value={Bankename}
                                                styleCont={{ marginTop: 20 }}

                                            />

                                            <InputApp
                                                label={i18n.t('AccNamer')}
                                                placeholder={i18n.t('AccNamer')}
                                                onChangeText={(e) => { SetAccountname(e) }}
                                                value={Accountname}
                                                styleCont={{ marginTop: 0 }}
                                            />

                                            <InputApp
                                                label={i18n.t('AccName')}
                                                placeholder={i18n.t('AccName')}
                                                onChangeText={(e) => { setAccountNumber(e) }}
                                                value={AccountNumber}
                                                styleCont={{ marginTop: 0 }}
                                            />
                                            <InputApp
                                                label={i18n.t('Amountpaid')}
                                                placeholder={i18n.t('Amountpaid')}
                                                onChangeText={(e) => { setMoneyPaid(e) }}
                                                value={MoneyPaid}
                                                keyboardType='numeric'
                                                styleCont={{ marginTop: 0 }}
                                            />



                                            <BTN title={i18n.t('confirm')} onPress={HandleChangeTransfer} ContainerStyle={{ marginTop: 0, marginBottom: 10 }} />

                                        </Content>
                                    </View>


                                </View>
                            </Modal>
                        </View>


                        <View style={styles.centeredView}>
                            <Modal
                                animationType="slide"
                                transparent={true}
                                visible={modalVisible3} >

                                <TouchableOpacity style={[styles.centeredView, {}]} onPress={() => setModalVisible3(false)}>
                                    <View style={[styles.modalView, { backgroundColor: Colors.white }]}>
                                        <Text style={{ alignSelf: 'center', color: Colors.main, fontFamily: 'FairuzBold', marginTop: 14 }}>{i18n.t('Termsconditions')}</Text>

                                        <Content >
                                            <Text style={{ alignSelf: 'flex-start', color: Colors.secondary, fontFamily: 'FairuzBold', marginTop: 14, marginStart: 10, marginEnd: 5 }}>{terms} </Text>
                                            {/* <Text style={{ alignSelf: 'flex-start', color: Colors.secondary, fontFamily: 'FairuzBold', marginTop: 14, marginStart: 10 }}>{terms}</Text> */}

                                        </Content>
                                    </View>


                                </TouchableOpacity>
                            </Modal>
                        </View>

                        <SText title={i18n.t('Termsconditions')} style={{ color: Colors.secondary }} onPress={() => { setModalVisible3(true) }} />
                        <Containers loading={spinner}>
                            <BTN title={i18n.t('payment')} onPress={SentBankTransfer} ContainerStyle={{ marginVertical: 10, marginTop: 10 }} />

                        </Containers>


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
    Notify: {
        color: Colors.white,
        fontSize: 24,
        fontFamily: 'FairuzBold',
        alignSelf: 'flex-start',
        marginTop: 10
    },
    Abs: {
        position: 'absolute',
        top: 50,
        height
    },
    clmn: {
        flexDirection: 'column',
        marginHorizontal: '4%',

    },
    SCard: {
        backgroundColor: Colors.white,
        flexDirection: 'row',
        height: 110,
        borderRadius: 25,
        alignItems: 'center',
        marginHorizontal: '5%',
        width: Platform.OS === 'ios' ? width * .9 : 330,
        marginTop: 20
    },
    SText: {
        color: Colors.secondary,
        fontFamily: 'FairuzBold',
        width: 150,
        flex: 1,

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
    Card: {
        backgroundColor: '#ECF7F7',
        width: '90%',
        height: 150,
        padding: 20,
        marginHorizontal: 20,
        borderRadius: 15,
        marginTop: 10,
    },
    Space: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    Add: {
        color: Colors.secondary,
        fontFamily: 'FairuzLight',
    },
    Tail: {
        color: Colors.secondary,
        fontFamily: 'FairuzBold',
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
    oPress: {
        height: width * .29,
        overflow: 'hidden',
        marginHorizontal: "5%",
        backgroundColor: Colors.white,
        borderRadius: 10,
        marginTop: 20,

    },
    Img: {
        width: 35,
        height: 35,
        alignSelf: 'flex-end'

    },
    month: {
        color: Colors.secondary,
        fontSize: 12,
        fontFamily: 'FairuzBold',
        alignSelf: 'flex-start'
    },
    lesson: {
        color: Colors.main,
        fontSize: 12,
        fontFamily: 'FairuzNormal',
    },
    price: {
        color: Colors.main,
        fontSize: 22,
        fontFamily: 'FairuzBold',
    },

    centeredView: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
        // backgroundColor: '#737373',
        // opacity: Platform.OS === 'ios' ? .97 : .95,


    },
    modalView: {
        backgroundColor: Colors.main,
        borderTopRightRadius: 55,
        borderTopLeftRadius: 55,
        width: width,
        height: height * .69,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.2,
        shadowRadius: 3.84,
    },
})

export default PricePay
