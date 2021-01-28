import React, { useState, useRef, useEffect } from 'react'
import { View, Image, StyleSheet, TouchableOpacity, Text, I18nManager, Modal, ScrollView, Platform, Button, ImageBackground } from 'react-native'
import { height, width } from '../../constant/Dimentions'
import i18n from '../../../Local/i18n'
import { Colors } from '../../constant/Colors'
import { Container, Content, } from 'native-base'
import ProgressCircle from 'react-native-progress-circle'
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import FirstRouteTab from './FirstRouteTab'
import { InputApp } from '../../common/InputApp'
import BTN from '../../common/LoginBtn'
import { useSelector, useDispatch } from 'react-redux'
import axios from "axios";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import * as ImagePicker from 'expo-image-picker';


import { validateUserName, validateEmail, validatePhone } from '../../common/Validation'
import { updateProfile } from '../../store/action/AuthAction'
import Containers from '../../common/Loader'
import { Toaster } from '../../common/Toaster'
import { ToasterNative } from '../../common/ToasterNative'


const isIOS = Platform.OS === 'ios';
const latitudeDelta = 0.0922;
const longitudeDelta = 0.0421;


function myProfile({ navigation }) {



    const user = useSelector(state => state.auth.user ? state.auth.user.data : null);
    const token = useSelector(state => state.auth.user ? state.auth.user.data ? state.auth.user.data.token : null : null);
    const lang = useSelector(state => state.lang.language);



    const [name, setName] = useState(user.name);
    const [phone, setPhone] = useState(user.phone);
    const [email, setemail] = useState(user.email);
    const [Locations, setLocation] = useState(user.address)
    const [base64, setBase64] = useState(null);
    const [userImage, setUserImage] = useState(user.avatar);
    const [spinner, setSpinner] = useState(false)



    let mapRef = useRef(null);
    const dispatch = useDispatch()

    const [isopened, setisopened] = useState(false)
    const [modalPassword, setModalPasword] = useState(false);

    const [mapRegion, setMapRegion] = useState({
        latitude: user.latitude,
        longitude: user.longitude,
        latitudeDelta,
        longitudeDelta
    });



    useEffect(() => {
    }, [Locations, mapRegion]);

    useEffect(() => {
        fetchData()
    }, []);


    const _validate = () => {
        let nameErr = validateUserName(name);
        let emailErr = validateEmail(email);
        let phoenErr = validatePhone(phone);
        let MapRegeionEroor = mapRegion.latitude == null ? fetchData() : null


        return nameErr || emailErr || phoenErr || MapRegeionEroor
    };






    const _handleMapRegionChange = async (mapCoordinate) => {

        setMapRegion({ latitude: mapCoordinate.latitude, longitude: mapCoordinate.longitude, latitudeDelta, longitudeDelta });

        let getCity = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=';
        getCity += mapCoordinate.latitude + ',' + mapCoordinate.longitude;
        getCity += '&key=AIzaSyCJTSwkdcdRpIXp2yG7DfSRKFWxKhQdYhQ&language=ar&sensor=true';


        try {
            const { data } = await axios.get(getCity);
            setLocation(data.results[0].formatted_address)

        } catch (e) {
            console.log(e);
        }
    };

    const fetchData = async () => {

        // const { status, } = await Permissions.askAsync(Permissions.LOCATION);

        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        let userLocation = {};
        if (status != 'granted') {

            Alert.alert(
                //title
                'Hello',
                //body
                'صلاحيات تحديد موقعك الحالي ملغاه ?',
                [
                    // {
                    //     text: 'Yes',
                    //     onPress: () => console.log('Yes Pressed')
                    // },
                    {
                        text: 'ok',
                        onPress: () => console.log('No Pressed'), style: 'cancel'
                    },
                ],
                { cancelable: false },
                //clicking out side of alert will not cancel
            );

        } else {
            const { coords: { latitude, longitude } } = await Location.getCurrentPositionAsync({});


            userLocation = { latitude, longitude, latitudeDelta, longitudeDelta };

            setMapRegion(userLocation);
            isIOS ? mapRef.current.animateToRegion(userLocation, 1000) : false;

        }
        let getCity = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=';
        getCity += userLocation.latitude + ',' + userLocation.longitude;
        getCity += '&key=AIzaSyCJTSwkdcdRpIXp2yG7DfSRKFWxKhQdYhQ&language=ar&sensor=true';
        // ReactotronConfig.log(getCity);
        try {
            const { data } = await axios.get(getCity);
            setLocation(data.results[0].formatted_address)

        } catch (e) {
            console.log(e);
        }
        const { data } = await axios.get(getCity);
        setLocation(data.results[0].formatted_address)
    };



    const askPermissionsAsync = async () => {
        await Permissions.askAsync(Permissions.CAMERA);
        await Permissions.askAsync(Permissions.CAMERA_ROLL);

    };

    const _pickImage = async () => {

        askPermissionsAsync();

        let result = await ImagePicker.launchImageLibraryAsync({
            aspect: [3, 4],
            base64: true
        });

        if (!result.cancelled) {
            setUserImage(result.uri);
            setBase64(result.base64);
        }
    };


    const UpdateyourProfile = () => {
        let val = _validate()
        if (!val) {
            setSpinner(true)
            dispatch(updateProfile(name, phone, email, base64, mapRegion.latitude, mapRegion.longitude, Locations, lang, token)).then(() => setSpinner(false)).then(() => setModalPasword(false)).catch((err) => {
                setSpinner(false)
                ToasterNative(err, "danger", 'top')

            })

        }
        else {
            ToasterNative(_validate(), "danger", 'top')
        }
    }


    return (
        <Container style={{ flex: 1, }}>
            <Image source={require('../../../assets/Images/img_menu.png')} style={styles.ImgBack} />

            <View style={styles.Abs}>

                <View style={styles.clmn}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: '2%' }}>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginStart: 10 }}>
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
                        <Image source={{ uri: user.avatar }} style={styles.Pic} />
                    </ProgressCircle>

                    <View style={styles.WrabClmn}>
                        <Text style={styles.name}>{user.name}</Text>
                        <Text style={styles.name}>{user.phone}</Text>
                        {/* <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.plan}>{i18n.t('Individualplans')} </Text>
                            <View style={styles.start}>
                                <Text style={styles.plan}> 75%</Text>
                                <Image source={require('../../../assets/Images/success.png')} style={styles.right} />
                            </View>
                        </View> */}
                        <Text style={styles.plan}>{user.email}</Text>
                        <Text style={styles.plan}> {user.address}</Text>

                    </View>

                </View>




            </View>

            <View style={[styles.centeredView,]}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalPassword} >

                    <View style={[styles.centeredView, {}]} >
                        <TouchableOpacity style={[styles.modalView,]} onPress={() => setModalPasword(false)}>
                            <ScrollView style={styles.Scroll} showsVerticalScrollIndicator={false}>
                                <View style={styles.Line}></View>

                                <TouchableOpacity style={{ alignSelf: 'center', marginTop: 10 }} onPress={_pickImage}>

                                    <Image source={{ uri: userImage }} style={styles.ImgBackGround} />
                                </TouchableOpacity>

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


                                <TouchableOpacity onPress={() => setisopened(true)} style={styles.Locations}>
                                    <Text style={styles.TexLoc}>{Locations}</Text>
                                    <Image source={require('../../../assets/Images/location.png')} style={styles.Icon} resizeMode='contain' />
                                </TouchableOpacity>


                                <Containers loading={spinner}>
                                    <BTN title={i18n.t('confirm')} onPress={UpdateyourProfile} ContainerStyle={{ marginTop: 20, marginHorizontal: 15, width: '90%' }} />

                                </Containers>
                            </ScrollView>

                        </TouchableOpacity>

                    </View>
                </Modal>

                {

                    isopened ?
                        <View style={styles.centeredView} >
                            <Modal
                                animationType="slide"
                                transparent={true}
                                visible={isopened}   >
                                {
                                    mapRegion.latitude != null ?

                                        <View style={styles.centeredView}>
                                            <View style={[styles.modalView, { height: height * .87 }]}>

                                                <MapView

                                                    style={{ flex: 1, width: '100%', backgroundColor: Colors.white }}
                                                    region={mapRegion}
                                                    ref={mapRef}
                                                    onRegionChangeComplete={region => setMapRegion(region)}
                                                    onRegionChangeComplete={(e) => _handleMapRegionChange(e)}
                                                    customMapStyle={mapStyle}
                                                    initialRegion={mapRegion}
                                                    showsUserLocation={true}
                                                    zoomControlEnabled={true}
                                                    showsTraffic={true} >

                                                    <Marker
                                                        draggable
                                                        coordinate={mapRegion}
                                                    // onDragEnd={(e) => _handleMapRegionChange(e.nativeEvent.coordinate)}

                                                    >
                                                        <Image source={require('../../../assets/Images/markerMap.png')} resizeMode='contain' style={{ width: 35, height: 35 }} />
                                                    </Marker>
                                                </MapView>
                                                <View >
                                                    <Button title={i18n.t('save')} onPress={() => setisopened(false)} color={Colors.main} />
                                                </View>

                                            </View>
                                        </View>
                                        :
                                        (<View />)
                                }


                            </Modal>
                        </View>
                        :
                        (<View />)
                }
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
        marginTop: 10,
        marginStart: 20
    },
    Abs: {
        position: 'absolute',
        top: 50,
        height
    },
    clmn: {
        flexDirection: 'column',
        width

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
        overflow: 'hidden',
        flex: 1,
        marginBottom: 50

    },
    centeredView: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
        // backgroundColor: '#737373',
        // opacity: Platform.OS === 'ios' ? .97 : .95,


    },
    modalView: {
        backgroundColor: Colors.white,
        borderTopRightRadius: 25,
        borderTopLeftRadius: 25,
        width: width,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.2,
        shadowRadius: 3.84,
        flex: .85
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
    , SmallCard: {
        backgroundColor: Colors.foshia,
        flex: 1, borderRadius: 25,
        width: '93%',
        marginHorizontal: '3%',
        marginTop: 15,
        paddingVertical: 15,
        paddingHorizontal: 5,
        justifyContent: 'center'
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
    Top: { flexDirection: 'row', alignItems: 'center', marginStart: 20, justifyContent: 'center', },
    Pic: { height: 120, width: 120, borderRadius: 50, },
    WrabClmn: { flexDirection: 'column', alignItems: 'center', marginStart: 5, flex: 1, marginEnd: 5 },
    name: { alignSelf: 'flex-start', fontFamily: 'FairuzBold', color: Colors.white, fontSize: 14, },
    plan: { alignSelf: 'flex-start', fontFamily: 'FairuzBold', color: Colors.secondary, fontSize: 12, },
    start: { flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start' },
    right: { width: 10, height: 10 },
    ImgBackGround: {
        width: 100,
        height: 100,
        borderRadius: 25
    },
})
const mapStyle = [
    {
        elementType: "geometry",
        stylers: [
            {
                color: '#CDCDCD'
            }
        ]
    },
    {
        elementType: "FairuzBold",
        stylers: [
            {
                color: Colors.black
            }
        ]
    },
    {
        featureType: "water",
        elementType: "FairuzBold",
        stylers: [
            {
                color: Colors.bg
            }
        ]
    },
    {
        featureType: "water",
        elementType: "FairuzBold",
        stylers: [
            {
                color: "#E8E8E8"
            }
        ]
    }
];

export default myProfile
