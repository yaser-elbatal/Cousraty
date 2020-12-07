import React from 'react'
import { View, Text, Image, StyleSheet, I18nManager, TouchableOpacity, Platform } from 'react-native'
import { Content, Container } from 'native-base'
import { Colors } from '../../constant/Colors'
import i18n from '../../../Local/i18n'
import { height, width } from '../../constant/Dimentions'

function About({ navigation }) {
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
                    <Text style={styles.Notify}>{i18n.t('about')}</Text>
                </View>

                <View style={styles.SCard}>
                    <Image source={require('../../../assets/Images/about_app.png')} style={{ width: 190, height: 180 }} resizeMode='contain' />
                    <Text style={styles.SText}>{i18n.t('AboutApp')}</Text>
                </View>

                <View style={styles.contents}>
                    <Content >
                        <View style={styles.Line}></View>

                        <View style={{ marginStart: 20 }}>
                            <Text style={{ color: Colors.main, fontFamily: 'FairuzBold', fontSize: 20 }}> {i18n.t('Firstitem')}</Text>
                            <Text style={styles.Add} numberOfLines={2} ellipsizeMode="tail">  سيتم فصل الخدمه عنكم في تاريخ 25 اكتوبر ويرجي تحديد الاشتراك للاستمتاع بالخدمه  </Text>
                            <Text style={styles.Add} numberOfLines={2} ellipsizeMode="tail">  سيتم فصل الخدمه عنكم في تاريخ 25 اكتوبر ويرجي تحديد الاشتراك للاستمتاع بالخدمه  </Text>
                            <Text style={styles.Add} numberOfLines={2} ellipsizeMode="tail">  سيتم فصل الخدمه عنكم في تاريخ 25 اكتوبر ويرجي تحديد الاشتراك للاستمتاع بالخدمه  </Text>
                            <Text style={{ color: Colors.main, fontFamily: 'FairuzBold', fontSize: 20 }}> {i18n.t('seconTerm')}</Text>
                            <Text style={styles.Add} numberOfLines={2} ellipsizeMode="tail">  سيتم فصل الخدمه عنكم في تاريخ 25 اكتوبر ويرجي تحديد الاشتراك للاستمتاع بالخدمه  </Text>
                            <Text style={styles.Add} numberOfLines={2} ellipsizeMode="tail">  سيتم فصل الخدمه عنكم في تاريخ 25 اكتوبر ويرجي تحديد الاشتراك للاستمتاع بالخدمه  </Text>
                            <Text style={styles.Add} numberOfLines={2} ellipsizeMode="tail">  سيتم فصل الخدمه عنكم في تاريخ 25 اكتوبر ويرجي تحديد الاشتراك للاستمتاع بالخدمه  </Text>

                            <Text style={{ color: Colors.main, fontFamily: 'FairuzBold', fontSize: 20 }}> {i18n.t('seconTerm')}</Text>
                            <Text style={styles.Add} numberOfLines={2} ellipsizeMode="tail">  سيتم فصل الخدمه عنكم في تاريخ 25 اكتوبر ويرجي تحديد الاشتراك للاستمتاع بالخدمه  </Text>
                            <Text style={styles.Add} numberOfLines={2} ellipsizeMode="tail">  سيتم فصل الخدمه عنكم في تاريخ 25 اكتوبر ويرجي تحديد الاشتراك للاستمتاع بالخدمه  </Text>
                            <Text style={styles.Add} numberOfLines={2} ellipsizeMode="tail">  سيتم فصل الخدمه عنكم في تاريخ 25 اكتوبر ويرجي تحديد الاشتراك للاستمتاع بالخدمه  </Text>



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
        height: 140,
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
    Add: {
        color: Colors.secondary,
        fontFamily: 'FairuzLight',
    },
})
export default About
