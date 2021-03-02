import React, { useState } from 'react'
import { TouchableOpacity, StyleSheet, View, Platform } from 'react-native'
import { height, width } from '../constant/Dimentions'
import { InputIcon } from './InputText'
import i18n from '../../Local/i18n'
import { Colors } from '../constant/Colors'
import Modal from "react-native-modal";

const ModalCommon = ({ visible, children, onToggle, selectItem, modalStyle, ...props }) => {


    const [modaal, setModal] = useState(visible)

    const onFade = () => {
        selectItem(!modaal)
        setModal(!modaal)
        console.log('done')
    }

    return (
        <Modal
            animationType="slide"
            style={[styles.Modals, [modalStyle]]}
            visible={visible}
            onBackdropPress={onFade}
            onBackButtonPress={onFade}
            {...props}
        >

            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    {children}
                </View>
            </View>

        </Modal>


    )
}


const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
        backgroundColor: Colors.white,
        opacity: Platform.OS = 'ios' ? .7 : .7,

    },
    modalView: {
        backgroundColor: "white",
        borderTopRightRadius: 25,
        borderTopLeftRadius: 25,
        width: width,
        height: '90%',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.2,
        shadowRadius: 3.84,
        elevation: 5,
        flex: 1
    },
    Modals: {
        flex: 1
    }
})
export default ModalCommon
