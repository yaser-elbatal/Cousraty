import React, { useEffect } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, I18nManager, ScrollView } from 'react-native';
import ProgressCircle from 'react-native-progress-circle'

import { Colors } from '../../constant/Colors'
import { InputIcon } from '../../common/InputText'
import i18n from '../../../Local/i18n'
import BTN from '../../common/LoginBtn'
import { height, width } from '../../constant/Dimentions'




function HomePage({ navigation }) {


    useEffect(() => {
        console.log('aaaa');
    }, [])

    return (
        <View style={styles.container}>
            <Image source={require('../../../assets/Images/girl.jpeg')} style={styles.Img} />
            <View style={styles.wrab}>
                <View style={styles.Touch}>

                    <TouchableOpacity onPress={() => navigation.openDrawer()}>
                        <Image source={require('../../../assets/Images/menu.png')} style={styles.Icon} />
                    </TouchableOpacity>

                    <View style={{ flexDirection: 'row', }}>
                        <TouchableOpacity>
                            <Image source={require('../../../assets/Images/notification.png')} style={styles.Icon} />
                        </TouchableOpacity>

                        <TouchableOpacity style={{ marginHorizontal: 10 }} onPress={() => navigation.navigate('Notifications')}>
                            <Image source={require('../../../assets/Images/active_notification.png')} style={styles.Icon} />
                        </TouchableOpacity>
                    </View>

                </View>

                <ScrollView style={{ flex: 1, height: height * .86 }} showsVerticalScrollIndicator={false}>
                    <Text style={styles.Hello}>{i18n.t('HelloApp')}</Text>

                    <InputIcon
                        placeholder={i18n.t('search')}
                        inputStyle={{ backgroundColor: 'white', color: Colors.black }}
                        placeholderTextColor={'black'}
                        styleCont={{ marginHorizontal: '1%', width: '95%', marginTop: 30 }}

                        image={require('../../../assets/Images/search.png')}
                    />

                    <View style={styles.card}>
                        <View style={styles.ImgText}>
                            <Image source={require('../../../assets/Images/big_lamp.png')} style={styles.ImgCard} resizeMode='contain' />
                            <View style={styles.wrabLess}>
                                <Text style={styles.TextCard}>{i18n.t('FavLesson')}</Text>
                                <BTN title={i18n.t('lesson')} ContainerStyle={styles.Btn} onPress={() => navigation.navigate('myProfile')} />
                            </View>
                        </View>
                    </View>




                    <TouchableOpacity style={styles.SmallCard}>
                        <View style={styles.WrabCard}>
                            <Image source={require('../../../assets/Images/pencil.png')} style={styles.SMAllImg} resizeMode='contain' />
                            <View style={styles.smallText}>
                                <Text style={styles.Indevedual}>
                                    {i18n.t('Individualplans')}
                                </Text>
                                <Text style={styles.Price}>
                                    15{i18n.t('Rs')}, 20{i18n.t('Lessons')}, 15{i18n.t('hours')}
                                </Text>
                            </View>

                            <View style={styles.centered}>

                                <Text style={styles.percentage}>{'25%'}</Text>
                                <ProgressCircle
                                    percent={25}
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
                    </TouchableOpacity>


                    <TouchableOpacity style={[styles.SmallCard, { backgroundColor: Colors.orange, }]} onPress={() => navigation.navigate('Subsections')}>
                        <View style={styles.WrabCard}>
                            <Image source={require('../../../assets/Images/brain.png')} style={styles.SMAllImg} resizeMode='contain' />
                            <View style={styles.smallText}>
                                <Text style={styles.Indevedual}>
                                    {i18n.t('Individualplans')}
                                </Text>
                                <Text style={styles.Price}>
                                    15{i18n.t('Rs')}, 20{i18n.t('Lessons')}, 15{i18n.t('hours')}
                                </Text>
                            </View>

                            <View style={styles.centered}>

                                <Text style={styles.percentage}>{'0%'}</Text>
                                <ProgressCircle
                                    percent={0}
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
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.SmallCard, { backgroundColor: '#D5EFEF', }]}>
                        <View style={styles.WrabCard}>
                            <Image source={require('../../../assets/Images/lamp.png')} style={styles.SMAllImg} resizeMode='contain' />
                            <View style={styles.smallText}>
                                <Text style={styles.Indevedual}>
                                    {i18n.t('Individualplans')}
                                </Text>
                                <Text style={styles.Price}>
                                    15{i18n.t('Rs')}, 20{i18n.t('Lessons')}, 15{i18n.t('hours')}
                                </Text>


                            </View>
                            <View style={styles.centered}>

                                <Text style={styles.percentage}>{'75%'}</Text>
                                <ProgressCircle
                                    percent={75}
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
                    </TouchableOpacity>

                </ScrollView>

            </View>




        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    Img: {
        width: '100%',
        height: 400,
        borderBottomRightRadius: 55,
        borderBottomLeftRadius: 55,
    },
    wrab: {
        justifyContent: 'center',
        top: 45,
        width: '95%',
        marginHorizontal: '4%',
        position: 'absolute'

    },
    Icon: {
        width: 45,
        height: 45
    },
    Touch: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    Hello: {
        color: Colors.white,
        fontSize: 24,
        fontFamily: 'FairuzBold',
        alignSelf: 'flex-start',
        marginTop: 40
    },
    card: {
        backgroundColor: Colors.Labny,
        borderRadius: 25,
        width: '95%',
        marginHorizontal: '1%',
    },
    SmallCard: {
        backgroundColor: Colors.foshia,
        flex: 1, borderRadius: 25,
        width: '95%',
        marginHorizontal: '1%',
        marginTop: 15,
        paddingVertical: 15,
        paddingHorizontal: 5,
        justifyContent: 'center'
    },
    ImgText: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    ImgCard: {
        width: 100,
        height: 140,
    },
    TextCard: {
        fontFamily: 'FairuzBold',
        width: '90%',
        color: Colors.secondary
    },
    Btn: {
        marginTop: 0,
        height: 35,
        width: width * .4,
        marginHorizontal: '1%'
    },
    wrabLess: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: '10%'
    },
    WrabCard: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: '1%'
    },
    SMAllImg: {
        width: 60,
        height: 60,
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
        color: '#F5A95B'
    },
    centered: {
        alignItems: 'center',
        flexDirection: 'row',
    },
    percentage: {
        fontFamily: 'FairuzBold',
        fontSize: 14,
        color: Colors.secondary,
        paddingHorizontal: 10
    }

})

export default HomePage
