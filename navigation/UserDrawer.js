import React, { useContext } from 'react'
import { DrawerItemList, createDrawerNavigator } from '@react-navigation/drawer'
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Alert, Dimensions } from 'react-native'
import StackPhoneList from './StackPhoneList'
import { SettingUserScreen, EditPass, EditUser, } from '../screens'
import TopTabNavigation from './TopTabNavigation';
import AsyncStorage from "@react-native-async-storage/async-storage";
import OverLayLoading from '../components/UI/OverLayLoading';
import { AuthContext } from '../store/auth-context';
import { useState } from 'react/cjs/react.development';
const Drawer = createDrawerNavigator()

const { width, height } = Dimensions.get('window')

const UserDrawer = ({ navigation }) => {
    const authContext = useContext(AuthContext);
    const [isLoging, setIsLoging] = useState(false);
    const lo = async () => {
        setIsLoging(true);
        authContext.logOut();
        await AsyncStorage.setItem("KeepLogged", "");
        setIsLoging(false);
    }
    const logOut = () => {
        Alert.alert(
            'LOG OUT',
            'My Alert Msg',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {
                    text: 'OK', onPress: () => { lo() }
                },
            ],
            { cancelable: false }
        );
    }
    if (isLoging) {
        return <OverLayLoading />;
    }
    return (
        <Drawer.Navigator
            drawerContent={
                (props) => {
                    return (
                        <>
                            <SafeAreaView style={{ flex: 1 }}>
                                <View style={styles.headerDrawer} className='bg-slate-300'>
                                    <Image transform={[{ rotate: "180deg" },]} style={styles.headerImage} source={require('../assets/images/imgOnBoarding/Enjoy.png')} />
                                    <Text style={styles.nameManager}>Nguyễn Văn Dũng</Text>
                                    <Text style={styles.textDescription}>USER</Text>
                                </View>
                                <DrawerItemList {...props} />
                            </SafeAreaView>
                            <View style={styles.bottomDrawer}>
                                <TouchableOpacity onPress={() => { }} style={{ paddingVertical: 15 }} >
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Ionicons name='newspaper-outline' size={24} />
                                        <Text style={styles.textBottomDrawer}>Stats</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => { logOut() }} style={{ paddingVertical: 15 }} >
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Ionicons name='log-out-outline' size={24} />
                                        <Text style={styles.textBottomDrawer} >Log out</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </>
                    )
                }
            }
            screenOptions={{
                drawerStyle: { backgroundColor: '#fff', width: 250 },
                headerStyle: { backgroundColor: 'rgb(203 213 225)' },
                headerTintColor: 'black',
                headerTitleStyle: { fontWeight: 'bold' },
                drawerActiveTintColor: 'red',
                drawerLabelStyle: { color: '#111', marginLeft: -15 },
                headerShown: true
            }}>
            <Drawer.Screen name="Home" options={{
                drawerLabel: 'Home',
                title: 'Home',
                drawerIcon: ({ color, size }) => <Ionicons name='home' size={size} color={color} />
            }} component={SettingUserScreen} />
            <Drawer.Screen name="EditUser" options={{
                drawerLabel: 'Edit User',
                title: 'Edit User',
                drawerIcon: ({ color, size }) => <Ionicons name='newspaper-outline' size={size} color={color} />
            }} component={EditUser} />
            <Drawer.Screen name="EditPass" options={{
                drawerLabel: 'Edit Pass',
                title: 'Edit Pass',
                drawerIcon: ({ color, size }) => <Ionicons name='key-outline' size={size} color={color} />
            }} component={EditPass} />
            <Drawer.Screen
                name='Buy' options={{
                    drawerLabel: 'Buy',
                    title: 'Buy',
                    drawerIcon: ({ color, size }) => <Ionicons name='reader-outline' size={size} color={color} />
                }}
                component={TopTabNavigation}
            />


        </Drawer.Navigator>
    )
}

const styles = StyleSheet.create({
    headerDrawer: {
        height: 225,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 2,
        borderBottomColor: '#f4f4f4',
    },
    headerImage: {
        marginTop: 25,
        height: 130,
        width: '50%',
        borderRadius: 100
    },
    nameManager: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#111',
        marginVertical: 6
    },
    textDescription: {
        color: '#111',
    },
    bottomDrawer: {
        padding: 20,
        backgroundColor: 'white',
        borderTopWidth: 2,
        borderTopColor: '#f4f4f4',
    },
    textBottomDrawer: {
        fontSize: 15,
        marginLeft: 5
    }
})
export default UserDrawer