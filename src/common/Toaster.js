import React from "react";
import Toast from "react-native-tiny-toast";
import { Dimensions } from "react-native";
import { Colors } from "../constant/Colors";
import { width } from "../constant/Dimentions";


const Toaster = (message, backgroundColors) => {
    return Toast.show(message, {
        position: Toast.position.BOTTOM,
        containerStyle: {

            backgroundColor: backgroundColors ? backgroundColors : 'red',
            paddingHorizontal: width * 0.09,
            borderRadius: 5,
            width,
            bottom: 0,
        },
        textColor: Colors.white,
        textStyle: {
            fontFamily: "FairuzBold",
            fontSize: width * 0.04,
            flex: 1
        },
        duration: 3000,
    });
};

export { Toaster };
