import React, { useState } from "react";
import { View, StyleSheet, TextInput, I18nManager, Image, Dimensions, Text, TouchableOpacity } from "react-native";
import { Colors } from "../constant/Colors";


const { width } = Dimensions.get('window')

const InputApp = ({
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
                paddingHorizontal: focused ? 10 : 0, color: focused ? Colors.main : Colors.smothblack, fontSize: 16
            }, LabelStyle]}  >
                {focused ? label : null}
            </Text>

            <TextInput
                style={[styles.textInput, inputStyle, { borderColor: focused ? Colors.main : Colors.smothblack, }]}
                placeholder={focused ? null : placeholder}
                value={value}
                returnKeyType="done"
                onChangeText={onChangeText}
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
export { InputApp };

const styles = StyleSheet.create({

    containerTableTextOverInput: {
        height: width * .2,
        position: "relative",
        marginHorizontal: "5%",
        marginTop: 30,
        backgroundColor: Colors.white

    },
    labelText: {
        left: 20,
        backgroundColor: Colors.white,
        alignSelf: "flex-start",
        fontSize: width * .03,
        zIndex: 10,
        position: "absolute",
        bottom: width * .175,
        fontFamily: 'FairuzBold',
        color: Colors.secondary,



    },
    textInput: {
        flex: 1,
        justifyContent: "flex-start",
        paddingHorizontal: 25,
        borderColor: '#E0E0E0',
        borderWidth: 1,
        borderRadius: 5,
        color: Colors.secondary,
        paddingRight: 20,
        paddingLeft: 20,
        backgroundColor: Colors.white,

        textAlign: I18nManager.isRTL ? "right" : "left",
        fontFamily: "FairuzBold",
        fontSize: 16,
    },
    image: {
        width: width * 0.04,
        maxWidth: width * 0.12,
        height: width * 0.06,
        maxHeight: width * 0.12,
        resizeMode: "contain",

    },
});
