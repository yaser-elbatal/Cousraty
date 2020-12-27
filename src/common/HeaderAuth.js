import React from 'react'
import { KeyboardAvoidingView, Platform, StyleSheet, ScrollView, View, Image, Text, TouchableOpacity, I18nManager } from 'react-native'
import { height, width } from '../constant/Dimentions'
import { Colors } from '../constant/Colors'

const HeaderAuth = ({ children, Icon, onPress }) => {
    return (
        <View style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS == "ios" ? "padding" : "height"}
                style={styles.container}
                keyboardVerticalOffset
            >

                <Image source={require('../../assets/Images/bg.png')} style={styles.image} resizeMode="cover" />
                <ScrollView style={{ flex: 1, }}>
                    {
                        Icon ?
                            <View style={styles.WrabImg}>
                                <TouchableOpacity onPress={onPress} style={{ paddingHorizontal: '8%' }}>
                                    {
                                        I18nManager.isRTL ?
                                            <Image source={require('../../assets/Images/back.png')} style={styles.IcnBack} />
                                            :
                                            <Image source={require('../../assets/Images/back_left.png')} style={styles.IcnBack} />


                                    }
                                </TouchableOpacity>
                                <Image source={require('../../assets/Images/logo.png')} style={styles.Imnage} resizeMode='contain' />
                            </View>

                            :
                            <Image source={require('../../assets/Images/logo.png')} style={styles.Img} resizeMode='contain' />
                    }


                    {children}
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    )
}


const styles = StyleSheet.create({
    container: { flex: 1 },
    image: {
        position: "absolute",
        width: width,
        height: height,
    },

    opacityBg: {
        position: "absolute",
        width: width + 50,
        height: height,
    },

    Centerd: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    FText: {
        fontSize: 20,
        color: '#85CDCC',
        fontFamily: 'FairuzBold',

    },
    SText: {
        fontSize: 14,
        color: 'white',
        fontFamily: 'FairuzBold',
    },
    WrabImg: {
        flexDirection: 'row',
        marginTop: 50,
    },
    Img: {
        alignSelf: 'center',
        width: 200,
        height: 200,
        marginTop: 20
    },
    IcnBack: {
        width: 25,
        height: 25,
    },
    Imnage: {
        width: 200,
        height: 140,
    }

})

export { HeaderAuth };

