import React, { useState } from 'react'
import { View, Image, StyleSheet, TouchableOpacity, Text, I18nManager, ScrollView, Platform, Modal } from 'react-native'
import { height, width } from '../../constant/Dimentions'
import i18n from '../../../Local/i18n'
import { Colors } from '../../constant/Colors'
import { Container, Content, } from 'native-base'
import BTN from '../../common/LoginBtn'
import { InputApp } from '../../common/InputApp'
import { SText } from '../../common/SText'




function PricePay({ navigation }) {

    const [Click, setClick] = useState(1)
    const [pay, setPay] = useState(1)

    const [Bankename, setBankename] = useState('');
    const [Accountname, SetAccountname] = useState("");
    const [AccountNumber, setAccountNumber] = useState('');
    const [MoneyPaid, setMoneyPaid] = useState('');

    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisible2, setModalVisible2] = useState(false);
    const [modalVisible3, setModalVisible3] = useState(false);




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
                    <Text numberOfLines={3} ellipsizeMode="tail" style={styles.SText}>{i18n.t('choosePlane')}</Text>
                </View>
                <View style={styles.contents}>
                    <Content >
                        <View style={styles.Line}></View>

                        <TouchableOpacity onPress={() => { setClick(1) }} style={[styles.oPress, { borderStyle: Click === 1 ? 'solid' : 'dotted', borderColor: Click === 1 ? Colors.main : 'black', borderWidth: .7 }]}>
                            {
                                Click === 1 ?
                                    I18nManager.isRTL ?
                                        <Image source={require('../../../assets/Images/active_box.png')} style={styles.Img} resizeMode='contain' />
                                        :
                                        <Image source={require('../../../assets/Images/active_box_inverse.png')} style={styles.Img} resizeMode='contain' />

                                    : null
                            }
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: '4%', alignItems: 'center', marginTop: Click !== 1 ? 25 : -10 }}>
                                <View style={{ flexDirection: 'column', }}>
                                    <Text style={[styles.month, { color: Click === 1 ? Colors.main : Colors.secondary }]}>{i18n.t('Monthlyplans')}</Text>
                                    <Text style={styles.lesson}>{i18n.t('completeCours')}/{i18n.t('month')}</Text>
                                </View>
                                <Text style={styles.price}>150 {i18n.t('Rs')}</Text>
                            </View>

                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => { setClick(2) }} style={[styles.oPress, { borderStyle: Click === 2 ? 'solid' : 'dotted', borderColor: Click === 2 ? Colors.main : 'black', borderWidth: .7 }]}>
                            {
                                Click === 2 ?
                                    I18nManager.isRTL ?
                                        <Image source={require('../../../assets/Images/active_box.png')} style={styles.Img} resizeMode='contain' />
                                        :
                                        <Image source={require('../../../assets/Images/active_box_inverse.png')} style={styles.Img} resizeMode='contain' />

                                    : null
                            }
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: '4%', alignItems: 'center', marginTop: Click !== 2 ? 25 : -10 }}>
                                <View style={{ flexDirection: 'column', }}>
                                    <Text style={[styles.month, { color: Click === 2 ? Colors.main : Colors.secondary }]}>{i18n.t('throwPlan')}</Text>
                                    <Text style={styles.lesson}>{i18n.t('completeCours')}/{i18n.t('month')}</Text>
                                </View>
                                <Text style={styles.price}>250 {i18n.t('Rs')}</Text>
                            </View>

                        </TouchableOpacity>


                        <TouchableOpacity onPress={() => setModalVisible(true)} style={{ height: width * .14, flexDirection: 'row', overflow: 'hidden', marginHorizontal: "10%", borderWidth: .3, borderColor: Colors.InputColor, borderRadius: 5, alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, marginVertical: 20 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Image source={require('../../../assets/Images/world_ball.png')} style={{ width: 20, height: 20 }} resizeMode='contain' />
                                <Text style={{ color: Colors.secondary, fontFamily: 'FairuzBold', fontSize: 14, marginStart: 10 }} numberOfLines={1}>{i18n.t('Transfermony')}</Text>
                            </View>

                            <Image source={require('../../../assets/Images/dropdown.png')} style={{ width: 20, height: 20 }} resizeMode='contain' />
                        </TouchableOpacity>

                        <View style={styles.centeredView}>
                            <Modal
                                animationType="slide"
                                transparent={true}
                                visible={modalVisible} >

                                <TouchableOpacity style={[styles.centeredView, {}]} onPress={() => setModalVisible(false)}>
                                    <View style={styles.modalView}>
                                        <View style={{ borderRadius: 55, height: 80, justifyContent: 'center' }}>
                                            <Text style={{ alignSelf: 'center', color: Colors.white, fontFamily: 'FairuzBold', marginTop: 14 }}>{i18n.t('BankData')}</Text>

                                        </View>


                                        <Content style={{ backgroundColor: Colors.white, }}>
                                            <TouchableOpacity onPress={() => { setPay(1) }} style={[styles.oPress, { borderStyle: pay === 1 ? 'solid' : 'dotted', borderColor: pay === 1 ? Colors.main : 'black', borderWidth: .7, height: 100 }]}>

                                                <View style={{ flexDirection: 'row', alignItems: 'center', marginStart: 10, }}>
                                                    <Image source={require('../../../assets/Images/cib.png')} style={{ width: 100, height: 100, }} resizeMode='contain' />
                                                    <View style={{ flexDirection: 'column' }}>
                                                        <Text style={[styles.month, { paddingHorizontal: 5 }]}>{i18n.t('BankName')}</Text>
                                                        <Text style={[styles.month, { paddingHorizontal: 5 }]}>{i18n.t('AccName')}</Text>
                                                    </View>
                                                    <View style={{ flexDirection: 'column' }}>
                                                        <Text style={[styles.month]}>:</Text>
                                                        <Text style={[styles.month]}>:</Text>
                                                    </View>
                                                    <View style={{ flexDirection: 'column' }}>
                                                        <Text numberOfLines={1} prop with ellipsizeMode="tail" style={[styles.month, { paddingHorizontal: 5, alignSelf: 'flex-start', width: 120 }]}>CIB</Text>
                                                        <Text numberOfLines={2} style={[styles.month, { paddingHorizontal: 5 }]}>00000000000000</Text>
                                                    </View>
                                                </View>

                                            </TouchableOpacity>

                                            <TouchableOpacity onPress={() => { setPay(2) }} style={[styles.oPress, { borderStyle: pay === 2 ? 'solid' : 'dotted', borderColor: pay === 2 ? Colors.main : 'black', borderWidth: .7, height: 100 }]}>

                                                <View style={{ flexDirection: 'row', alignItems: 'center', marginStart: 10, }}>
                                                    <Image source={require('../../../assets/Images/cib.png')} style={{ width: 100, height: 100, }} resizeMode='contain' />
                                                    <View style={{ flexDirection: 'column' }}>
                                                        <Text style={[styles.month, { paddingHorizontal: 5 }]}>{i18n.t('BankName')}</Text>
                                                        <Text style={[styles.month, { paddingHorizontal: 5 }]}>{i18n.t('AccName')}</Text>
                                                    </View>
                                                    <View style={{ flexDirection: 'column' }}>
                                                        <Text style={[styles.month]}>:</Text>
                                                        <Text style={[styles.month]}>:</Text>
                                                    </View>
                                                    <View style={{ flexDirection: 'column' }}>
                                                        <Text numberOfLines={1} prop with ellipsizeMode="tail" style={[styles.month, { paddingHorizontal: 5, alignSelf: 'flex-start', width: 120 }]}>CIB</Text>
                                                        <Text numberOfLines={2} style={[styles.month, { paddingHorizontal: 5 }]}>00000000000000</Text>
                                                    </View>
                                                </View>

                                            </TouchableOpacity>

                                            <BTN title={i18n.t('confirm')} onPress={() => { setModalVisible2(true), setModalVisible(false) }} ContainerStyle={{ marginTop: 30 }} />
                                        </Content>
                                    </View>


                                </TouchableOpacity>
                            </Modal>
                        </View>




                        <View style={styles.centeredView}>
                            <Modal
                                animationType="slide"
                                transparent={true}
                                visible={modalVisible2} >

                                <View style={[styles.centeredView, {}]} onPress={() => setModalVisible2(false)}>
                                    <View style={styles.modalView}>
                                        <View style={{ borderRadius: 55, height: 80, justifyContent: 'center' }}>
                                            <Text style={{ alignSelf: 'center', color: Colors.white, fontFamily: 'FairuzBold', marginTop: 14 }}>{i18n.t('BankData')}</Text>

                                        </View>


                                        <Content style={{ backgroundColor: Colors.white, }}>
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
                                                label={i18n.t('AccNamer')}
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



                                            <BTN title={i18n.t('confirm')} onPress={() => setModalVisible2(false)} ContainerStyle={{ marginTop: 0, marginBottom: 10 }} />

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
                                            <Text>My Condition</Text>
                                        </Content>
                                    </View>


                                </TouchableOpacity>
                            </Modal>
                        </View>

                        <SText title={i18n.t('Termsconditions')} style={{ color: Colors.secondary }} onPress={() => { setModalVisible3(true) }} />

                        <BTN title={i18n.t('payment')} onPress={() => navigation.navigate('SuccessPayment')} ContainerStyle={{ marginVertical: 10, marginTop: 10 }} />


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
        width: 150
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
        backgroundColor: '#737373',
        opacity: Platform.OS === 'ios' ? .97 : .95,


    },
    modalView: {
        backgroundColor: Colors.main,
        borderTopRightRadius: 55,
        borderTopLeftRadius: 55,
        width: width,
        height: height * .65,
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
