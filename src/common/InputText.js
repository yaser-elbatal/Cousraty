import React, { useState } from "react";
import { View, StyleSheet, TextInput, I18nManager, Image, Dimensions, Text, TouchableOpacity } from "react-native";
import { Colors } from "../constant/Colors";


const { width } = Dimensions.get('window')

const InputIcon = ({
    KeyboardStyle,
    label,
    value,
    onChangeText,
    LabelStyle,
    inputStyle,
    placeholder,
    image,
    styleCont,
    imageFocused,
    onPress,
    imgStyle,
    ...props
}) => {

    const [focused, setFocused] = useState(false);

    return (

        <View style={[styles.containerTableTextOverInput, styleCont]}>

            <Text style={[styles.labelText, {
                paddingHorizontal: focused ? 10 : 0, color: focused ? Colors.main : Colors.black, fontSize: 14,

            }, LabelStyle]}  >
                {focused ? label : null}
            </Text>

            <TextInput
                style={[styles.textInput, inputStyle, { borderColor: focused ? Colors.main : Colors.white, color: 'white' }]}
                placeholder={focused ? null : placeholder}
                value={value}
                returnKeyType="done"
                onChangeText={onChangeText}
                placeholderTextColor={Colors.white}
                onFocus={() => setFocused(true)}
                onBlur={value ? () => setFocused(true) : () => setFocused(false)}


                {...props}
            />
            <TouchableOpacity onPress={onPress} style={{
                left: width * .8,
                bottom: width * .09
            }}>
                <Image source={image} style={[styles.image, imgStyle]} />

            </TouchableOpacity>
        </View>


    );
};
export { InputIcon };

const styles = StyleSheet.create({

    containerTableTextOverInput: {
        height: width * .2,
        position: "relative",
        marginHorizontal: "10%",
        marginTop: 30

    },
    labelText: {
        left: 10,
        backgroundColor: 'rgba(255,255,255,0.04)',
        alignSelf: "flex-start",
        zIndex: 9999,
        position: "absolute",
        bottom: width * .168,
        fontFamily: 'FairuzBold',
        color: Colors.black,



    },
    textInput: {
        flex: 1,
        justifyContent: "flex-start",
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderRadius: 10,
        color: Colors.black,
        paddingRight: 20,
        paddingLeft: 20,
        textAlign: I18nManager.isRTL ? "right" : "left",
        fontFamily: "FairuzBold",
        fontSize: 14,

    },
    image: {
        width: width * 0.04,
        maxWidth: width * 0.12,
        height: width * 0.06,
        maxHeight: width * 0.12,
        resizeMode: "contain",

    },
});
