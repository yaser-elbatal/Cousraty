import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { Authnavigation, MainStackNavigator } from './Navigations';
import { AsyncStorage } from 'react-native';



function AccessRoots() {

    const [Token, SetToken] = useState('')

    useEffect(() => {
        AsyncStorage.getItem('token').then((tok) => {
            SetToken(tok)
        })
    }, [])



    return (
        <NavigationContainer>
            <MainStackNavigator />

            {/* {
                Token === 'Auth' ?
                    <Authnavigation />
                    :

                    <MainStackNavigator />
            } */}
        </NavigationContainer>
    )
}

export default AccessRoots
