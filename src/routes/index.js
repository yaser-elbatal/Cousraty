import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { Authnavigation, MainStackNavigator } from './Navigations';
import { useSelector } from 'react-redux';

export const UserContext = React.createContext();
export const UserProvider = UserContext.Provider;

function AccessRoots() {

    const auth = useSelector(state => state.auth);





    return (

        <NavigationContainer>
            {
                auth.user !== null ?
                    <MainStackNavigator />
                    :
                    <Authnavigation />




            }

        </NavigationContainer>

    )
}

export default AccessRoots
