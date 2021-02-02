import React, { useEffect } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, ScrollView, Linking } from 'react-native';
import { Colors } from '../../constant/Colors'
import i18n from '../../../Local/i18n'
import BTN from '../../common/LoginBtn'
import { height, width } from '../../constant/Dimentions'
import { useSelector, useDispatch } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import { GetPlan } from '../../store/action/HomeAction';
import { GetContactUS } from '../../store/action/DrawerAction';




function HomePage({ navigation }) {

    const lang = useSelector(state => state.lang.language);
    const plan = useSelector(state => state.plan.plan);
    const Contact = useSelector(state => state.drawer.contact ? state.drawer.contact : {});

    console.log(plan);

    const dispatch = useDispatch();
    const isFocused = useIsFocused();
    let colors = [Colors.foshia, Colors.Labny, Colors.Green, Colors.main, Colors.orange, Colors.LabnyFateh, Colors.smothblack]



    useEffect(() => {

        if (isFocused) {

            dispatch(GetPlan(lang)).then(() => dispatch(GetContactUS(lang)))
        }
    }, [isFocused])

    return (
        <View style={styles.container}>
            <Image source={require('../../../assets/Images/girl.jpeg')} style={styles.Img} />
            <View style={styles.wrab}>
                <View style={styles.Touch}>

                    <TouchableOpacity onPress={() => navigation.openDrawer()}>
                        <Image source={require('../../../assets/Images/menu.png')} style={styles.Icon} />
                    </TouchableOpacity>


                    <TouchableOpacity style={{ marginHorizontal: 10 }} onPress={() => navigation.navigate('Notifications')}>
                        <Image source={require('../../../assets/Images/active_notification.png')} style={styles.Icon} />
                    </TouchableOpacity>

                </View>

                <ScrollView style={{ flex: 1, height: height * .86 }} showsVerticalScrollIndicator={false}>
                    <Text numberOfLines={2} style={[styles.Hello, { width: 280 }]}>{i18n.t('HelloApp')}</Text>

                    <View style={styles.card}>
                        <View style={styles.ImgText}>
                            <Image source={require('../../../assets/Images/big_lamp.png')} style={styles.ImgCard} resizeMode='contain' />
                            <View style={styles.wrabLess}>
                                <Text style={styles.TextCard}>{i18n.t('FavLesson')}</Text>

                                <BTN title={i18n.t('watchPlan')} ContainerStyle={styles.Btn} TextStyle={{ fontSize: 12, }} onPress={() => Linking.openURL(`https://api.whatsapp.com/send?phone=${Contact.contact.whatsapp}`)} />
                            </View>
                        </View>
                    </View>

                    <FlatList
                        data={plan}
                        horizontal={false}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={item => item.id}
                        renderItem={({ item, index }) => {
                            return (
                                <TouchableOpacity style={[styles.SmallCard, { backgroundColor: colors[index % colors.length] }]} onPress={() => navigation.navigate('Subsections', { plan_id: item.id, plan_name: item.name, pdf: item.pdf, word: item.word })}>
                                    <View style={styles.WrabCard}>
                                        <Image source={{ uri: item.icon }} style={styles.SMAllImg} resizeMode='contain' />
                                        <View style={styles.smallText}>
                                            <Text style={styles.Indevedual}>
                                                {item.name}
                                            </Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>

                            )
                        }}
                    />

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
        marginTop: 50
    },
    card: {
        backgroundColor: Colors.Labny,
        borderRadius: 25,
        width: '95%',
        marginHorizontal: '1%',
        marginTop: 50
    },
    SmallCard: {
        flex: 1,
        borderRadius: 20,
        width: '95%',
        marginHorizontal: '1%',
        marginTop: 15,

        justifyContent: 'center'
    },
    ImgText: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    ImgCard: {
        width: 100,
        height: 140,
        borderRadius: 25,

    },
    TextCard: {
        fontFamily: 'FairuzBold',
        width: '90%',
        color: Colors.secondary
    },
    Btn: {
        marginTop: 0,
        height: 50,
        width: 170,
        marginHorizontal: 0,
        alignSelf: 'flex-start'
    },
    wrabLess: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: '8%'
    },
    WrabCard: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    SMAllImg: {
        width: 80,
        height: 100,
        borderRadius: 20,
        margin: 5,
    },
    smallText: {
        flexDirection: 'column',
        flex: 1

    },
    Indevedual: {
        fontFamily: 'FairuzBold',
        fontSize: 14,
        color: Colors.secondary,
        alignSelf: 'flex-start'
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
