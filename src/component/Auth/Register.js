import React, { useState, useRef, useEffect } from 'react'
import { HeaderAuth } from '../../common/HeaderAuth'
import i18n from '../../../Local/i18n'
import { View, StyleSheet, Text, TouchableOpacity, Image, Modal, Platform, Button, Alert } from 'react-native'
import { InputIcon } from '../../common/InputText';
import { Colors } from '../../constant/Colors';
import { width, height } from '../../constant/Dimentions';
import BTN from '../../common/LoginBtn';
import { validateUserName, validateEmail, validatePhone, validateTwoPasswords, validatePassword } from '../../common/Validation';
import { Toaster } from '../../common/Toaster';
import axios from "axios";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import { useDispatch, useSelector } from 'react-redux';
import { Getregister } from '../../store/action/AuthAction';
import Containers from '../../common/Loader';
import { Toast } from 'native-base'
import { SText } from '../../common/SText';



const isIOS = Platform.OS === 'ios';
const latitudeDelta = 0.0922;
const longitudeDelta = 0.0421;



function Register({ navigation }) {

    const [name, setName] = useState('');
    const [phone, setPhone] = useState("");
    const [email, setemail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [Locations, setLocation] = useState('')
    const [isopened, setisopened] = useState(false)
    const [spinner, setspinner] = useState(false)


    const lang = useSelector(state => state.lang.language);

    const dispatch = useDispatch()
    const [mapRegion, setMapRegion] = useState({
        latitude: null,
        longitude: null,
        latitudeDelta,
        longitudeDelta
    });
    let mapRef = useRef(null);

    const FetchDataError = () => {
        fetchData();

    }
    useEffect(() => {
    }, [Locations, mapRegion]);

    useEffect(() => {
        fetchData()
    }, []);


    const _validate = () => {
        let nameErr = validateUserName(name);
        let emailErr = validateEmail(email);
        let phoenErr = validatePhone(phone);
        let passwordErr = validatePassword(password);
        let CpasswordErr = validateTwoPasswords(password, confirmPassword);
        let MapRegeionEroor = mapRegion.latitude == null ? FetchDataError() : null


        return nameErr || emailErr || phoenErr || passwordErr || CpasswordErr || MapRegeionEroor
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
        console.log(status);
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



    const SubmitRegister = () => {
        let val = _validate()
        if (!val) {
            setspinner(true)
            const data = { name, phone, email, latitude: mapRegion.latitude, langtiude: mapRegion.longitude, password, Locations, lang }
            dispatch(Getregister(data, navigation)).then(() => setspinner(false)).catch(err => {

                setspinner(false)
                Toast.show({
                    text: err + `${i18n.t('Somthing')}`,
                    type: "danger",
                    duration: 3000,
                    textStyle: {
                        color: "white",
                        fontFamily: 'FairuzBold',
                        textAlign: 'center'
                    }
                });
            })
        }
        else {
            Toaster(_validate())


        }
    }

    return (
        <HeaderAuth Icon onPress={() => navigation.goBack()}>

            <View style={styles.Wrap}>
                <Text style={styles.TLogin}>{i18n.t('Register')}</Text>

                <InputIcon
                    placeholder={i18n.t('name')}
                    onChangeText={(e) => setName(e)}
                    value={name}
                    styleCont={{ marginTop: 20 }}

                />

                <InputIcon
                    placeholder={i18n.t('email')}
                    onChangeText={(e) => { setemail(e) }}
                    value={email}
                    keyboardType='email-address'
                    styleCont={{ marginTop: 0 }}
                />

                <InputIcon
                    placeholder={i18n.t('phone')}
                    onChangeText={(e) => { setPhone(e) }}
                    value={phone}
                    keyboardType='numeric'
                    styleCont={{ marginTop: 0 }}
                />

                <TouchableOpacity onPress={() => mapRegion.latitude == null ? setisopened(false) : setisopened(true)} style={styles.Location}>
                    {
                        mapRegion.latitude === '' ?
                            <Text style={styles.TexLoc}>{i18n.t('location')}</Text>
                            :
                            <Text numberOfLines={2} style={styles.TexLoc}>{Locations}</Text>
                    }
                    <Image source={require('../../../assets/Images/marker.png')} style={styles.Icon} resizeMode='contain' />
                </TouchableOpacity>

                <InputIcon
                    placeholder={i18n.t('password')}
                    onChangeText={(e) => setPassword(e)}
                    value={password}
                    secureTextEntry
                    styleCont={{ marginTop: 20 }}
                    secureTextEntry={password === '' ? false : true}


                />

                <InputIcon
                    placeholder={i18n.t('confirmPass')}
                    onChangeText={(e) => setConfirmPassword(e)}
                    value={confirmPassword}
                    secureTextEntry
                    secureTextEntry={confirmPassword === '' ? false : true}
                    styleCont={{ marginTop: 0 }}
                />
                <Containers loading={spinner}>
                    <BTN title={i18n.t('Register')} onPress={SubmitRegister} ContainerStyle={styles.Btn} />

                </Containers>
                <View style={styles.Centerd}>
                    <SText title={i18n.t('haveacco')} disabled />
                    <SText title={i18n.t('Login')} onPress={() => navigation.navigate('Login')} style={styles.FPass} />
                </View>

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
                                            <View style={styles.modalView}>

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
                                                    >
                                                        <Image source={require('../../../assets/Images/markerMap.png')} resizeMode='contain' style={{ width: 35, height: 35, }} />
                                                    </Marker>

                                                    <Text style={{ margin: 20, color: Colors.black, fontSize: 14, fontFamily: 'FairuzBold', alignSelf: 'flex-start' }}>{Locations}</Text>

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
        </HeaderAuth>
    )
}


const styles = StyleSheet.create({
    Wrap: {
        justifyContent: 'center',
        marginTop: 30,
    }
    , TLogin: {
        color: Colors.white,
        marginStart: 30,
        fontSize: 22,
        fontFamily: 'FairuzBold',
        alignSelf: 'flex-start'
    },
    Btn:
    {
        marginTop: 0,
        marginVertical: 10
    },
    Location: {
        height: width * .14,
        flexDirection: 'row',
        overflow: 'hidden',
        marginHorizontal: "10%",
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingEnd: 20,
        marginTop: 0
    },
    TexLoc: {
        color: Colors.white,
        fontFamily: 'FairuzBold',
        fontSize: 12,
        marginStart: 15
    },
    Icon: {
        width: 15,
        height: 15
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#737373',
        opacity: Platform.OS === 'ios' ? .98 : .9,

    },
    modalView: {
        backgroundColor: "white",
        borderRadius: 5,
        width: width * .9,
        height: height * .75,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.2,
        shadowRadius: 3.84,
        elevation: 5
    },
    Centerd: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    FPass: {
        color: Colors.main,
        fontSize: 16,
        textDecorationLine: 'underline'
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
export default Register
