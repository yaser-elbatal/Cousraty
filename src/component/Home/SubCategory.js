
import React, { useEffect } from 'react'
import { View, Image, StyleSheet, TouchableOpacity, Text, I18nManager, ScrollView, FlatList, Linking } from 'react-native'
import { height, width } from '../../constant/Dimentions'
import i18n from '../../../Local/i18n'
import { Colors } from '../../constant/Colors'
import { Container, Content, } from 'native-base'

function SubCategory({ navigation, route }) {
    const { data, Subscribtion } = route.params;
    console.log(data);

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

                    </View>

                    <View style={[styles.SmallCard, { backgroundColor: Colors.orange, }]} >
                        <View style={styles.WrabCard}>
                            <Image source={require('../../../assets/Images/brain.png')} style={styles.SMAllImg} resizeMode='contain' />
                            <View style={styles.smallText}>
                                <Text style={styles.Indevedual}>  {'مقدمه عن الادراك'}  </Text>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={styles.contents}>
                    <Content >
                        <View style={styles.Line}></View>

                        {
                            Subscribtion.extra == 0 ?
                                <Image source={{ uri: data.image }} style={{ width: 300, height: 200, alignSelf: 'center', borderRadius: 25 }} resizeMode='contain' />

                                :
                                <View style={{ marginStart: 25, marginTop: 10 }}>

                                    <Text style={styles.Indevedual}>{i18n.t('downloadPdf')}</Text>

                                    <TouchableOpacity style={{ marginTop: 10 }} onPress={() => Linking.openURL(`${data.pdf}`)}>
                                        <Image source={require('../../../assets/Images/pdf.png')} style={{ width: 30, height: 30 }} resizeMode='contain' />
                                    </TouchableOpacity>

                                    <View style={styles.sLine}></View>

                                    <Text style={[styles.Indevedual, { marginTop: 30 }]}>{i18n.t('watchVedio')}</Text>

                                    <TouchableOpacity style={{ marginTop: 10, alignSelf: 'flex-start', marginEnd: 10, marginStart: 10 }} onPress={() => Linking.openURL(`${data.link}`)}>
                                        <Text style={[styles.Indevedual, { textDecorationLine: 'underline' }]}>
                                            {data.link}
                                        </Text>

                                    </TouchableOpacity>

                                </View>
                        }


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
    sLine: {
        width: '90%',
        height: 1.6,
        backgroundColor: Colors.black,
        marginTop: 40,
        opacity: .1,


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
        marginTop: 30
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

export default SubCategory
