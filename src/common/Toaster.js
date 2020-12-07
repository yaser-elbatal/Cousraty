import React from "react";
import Toast from "react-native-tiny-toast";
import { Dimensions } from "react-native";
import { Colors } from "../constant/Colors";
import { width } from "../constant/Dimentions";


const Toaster = (message) => {
    return Toast.show(message, {
        position: Toast.position.CENTER,
        containerStyle: {
            backgroundColor: 'red',
            paddingHorizontal: width * 0.05,
            borderRadius: 5,
        },
        textColor: Colors.white,
        textStyle: {
            fontFamily: "FairuzBold",
            fontSize: width * 0.04,
        },
        duration: 3000,
    });
};

export { Toaster };
