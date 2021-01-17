import React, { useEffect } from 'react'
import { View, Text, Image, StyleSheet, I18nManager, TouchableOpacity, Platform } from 'react-native'
import { Content, Container } from 'native-base'
import { Colors } from '../../constant/Colors'
import i18n from '../../../Local/i18n'
import { height, width } from '../../constant/Dimentions'
import { useDispatch, useSelector } from 'react-redux'
import { useIsFocused } from '@react-navigation/native';
import { GetTerms } from '../../store/action/DrawerAction'



function Terms({ navigation }) {

    const isFocused = useIsFocused();
    const dispatch = useDispatch();


    const terms = useSelector(state => state.drawer.terms);
    const lang = useSelector(state => state.lang.language);



    useEffect(() => {
        if (isFocused) {

            dispatch(GetTerms(lang))

        }
    }, [isFocused])

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
                    <Text style={styles.Notify}>{i18n.t('Termsconditions')}</Text>
                </View>

                <View style={styles.SCard}>
                    <Image source={require('../../../assets/Images/security.png')} style={{ width: 190, height: 160 }} resizeMode='contain' />
                    <Text style={styles.SText}>{i18n.t('TermsCond')}</Text>
                </View>

                <View style={styles.contents}>
                    <Content >
                        <View style={styles.Line}></View>

                        <View style={{ marginStart: 20, flex: 1 }}>
                            <Text style={styles.Item}> {i18n.t('Firstitem')}</Text>
                            <Text style={styles.Add} > {terms}  </Text>
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
    Add: {
        color: Colors.secondary,
        fontFamily: 'FairuzLight',
    },
    Item: {
        color: Colors.main,
        fontFamily: 'FairuzBold',
        fontSize: 20
    }
})
export default Terms
