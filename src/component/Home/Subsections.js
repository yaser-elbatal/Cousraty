import React, { useEffect } from 'react'
import { View, Image, StyleSheet, TouchableOpacity, Text, I18nManager, ScrollView, FlatList, Linking, Platform } from 'react-native'
import { height, width } from '../../constant/Dimentions'
import i18n from '../../../Local/i18n'
import { Colors } from '../../constant/Colors'
import { Container, Content, } from 'native-base'
import BTN from '../../common/LoginBtn'
import { useSelector, useDispatch } from 'react-redux'
import { useIsFocused } from '@react-navigation/native';
import { GetToutorial } from '../../store/action/HomeAction'
import { ToasterNative } from '../../common/ToasterNative'
import { WebView } from 'react-native-webview';



function Subsections({ navigation, route }) {

    const toutorial = useSelector(state => state.plan.toutorial ? state.plan.toutorial.data : []);
    const token = useSelector(state => state.auth.user ? state.auth.user.data.token : null);
    const lang = useSelector(state => state.lang.language);
    const Subscribtion = useSelector(state => state.plan.toutorial ? state.plan.toutorial : []);
    let colors = [Colors.foshia, Colors.Labny, Colors.Green, Colors.main, Colors.orange, Colors.LabnyFateh, Colors.smothblack]

    const dispatch = useDispatch();
    const isFocused = useIsFocused();
    const { plan_id, plan_name, pdf, word, icon, item } = route.params;


    useEffect(() => {
        if (isFocused) {
            dispatch(GetToutorial(lang, token, plan_id))
        }
    }, [isFocused])


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
                        <View style={{ flexDirection: 'row', }}>
                            <TouchableOpacity style={{ alignItems: 'flex-end', paddingHorizontal: 15 }} onPress={pdf === null ? () => ToasterNative(i18n.t('notFile'), "danger") : () => Linking.openURL(`${pdf}`)}>
                                <Image source={require('../../../assets/Images/pdf.png')} style={{ width: 30, height: 30 }} resizeMode='contain' />
                            </TouchableOpacity>
                            <TouchableOpacity style={{ alignItems: 'flex-end', }} onPress={word === null ? () => ToasterNative(i18n.t('notFile'), "danger") : () => Linking.openURL(`${word}`)}>
                                <Image source={require('../../../assets/Images/word.png')} style={{ width: 30, height: 30 }} resizeMode='contain' />
                            </TouchableOpacity>
                        </View>

                    </View>

                    <View style={[styles.SmallCard, { backgroundColor: Colors.orange, }]} >
                        <View style={styles.WrabCard}>
                            <Image source={{ uri: icon }} style={styles.SMAllImg} resizeMode='contain' />
                            <View style={styles.smallText}>
                                <Text style={styles.Indevedual}>  {plan_name}  </Text>
                            </View>


                        </View>
                    </View>
                </View>
                <View style={styles.contents}>
                    <Content showsVerticalScrollIndicator={false} >
                        {
                            toutorial && toutorial.length === 0 ?
                                <View style={{ alignItems: 'center', }}>
                                    <Image source={require('../../../assets/Images/noData.png')} style={{ width, height }} resizeMode='cover' />
                                </View>
                                :
                                <>
                                    <View style={styles.Line}></View>
                                    {
                                        item.image ?
                                            <Image source={{ uri: item.image }} style={{ width: 150, height: 150, alignSelf: 'center', borderRadius: 10 }} resizeMode='contain' />
                                            : null
                                    }

                                    <FlatList
                                        data={toutorial}
                                        horizontal={false}
                                        showsVerticalScrollIndicator={false}
                                        keyExtractor={item => item.id.toString()}
                                        renderItem={({ item, index }) => {
                                            return (
                                                <TouchableOpacity style={styles.single} onPress={() => navigation.navigate('SubCategory', { data: item, Subscribtion })}>
                                                    <View style={[styles.ViewNum, { backgroundColor: colors[index % colors.length] }]}>
                                                        <Text style={styles.num}>{index + 1}</Text>
                                                    </View>

                                                    <View style={styles.ViewClmn}>
                                                        <Text style={styles.Indevedual}>{item.title}</Text>
                                                    </View>
                                                </TouchableOpacity>
                                            )
                                        }}
                                    />
                                </>
                        }





                    </Content>
                    {
                        Subscribtion.extra == 0 ?
                            <View style={{ marginBottom: Platform.OS == 'ios' ? 50 : 20 }}>
                                <BTN title={i18n.t('subscribe')} onPress={() => navigation.navigate('PricePay')} />
                            </View>
                            : null
                    }
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
        marginStart: 5,
        flex: 1

    },
    Indevedual: {
        fontFamily: 'FairuzBold',
        fontSize: 12,
        color: Colors.secondary,
        alignSelf: 'flex-start',
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
        marginTop: 25
    },
    ViewNum: {
        backgroundColor: Colors.orange,
        height: 30,
        width: 30,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    num: {
        color: Colors.black,
        fontSize: 16
    },
    ViewClmn: {
        flexDirection: 'column',
        marginHorizontal: 10,
        alignItems: 'center',
        flex: 1
    }
})

export default Subsections
