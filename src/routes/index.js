import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { Authnavigation, MainStackNavigator } from './Navigations';
import { AsyncStorage } from 'react-native';

export const UserContext = React.createContext();
export const UserProvider = UserContext.Provider;

function AccessRoots() {

    const [token, settoken] = useState("");

    const setLogin = () => {
        settoken("yasser");
    };
    const setLogout = () => {
        settoken("");
    };



    return (
        <UserProvider value={{ setLogin, setLogout }}>

            <NavigationContainer>

                {
                    token ?
                        <MainStackNavigator />
                        :
                        <Authnavigation />




                }

            </NavigationContainer>
        </UserProvider>

    )
}

export default AccessRoots
