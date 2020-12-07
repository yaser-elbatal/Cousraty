import React from 'react'
import { View, Image, StyleSheet, TouchableOpacity, Text, I18nManager, ScrollView } from 'react-native'
import { height, width } from '../../constant/Dimentions'
import i18n from '../../../Local/i18n'
import { Colors } from '../../constant/Colors'
import { Container, Content, Header, Body } from 'native-base'
import ProgressCircle from 'react-native-progress-circle'
import BTN from '../../common/LoginBtn'



function Subsections({ navigation }) {
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

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: 320, alignItems: 'center' }}>
                        <Text style={styles.Notify}>{i18n.t('Subsections')}</Text>
                        <TouchableOpacity style={{ alignItems: 'flex-end' }}>
                            <Image source={require('../../../assets/Images/pdf.png')} style={{ width: 30, height: 30 }} resizeMode='contain' />
                        </TouchableOpacity>
                    </View>

                    <View style={[styles.SmallCard, { backgroundColor: Colors.orange, }]} >
                        <View style={styles.WrabCard}>
                            <Image source={require('../../../assets/Images/brain.png')} style={styles.SMAllImg} resizeMode='contain' />
                            <View style={styles.smallText}>
                                <Text style={styles.Indevedual}>  {i18n.t('Individualplans')}  </Text>
                                <Text style={styles.Price}>   15{i18n.t('Rs')}, 20{i18n.t('Lessons')}, 15{i18n.t('hours')} </Text>
                            </View>

                            <View style={styles.centered}>

                                <Text style={styles.percentage}>{'50%'}</Text>
                                <ProgressCircle
                                    percent={50}
                                    radius={25}
                                    borderWidth={1}
                                    color={Colors.main}
                                    shadowColor="white"
                                    bgColor="white"
                                    outerCircleStyle={{ overflow: 'hidden', alignSelf: 'flex-end' }}
                                >
                                    {
                                        I18nManager.isRTL ?
                                            <Image source={require('../../../assets/Images/green_playbutton.png')} style={styles.Icon} />
                                            :
                                            <Image source={require('../../../assets/Images/Play_button_right.png')} style={styles.Icon} />

                                    }

                                </ProgressCircle>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={styles.contents}>
                    <Content >
                        <View style={styles.Line}></View>

                        <TouchableOpacity style={styles.single}>
                            <View style={styles.ViewNum}>
                                <Text style={styles.num}>1</Text>
                            </View>

                            <View style={styles.ViewClmn}>
                                <Text style={styles.Indevedual}> {i18n.t('Individualplans')}</Text>
                                <Text style={styles.Price}>2 ساعات, 50 {i18n.t('Rs')}</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.single,]}>
                            <View style={[styles.ViewNum, { backgroundColor: Colors.main }]}>
                                <Text style={styles.num}>2</Text>
                            </View>

                            <View style={styles.ViewClmn}>
                                <Text style={styles.Indevedual}> {i18n.t('Individualplans')}</Text>
                                <Text style={styles.Price}>2 ساعات, 50 {i18n.t('Rs')}</Text>
                            </View>
                        </TouchableOpacity>

                        <BTN title={i18n.t('subscribe')} onPress={() => navigation.navigate('PricePay')} ContainerStyle={{ marginTop: 30 }} />



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
        height,
        alignItems: 'center'
    },
    clmn: {
        flexDirection: 'column',
        marginHorizontal: '4%',

    },
    SCard: {
        backgroundColor: Colors.white,
        flexDirection: 'row',
        height: 100,
        borderRadius: 25,
        alignItems: 'center',
        marginHorizontal: '5%',
        width: 300,
        marginTop: 20
    },
    SMAllImg: {
        width: 60,
        height: 60,
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
        marginBottom: 50,
        flex: 1,


    },
    SmallCard: {
        backgroundColor: Colors.foshia,
        borderRadius: 25,
        width: 330,
        marginHorizontal: '1%',
        marginTop: 15,
        paddingVertical: 15,
        paddingHorizontal: 5,
        justifyContent: 'center',
    },
    centered: {
        alignItems: 'center',
        flexDirection: 'row',
        marginStart: 15,
        marginEnd: 5
    },
    WrabCard: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: '1%'
    },
    Icon: {
        width: 45,
        height: 45
    },
    smallText: {
        flexDirection: 'column',
        marginStart: 10
    },
    Indevedual: {
        fontFamily: 'FairuzBold',
        fontSize: 14,
        color: Colors.secondary
    },
    Price: {
        fontFamily: 'FairuzBold',
        fontSize: 13,
        color: Colors.main
    },
    single: {
        flexDirection: 'row',
        marginStart: 20,
        alignItems: 'center',
        marginTop: 20
    },
    ViewNum: {
        backgroundColor: Colors.orange,
        height: 30,
        width: 30,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 15
    },
    num: {
        color: Colors.black,
        fontSize: 16
    },
    ViewClmn: {
        flexDirection: 'column',
        marginHorizontal: 10,
        alignItems: 'center'
    }
})

export default Subsections
