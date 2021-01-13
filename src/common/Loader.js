import React from 'react'
import { View, ActivityIndicator, Image } from 'react-native';


const Containers = ({ loading, children }) => {

    if (loading) {

        return (
            <View style={{
                flex: 1,
                width: '100%',
                zIndex: 99999,
                backgroundColor: '#ffffff1c',
                alignItems: 'center',
                justifyContent: 'center',
                alignSelf: 'center',
            }}>
                <Image source={require('../../assets/Images/Gif.gif')} style={{ width: 100, height: 90 }} resizeMode='cover' />
                {/* <ActivityIndicator visible={loading} size="large" color={colors.mstarda} style={{ alignSelf: 'center', }} /> */}
            </View>

        );
    }
    else {
        return (
            <View style={{ flex: 1 }}>
                {children}
            </View>
        )
    }



}
export default Containers