import React from 'react'
import { View, Image, StyleSheet, TouchableOpacity, Text, I18nManager, ScrollView } from 'react-native'
import { height, width } from '../../constant/Dimentions'
import i18n from '../../../Local/i18n'
import { Colors } from '../../constant/Colors'
import { Container, Content, } from 'native-base'
import { SText } from '../../common/SText'
import BTN from '../../common/LoginBtn'

function SuccessPayment({ navigation }) {
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
                    <Text style={styles.Notify}>{i18n.t('Confirmpayment')}</Text>


                </View>
                <View style={styles.contents}>
                    <Image source={require('../../../assets/Images/confirm_payment.png')} style={styles.BImg} resizeMode='contain' />
                    <Text numberOfLines={2} ellipsizeMode="tail" style={styles.Payment}>{`${i18n.t('paymentMony')} 250 ${i18n.t('Rs')}`}</Text>
                    <BTN title={i18n.t('bacjHome')} onPress={() => navigation.navigate('HomePage')} ContainerStyle={{ bottom: 200 }} />

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
        height: 100,
        borderRadius: 25,
        alignItems: 'center',
        marginHorizontal: '5%',
        width: 300,
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
        marginTop: 100,
        borderTopRightRadius: 55,
        borderTopLeftRadius: 55,
        flex: 1,


    },
    BImg: {
        width: 320,
        height: 320,
        alignSelf: 'center',
        bottom: 170
    },
    Payment: {
        alignSelf: 'center',
        color: Colors.secondary,
        fontFamily: 'FairuzBold',
        bottom: 210,
        width: 260
    }

})

export default SuccessPayment
