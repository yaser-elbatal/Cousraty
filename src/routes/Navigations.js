import * as React from 'react'
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from '@react-navigation/drawer';

import LanguagePage from '../component/Auth/LanguagePage'
import Login from '../component/Auth/Login'
import ForgetPass from '../component/Auth/ForgetPass';
import NewPassword from '../component/Auth/NewPassword';
import Register from '../component/Auth/Register';
import CodeActivation from '../component/Auth/CodeActivation';



import HomePage from '../component/Home/HomePage';
import About from '../component/Drawer/About';
import CustomDrawerMenue from '../component/Drawer/CustomDrawerMenue';
import { width } from '../constant/Dimentions';
import Notifications from '../component/Home/Notifications';
import Terms from '../component/Drawer/Terms';
import Questions from '../component/Drawer/Questions';
import Settings from '../component/Drawer/Settings';
import Contactus from '../component/Drawer/Contactus';
import Subsections from '../component/Home/Subsections';
import PricePay from '../component/Home/PricePay';
import SuccessPayment from '../component/Home/SuccessPayment';
import myProfile from '../component/Home/myProfile';


const Stack = createStackNavigator();
const MainStack = createStackNavigator();
const DrawerNav = createDrawerNavigator();
const HomeStack = createStackNavigator();



export const Authnavigation = () => {


    return (
        <Stack.Navigator initialRouteName='LanguagePage' headerMode='none'>
            <Stack.Screen name='LanguagePage' component={LanguagePage} />
            <Stack.Screen name='Login' component={Login} />
            <Stack.Screen name='ForgetPass' component={ForgetPass} />
            <Stack.Screen name='NewPassword' component={NewPassword} />
            <Stack.Screen name='Register' component={Register} />
            <Stack.Screen name='CodeActivation' component={CodeActivation} />
        </Stack.Navigator>
    )
}

export const MainStackNavigator = () => {


    return (
        <MainStack.Navigator initialRouteName='DrawerNavigator' headerMode='none'>
            <MainStack.Screen name='DrawerNavigator' component={DrawerNavigator} />
            <MainStack.Screen name='Notifications' component={Notifications} />
            <MainStack.Screen name='Subsections' component={Subsections} />
            <MainStack.Screen name='PricePay' component={PricePay} />
            <MainStack.Screen name='SuccessPayment' component={SuccessPayment} />
            <MainStack.Screen name='myProfile' component={myProfile} />

        </MainStack.Navigator>
    )
}

export const DrawerNavigator = () => {
    return (
        <DrawerNav.Navigator headerMode='none' initialRouteName='HomePage' drawerContent={(props) => <CustomDrawerMenue {...props} />} drawerStyle={{ width: width }}>
            <DrawerNav.Screen name='HomePage' component={HomePage} />
            <DrawerNav.Screen name='About' component={About} />
            <DrawerNav.Screen name='Terms' component={Terms} />
            <DrawerNav.Screen name='Questions' component={Questions} />
            <DrawerNav.Screen name='Settings' component={Settings} />
            <DrawerNav.Screen name='Contactus' component={Contactus} />

        </DrawerNav.Navigator>
    )
}



