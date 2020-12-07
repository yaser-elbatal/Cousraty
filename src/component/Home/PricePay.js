import React, { useState } from 'react'
import { View, Image, StyleSheet, TouchableOpacity, Text, I18nManager, ScrollView, Platform, Modal } from 'react-native'
import { height, width } from '../../constant/Dimentions'
import i18n from '../../../Local/i18n'
import { Colors } from '../../constant/Colors'
import { Container, Content, } from 'native-base'
import BTN from '../../common/LoginBtn'




function PricePay({ navigation }) {

    const [Click, setClick] = useState(1)
    const [pay, setPay] = useState(1)

    const [modalVisible, setModalVisible] = useState(false);

    const [PayWays, setPayWays] = useState(i18n.t('Visa'));
    const [ImagePay, setImagePay] = useState((require('../../../assets/Images/visa_icon.png')))

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


                        <TouchableOpacity onPress={() => { setClick(3) }} style={[styles.oPress, { borderStyle: Click === 3 ? 'solid' : 'dotted', borderColor: Click === 3 ? Colors.main : 'black', borderWidth: .7 }]}>
                            {
                                Click === 3 ?
                                    I18nManager.isRTL ?
                                        <Image source={require('../../../assets/Images/active_box.png')} style={styles.Img} resizeMode='contain' />
                                        :
                                        <Image source={require('../../../assets/Images/active_box_inverse.png')} style={styles.Img} resizeMode='contain' />

                                    : null
                            }
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: '4%', alignItems: 'center', marginTop: Click !== 3 ? 25 : -10 }}>
                                <View style={{ flexDirection: 'column', }}>
                                    <Text style={[styles.month, { color: Click === 3 ? Colors.main : Colors.secondary }]}>{i18n.t('yearPlan')}</Text>
                                    <Text style={styles.lesson}>{i18n.t('completeCours')}/{i18n.t('month')}</Text>
                                </View>
                                <Text style={styles.price}>350 {i18n.t('Rs')}</Text>
                            </View>

                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => setModalVisible(true)} style={{ height: width * .14, flexDirection: 'row', overflow: 'hidden', marginHorizontal: "10%", borderWidth: .3, borderColor: Colors.InputColor, borderRadius: 5, alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, marginVertical: 20 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Image source={ImagePay} style={{ width: 20, height: 20 }} resizeMode='contain' />
                                <Text style={{ color: Colors.secondary, fontFamily: 'FairuzBold', fontSize: 14, marginStart: 10 }} numberOfLines={1}>{PayWays}</Text>
                            </View>

                            <Image source={require('../../../assets/Images/dropdown.png')} style={{ width: 20, height: 20 }} resizeMode='contain' />
                        </TouchableOpacity>

                        <View style={styles.centeredView}>
                            <Modal
                                animationType="slide"
                                transparent={true}
                                visible={modalVisible} >

                                <View style={[styles.centeredView, {}]} onPress={() => setModalVisible(false)}>
                                    <View style={styles.modalView}>
                                        <Text style={{ alignSelf: 'center', color: Colors.secondary, fontFamily: 'FairuzBold', marginTop: 10 }}>{i18n.t('choosePay')}</Text>

                                        <TouchableOpacity onPress={() => { setPay(1); setPayWays(i18n.t('Visa')); setImagePay(require('../../../assets/Images/visa_icon.png')) }} style={[styles.oPress, { borderStyle: pay === 1 ? 'solid' : 'dotted', borderColor: pay === 1 ? Colors.main : 'black', borderWidth: .7, height: width * .14 }]}>
                                            {
                                                pay === 1 ?
                                                    I18nManager.isRTL ?
                                                        <Image source={require('../../../assets/Images/active_box.png')} style={styles.Img} resizeMode='contain' />
                                                        :
                                                        <Image source={require('../../../assets/Images/active_box_inverse.png')} style={styles.Img} resizeMode='contain' />

                                                    : null
                                            }
                                            <View style={{ flexDirection: 'row', alignItems: 'center', marginStart: 25, marginTop: pay !== 1 ? 4 : -30 }}>
                                                <Image source={require('../../../assets/Images/visa_icon.png')} style={{ width: 20, height: 20, }} resizeMode='contain' />
                                                <Text style={[styles.month, { color: pay === 1 ? Colors.main : Colors.secondary, paddingHorizontal: 10 }]}>{i18n.t('Visa')}</Text>
                                            </View>

                                        </TouchableOpacity>



                                        <TouchableOpacity onPress={() => { setPay(2); setPayWays(i18n.t('Pay')); setImagePay(require('../../../assets/Images/sadad_icon.png')) }} style={[styles.oPress, { borderStyle: pay === 2 ? 'solid' : 'dotted', borderColor: pay === 2 ? Colors.main : 'black', borderWidth: .7, height: width * .14 }]}>
                                            {
                                                pay === 2 ?
                                                    I18nManager.isRTL ?
                                                        <Image source={require('../../../assets/Images/active_box.png')} style={styles.Img} resizeMode='contain' />
                                                        :
                                                        <Image source={require('../../../assets/Images/active_box_inverse.png')} style={styles.Img} resizeMode='contain' />

                                                    : null
                                            }
                                            <View style={{ flexDirection: 'row', alignItems: 'center', marginStart: 25, marginTop: pay !== 2 ? 4 : -30 }}>
                                                <Image source={require('../../../assets/Images/sadad_icon.png')} style={{ width: 20, height: 20, }} resizeMode='contain' />
                                                <Text style={[styles.month, { color: pay === 2 ? Colors.main : Colors.secondary, paddingHorizontal: 10 }]}>{i18n.t('Pay')}</Text>
                                            </View>

                                        </TouchableOpacity>

                                        <TouchableOpacity onPress={() => { setPay(3); setPayWays(i18n.t('Pay')); setImagePay(require('../../../assets/Images/stc_icon.png')) }} style={[styles.oPress, { borderStyle: pay === 3 ? 'solid' : 'dotted', borderColor: pay === 3 ? Colors.main : 'black', borderWidth: .7, height: width * .14 }]}>
                                            {
                                                pay === 3 ?
                                                    I18nManager.isRTL ?
                                                        <Image source={require('../../../assets/Images/active_box.png')} style={styles.Img} resizeMode='contain' />
                                                        :
                                                        <Image source={require('../../../assets/Images/active_box_inverse.png')} style={styles.Img} resizeMode='contain' />

                                                    : null
                                            }
                                            <View style={{ flexDirection: 'row', alignItems: 'center', marginStart: 25, marginTop: pay !== 3 ? 4 : -30 }}>
                                                <Image source={require('../../../assets/Images/stc_icon.png')} style={{ width: 20, height: 20, }} resizeMode='contain' />
                                                <Text style={[styles.month, { color: pay === 3 ? Colors.main : Colors.secondary, paddingHorizontal: 10 }]}>{i18n.t('Pay')}</Text>
                                            </View>

                                        </TouchableOpacity>


                                        <TouchableOpacity onPress={() => { setPay(4); setPayWays(i18n.t('Transfermony')); setImagePay(require('../../../assets/Images/world_ball.png')) }} style={[styles.oPress, { borderStyle: pay === 4 ? 'solid' : 'dotted', borderColor: pay === 4 ? Colors.main : 'black', borderWidth: .7, height: width * .14 }]}>
                                            {
                                                pay === 4 ?
                                                    I18nManager.isRTL ?
                                                        <Image source={require('../../../assets/Images/active_box.png')} style={styles.Img} resizeMode='contain' />
                                                        :
                                                        <Image source={require('../../../assets/Images/active_box_inverse.png')} style={styles.Img} resizeMode='contain' />

                                                    : null
                                            }
                                            <View style={{ flexDirection: 'row', alignItems: 'center', marginStart: 25, marginTop: pay !== 4 ? 4 : -30 }}>
                                                <Image source={require('../../../assets/Images/world_ball.png')} style={{ width: 20, height: 20, }} resizeMode='contain' />
                                                <Text style={[styles.month, { color: pay === 4 ? Colors.main : Colors.secondary, paddingHorizontal: 10 }]}>{i18n.t('Transfermony')}</Text>
                                            </View>

                                        </TouchableOpacity>

                                        <BTN title={i18n.t('confirm')} onPress={() => setModalVisible(false)} ContainerStyle={{ marginTop: 30 }} />



                                    </View>

                                </View>
                            </Modal>
                        </View>
                        <BTN title={i18n.t('payment')} onPress={() => navigation.navigate('SuccessPayment')} ContainerStyle={{ marginVertical: 10, marginTop: 0 }} />


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
        marginHorizontal: "10%",
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
        fontSize: 18,
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
        backgroundColor: Colors.white,
        borderTopRightRadius: 25,
        borderTopLeftRadius: 25,
        width: width,
        height: height * .6,
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
