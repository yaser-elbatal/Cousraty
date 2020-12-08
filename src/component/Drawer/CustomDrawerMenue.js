import React, { useEffect, useState, useContext } from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, AsyncStorage } from 'react-native'
import { height, width } from '../../constant/Dimentions'
import i18n from '../../../Local/i18n'
import { Colors } from '../../constant/Colors'
import ProgressCircle from 'react-native-progress-circle'
import { UserContext } from '../../routes'

function CustomDrawerMenue({ navigation }) {


    const { setLogin, setLogout } = useContext(UserContext);


    return (
        <View style={styles.constiner}>
            <Image source={require('../../../assets/Images/img_menu.png')} style={styles.ImgBack} />

            <View style={styles.AbsRab}>
                <View style={styles.Centerd}>

                    <View style={styles.Top}>
                        <ProgressCircle
                            percent={70}
                            radius={50}
                            borderWidth={4}
                            color={Colors.white}
                            shadowColor={Colors.main}
                            bgColor="white"
                            outerCircleStyle={{ overflow: 'hidden', alignSelf: 'flex-end', }}
                        >
                            <Image source={require('../../../assets/Images/girl.jpeg')} style={styles.Pic} />


                        </ProgressCircle>
                        <View style={styles.WrabClmn}>
                            <Text style={styles.name}>ياسر</Text>
                            <Text style={styles.plan}>{i18n.t('Individualplans')}</Text>
                            <View style={styles.start}>
                                <Text style={styles.plan}>75%</Text>
                                <Image source={require('../../../assets/Images/success.png')} style={styles.right} />
                            </View>
                        </View>
                    </View>


                    <TouchableOpacity onPress={() => navigation.closeDrawer()}>
                        <Image source={require('../../../assets/Images/close.png')} style={styles.icon} />
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView style={styles.constiner} showsVerticalScrollIndicator={false}>
                <View style={styles.wrabContaent}>

                    <TouchableOpacity style={styles.Touchable} onPress={() => navigation.navigate('HomePage')}>
                        <Image source={require('../../../assets/Images/home.png')} style={styles.IconContent} resizeMode='contain' />
                        <Text style={styles.AllText}>{i18n.t('Home')}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.Touchable} onPress={() => navigation.navigate('About')}>
                        <Image source={require('../../../assets/Images/info.png')} style={styles.IconContent} resizeMode='contain' />
                        <Text style={styles.AllText}>{i18n.t('about')}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.Touchable} onPress={() => navigation.navigate('Questions')}>
                        <Image source={require('../../../assets/Images/questions.png')} style={styles.IconContent} resizeMode='contain' />
                        <Text style={styles.AllText}>{i18n.t('Frequentlquestions')}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.Touchable} onPress={() => navigation.navigate('Terms')}>
                        <Image source={require('../../../assets/Images/terms.png')} style={styles.IconContent} resizeMode='contain' />
                        <Text style={styles.AllText}>{i18n.t('Termsconditions')}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.Touchable} onPress={() => navigation.navigate('Settings')}>
                        <Image source={require('../../../assets/Images/setting.png')} style={styles.IconContent} resizeMode='contain' />
                        <Text style={styles.AllText}>{i18n.t('settings')}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.Touchable} onPress={() => navigation.navigate('Contactus')}>
                        <Image source={require('../../../assets/Images/contacts.png')} style={styles.IconContent} resizeMode='contain' />
                        <Text style={styles.AllText}>{i18n.t('Contact')}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.Touchable} onPress={() => setLogout()}>
                        <Image source={require('../../../assets/Images/logout.png')} style={styles.IconContent} resizeMode='contain' />
                        <Text style={styles.AllText}>{i18n.t('logout')}</Text>
                    </TouchableOpacity>





                </View>

            </ScrollView>
        </View>
    )
}


const styles = StyleSheet.create({
    constiner: { flex: 1 },
    ImgBack: { height: 230, width, },
    Centerd: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', },
    AbsRab: { position: 'absolute', top: 10, width, paddingHorizontal: '4%' },
    Top: { flexDirection: 'row', alignItems: 'center', top: 50 },
    WrabClmn: { flexDirection: 'column', alignItems: 'center', marginStart: 5 },
    Pic: { height: 100, width: 100, borderRadius: 50, },
    name: { alignSelf: 'flex-start', fontFamily: 'FairuzBold', color: Colors.white, fontSize: 18, },
    plan: { alignSelf: 'flex-start', fontFamily: 'FairuzBold', color: Colors.secondary, fontSize: 12, },
    icon: { height: 45, width: 45, },
    start: { flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start' },
    right: { width: 10, height: 10 },
    wrabContaent: { flexDirection: 'column', marginStart: '5%', justifyContent: 'center', },
    Touchable: { flexDirection: 'row', alignItems: 'center', marginTop: 25 },
    IconContent: { width: 30, height: 30 },
    AllText: { color: Colors.secondary, marginStart: 20, fontFamily: 'FairuzBold', fontSize: 18 }



})




export default CustomDrawerMenue
