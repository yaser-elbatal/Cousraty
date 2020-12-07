import React from 'react'
import { View, Text, Image, StyleSheet, I18nManager, TouchableOpacity, Platform } from 'react-native'
import { Content, Container } from 'native-base'
import { Colors } from '../../constant/Colors'
import i18n from '../../../Local/i18n'
import { height, width } from '../../constant/Dimentions'

function Questions({ navigation }) {
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
                    <Text style={styles.Notify}>{i18n.t('Frequentlquestions')}</Text>
                </View>

                <View style={styles.SCard}>
                    <Image source={require('../../../assets/Images/repeated_questions.png')} style={{ width: 160, height: 120 }} resizeMode='contain' />
                    <Text style={styles.SText}>{i18n.t('RebQuestion')}</Text>
                </View>

                <View style={styles.contents}>
                    <Content >
                        <View style={styles.Line}></View>

                        <View style={styles.Card}>
                            <Text style={styles.Adds} numberOfLines={1} ellipsizeMode="tail"> الســـــــــــــــــــــؤال الاول؟ </Text>
                        </View>
                        <Text style={styles.items}> سيتم فصل الخدمه عنكم في تاريخ 25 اكتوبر ويرجي تحديد الاشتراك للاستمتاع بالخدمه  سيتم فصل الخدمه عنكم في تاريخ 25 اكتوبر ويرجي تحديد الاشتراك للاستمتاع بالخدمه </Text>


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

    Item: {
        color: Colors.main,
        fontFamily: 'FairuzBold',
        fontSize: 20
    },
    Adds: {
        color: Colors.secondary,
        fontFamily: 'FairuzBold',
        alignSelf: 'flex-start',
        fontSize: 18
    },
    Card: {
        height: 70,
        width: '90%',
        borderRadius: 25,
        marginStart: 20,
        paddingStart: 10,
        marginVertical: 5,
        shadowColor: Colors.white,
        marginTop: 20,
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
        alignItems: 'center',
        justifyContent: 'center'
    },
    items: {
        marginHorizontal: 25,
        fontFamily: 'FairuzLight',
        color: Colors.black
    }
})
export default Questions
