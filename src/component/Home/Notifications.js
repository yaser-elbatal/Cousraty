import React, { useEffect } from 'react'
import { View, Image, StyleSheet, TouchableOpacity, Text, I18nManager, ScrollView, FlatList } from 'react-native'
import { height, width } from '../../constant/Dimentions'
import i18n from '../../../Local/i18n'
import { Colors } from '../../constant/Colors'
import { Container, Content, } from 'native-base'
import { SText } from '../../common/SText'
import { useDispatch, useSelector } from 'react-redux'
import { useIsFocused } from '@react-navigation/native';
import { GetnotificationsApps, deletNotfications } from '../../store/action/notificationAction'

function Notifications({ navigation }) {



    const dispatch = useDispatch();
    const isFocused = useIsFocused();


    const notify = useSelector(state => state.notify.notify)
    const token = useSelector(state => state.auth.user ? state.auth.user.data.token : null);
    const lang = useSelector(state => state.lang.language);



    useEffect(() => {
        if (isFocused) {
            dispatch(GetnotificationsApps(lang, token))
        }


    }, [isFocused])


    const DeleteNotifications = (id) => {
        dispatch(deletNotfications(lang, token, id)).then(() => dispatch(GetnotificationsApps(lang, token)))
    }

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
                    <Text style={styles.Notify}>{i18n.t('notification')}</Text>
                </View>

                <View style={styles.SCard}>
                    <Image source={require('../../../assets/Images/notifications.png')} style={{ width: 150, height: 140 }} resizeMode='contain' />
                    <Text style={styles.SText}>{i18n.t('NotifyApp')}</Text>
                </View>

                <View style={styles.contents}>
                    <Content >

                        <View style={styles.Line}></View>

                        <FlatList
                            data={notify}
                            horizontal={false}
                            showsVerticalScrollIndicator={false}
                            keyExtractor={item => item.id}
                            renderItem={({ item, index }) => {
                                return (
                                    <View style={styles.Card}>
                                        <View style={styles.Space}>
                                            <Text style={styles.Tail}>{'ddm'}</Text>
                                            <TouchableOpacity onPress={() => DeleteNotifications(item.id)}>
                                                <Image source={require('../../../assets/Images/cancel.png')} style={{ width: 20, height: 20 }} resizeMode='contain' />
                                            </TouchableOpacity>
                                        </View>
                                        <Text style={styles.Add} >  {item.message}  </Text>
                                        <Text style={{ color: Colors.main, fontFamily: 'FairuzBold', alignSelf: 'flex-end' }}>{item.date}</Text>
                                    </View>
                                )
                            }
                            }
                        />





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
        height: 100,
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
        flex: 1,
        backgroundColor: '#ECF7F7',
        width: '90%',
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


})
export default Notifications
