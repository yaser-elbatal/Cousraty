import React from 'react'
import { Toast, Root } from 'native-base'

const ToasterNative = (text, type, position) => {
    return (
        <Root>
            {
                Toast.show({
                    text: text,
                    type: type,
                    duration: 3000,
                    position: position,
                    textStyle: {
                        color: "white",
                        fontFamily: 'FairuzBold',
                        textAlign: 'center',
                        alignSelf: 'center'
                    }
                })
            }

        </Root>


    )
}

export { ToasterNative }
