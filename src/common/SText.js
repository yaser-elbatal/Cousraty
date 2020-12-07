import React from "react";
import { Text, StyleSheet, I18nManager, TouchableOpacity } from "react-native";
import { Colors } from "../constant/Colors";

const SText = ({ title, style, onPress, disabled, ...props }) => (
    <TouchableOpacity onPress={onPress} disabled={disabled} >
        <Text style={[styles.text, style]}   {...props}>
            {title}
        </Text>
    </TouchableOpacity>
);
export { SText };

const styles = StyleSheet.create({
    text: {
        fontSize: 16,
        color: Colors.white,
        fontFamily: "FairuzNormal",
        textAlign: 'center',
        paddingTop: 15,

    },
});
