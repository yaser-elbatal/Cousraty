import React, { useState, useEffect } from 'react'
import { View, Image, Text, TouchableOpacity, StyleSheet, AsyncStorage } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'

import { HeaderAuth } from '../../common/HeaderAuth'
import { width } from '../../constant/Dimentions'
import { Colors } from '../../constant/Colors'
import BTN from '../../common/LoginBtn'
import { changeLanguage } from '../../store/action/LangAction'
import i18n from '../../../Local/i18n'


function LanguagePage({ navigation }) {

    const Language = useSelector(state => state.lang.language)

    const [Lang, setLang] = useState('');
    const [Direction, setDirection] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {

        AsyncStorage.getItem("lang").then((lang) => {
            setLang(lang)
            if (lang) {
                navigation.navigate('Login')

            }
        })

        AsyncStorage.getItem("direction").then((direct) => {
            setDirection(direct)
        })

    }, [])

    const changeLang = async (lang, direction) => {
        await dispatch(changeLanguage(lang, direction,))


    };


    console.log(Lang, Direction);
    return (
        <HeaderAuth>
            <View style={styles.Wrap}>
                <Text style={styles.Lang}>{i18n.t('lang')}</Text>
                <TouchableOpacity onPress={() => { setLang('ar'); setDirection('RTL'); }} style={styles.oPress}>
                    <Text style={styles.Language}>{i18n.t('arab')}</Text>
                    {
                        Lang === 'ar' ?
                            <Image source={require('../../../assets/Images/checked.png')} style={styles.Img} resizeMode='contain' />
                            : null
                    }
                </TouchableOpacity>

                <TouchableOpacity onPress={() => { setLang('en'); setDirection('LTR'); }} style={styles.oPress}>

                    <Text style={styles.Language}>English</Text>
                    {
                        Lang === 'en' ?
                            <Image source={require('../../../assets/Images/checked.png')} style={styles.Img} resizeMode='contain' />
                            : null
                    }
                </TouchableOpacity>
                <BTN title={i18n.t('next')} onPress={() => changeLang(Lang, Direction)} />
            </View>
        </HeaderAuth>
    )
}



const styles = StyleSheet.create({
    Lang: {
        color: Colors.white,
        marginStart: 30,
        fontSize: 22,
        fontFamily: 'FairuzBold',
        alignSelf: 'flex-start'
    },
    Language: {
        color: Colors.white,
        fontSize: 16,
        marginStart: 10,
        fontFamily: 'FairuzNormal',
    },
    oPress: {
        height: width * .14,
        flexDirection: 'row',
        overflow: 'hidden',
        marginHorizontal: "10%",
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingEnd: 20,
        marginTop: 15
    },
    Img: {
        width: 25,
        height: 25
    },
    Wrap: {
        justifyContent: 'center',
        marginTop: 100
    }
})



export default LanguagePage
