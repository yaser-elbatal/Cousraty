import React from 'react'
import { TouchableOpacity, Text, StyleSheet, } from 'react-native'
import { Colors } from '../constant/Colors'
function BTN({
    title,
    onPress,
    TextStyle,
    ContainerStyle,
    disabled
}) {
    return (
        <TouchableOpacity style={[styles.container, ContainerStyle]} onPress={onPress} disabled={disabled}>
            <Text style={[styles.sText, TextStyle]}>
                {title}
            </Text>
        </TouchableOpacity>

    )
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.main,
        width: '80%',
        marginHorizontal: 35,
        height: 55,
        marginTop: 30,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15
    },
    sText: {
        fontFamily: 'FairuzBold',
        color: Colors.white,
        fontSize: 18,
        textAlign: 'center',
        alignSelf: 'center'
    }
})
export default BTN
