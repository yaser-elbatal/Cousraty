import React, { useState } from 'react'
import { View, Image, StyleSheet, TouchableOpacity, Text, I18nManager, Modal, ScrollView, Platform, KeyboardAvoidingView } from 'react-native'
import { height, width } from '../../constant/Dimentions'
import i18n from '../../../Local/i18n'
import { Colors } from '../../constant/Colors'
import { Container, Content, } from 'native-base'
import ProgressCircle from 'react-native-progress-circle'
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import FirstRouteTab from './FirstRouteTab'
import { InputApp } from '../../common/InputApp'
import BTN from '../../common/LoginBtn'



function myProfile({ navigation }) {


    const [modalPassword, setModalPasword] = useState(false);


    const [name, setName] = useState('');
    const [phone, setPhone] = useState("");
    const [email, setemail] = useState('');
    const [Location, setLocation] = useState(i18n.t('location'))

    const [routes] = useState([
        { key: 'first', title: i18n.t('new') },
        { key: 'second', title: i18n.t('Learningprogress') },
        { key: 'third', title: i18n.t('Finished') },


    ]);
    const [index, setIndex] = useState(0);

    const FirstRoute = () => (
        <FirstRouteTab />
    )


    const SecondRoute = () => (
        <FirstRouteTab />
    )

    const ThirdRoute = () => (
        <FirstRouteTab />
    )
    const renderScene = SceneMap({
        first: FirstRoute,
        second: SecondRoute,
        third: ThirdRoute

    });


    const renderTabBar = props => (
        <TabBar
            {...props}
            getLabelText={({ route }) => route.title}
            activeColor={Colors.main}
            inactiveColor={Colors.secondary}
            labelStyle={{
                fontSize: 12,
                fontFamily: 'FairuzBold',
                padding: 10

            }}
            style={{ backgroundColor: Colors.Labny, }}
            indicatorStyle={{ backgroundColor: Colors.main, top: .4, height: 6, width: 70, marginHorizontal: 25 }}
            pressColor={Colors.main}
        />
    );


    return (
        <Container style={{ flex: 1, }}>
            <Image source={require('../../../assets/Images/img_menu.png')} style={styles.ImgBack} />

            <View style={styles.Abs}>

                <View style={styles.clmn}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            {
                                I18nManager.isRTL ?
                                    <Image source={require('../../../assets/Images/white_back.png')} style={styles.IconBack} resizeMode='contain' />
                                    :
                                    <Image source={require('../../../assets/Images/arrow_left.png')} style={styles.IconBack} resizeMode='contain' />

                            }
                        </TouchableOpacity>


                        <TouchableOpacity onPress={() => setModalPasword(true)}>
                            <Image source={require('../../../assets/Images/edit.png')} style={styles.IconBack} resizeMode='contain' />
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.Notify}>{i18n.t('myProfile')}</Text>
                </View>


                <View style={styles.Top}>
                    <ProgressCircle
                        percent={100}
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
                        <Text style={styles.name}>010223487349</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.plan}>{i18n.t('Individualplans')} </Text>
                            <View style={styles.start}>
                                <Text style={styles.plan}> 75%</Text>
                                <Image source={require('../../../assets/Images/success.png')} style={styles.right} />
                            </View>
                        </View>
                        <Text style={styles.plan}> yasser@gmail.com</Text>
                        <Text style={styles.plan}> المحله الكبري الغربيه</Text>

                    </View>

                </View>



                <View style={styles.contents}>
                    <TabView
                        navigationState={{ index, routes }}
                        renderScene={renderScene}
                        onIndexChange={setIndex}
                        initialLayout={width}
                        style={{ borderTopLeftRadius: 55, borderTopRightRadius: 55, }}
                        renderTabBar={renderTabBar}
                    />


                </View>
            </View>

            <View style={[styles.centeredView,]}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalPassword} >

                    <View style={[styles.centeredView, {}]} onPress={() => setModalPasword(false)}>
                        <View style={[styles.modalView, { height: height * .65, }]}>
                            <ScrollView style={styles.Scroll} showsVerticalScrollIndicator={false}>
                                <View style={styles.Line}></View>

                                <InputApp
                                    label={i18n.t('name')}
                                    placeholder={i18n.t('name')}
                                    onChangeText={(e) => setName(e)}
                                    value={name}
                                    styleCont={{ marginTop: 20 }}

                                />

                                <InputApp
                                    label={i18n.t('email')}
                                    placeholder={i18n.t('email')}
                                    onChangeText={(e) => { setemail(e) }}
                                    value={email}
                                    keyboardType='email-address'
                                    styleCont={{ marginTop: 10 }}
                                />

                                <InputApp
                                    label={i18n.t('phone')}
                                    placeholder={i18n.t('phone')}
                                    onChangeText={(e) => { setPhone(e) }}
                                    value={phone}
                                    keyboardType='numeric'
                                    styleCont={{ marginTop: 10 }}
                                />

                                <TouchableOpacity onPress={() => { }} style={styles.Locations}>
                                    <Text style={styles.TexLoc}>{Location}</Text>
                                    <Image source={require('../../../assets/Images/location.png')} style={styles.Icon} resizeMode='contain' />
                                </TouchableOpacity>



                                <BTN title={i18n.t('confirm')} onPress={() => setModalPasword(false)} ContainerStyle={{ marginTop: 20, marginHorizontal: 15, width: '90%' }} />
                            </ScrollView>

                        </View>

                    </View>
                </Modal>
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
        width: 300,
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
        flex: 1,
        marginBottom: 50

    },
    centeredView: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
        backgroundColor: '#737373',
        opacity: Platform.OS === 'ios' ? .97 : .95,


    },
    modalView: {
        backgroundColor: Colors.white,
        borderTopRightRadius: 25,
        borderTopLeftRadius: 25,
        width: width,
        height: height * .5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.2,
        shadowRadius: 3.84,
    },
    Scroll: {
        flex: 1,
        backgroundColor: Colors.white,
        borderTopRightRadius: 25,
        borderTopLeftRadius: 25,
    },
    Locations: {
        height: width * .14,
        flexDirection: 'row',
        overflow: 'hidden',
        marginHorizontal: "5%",
        backgroundColor: Colors.white,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingEnd: 20,
        marginTop: 0,
        borderWidth: .8,
        borderColor: Colors.smothblack
    },
    TexLoc: {
        color: Colors.black,
        fontFamily: 'FairuzLight',
        fontSize: 14,
        marginStart: 15
    },
    Icon: {
        width: 15,
        height: 15
    }
    ,
    Top: { flexDirection: 'row', alignItems: 'center', marginStart: 20 },
    Pic: { height: 120, width: 120, borderRadius: 50, },
    WrabClmn: { flexDirection: 'column', alignItems: 'center', marginStart: 5 },
    name: { alignSelf: 'flex-start', fontFamily: 'FairuzBold', color: Colors.white, fontSize: 14, },
    plan: { alignSelf: 'flex-start', fontFamily: 'FairuzBold', color: Colors.secondary, fontSize: 12, },
    start: { flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start' },
    right: { width: 10, height: 10 },

})

export default myProfile
