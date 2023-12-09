import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import PhoneEditScreen from '../screens/Admin/PhoneEditScreen'
import ManagePhoneScreen from '../screens/Admin/ManagePhoneScreen'
const Stack = createStackNavigator()
const StackPhoneList = ({ navigation, route }) => {
    React.useEffect(() => {
        if (route.params) {
            console.log(route.params);
            // Lấy giá trị của headerShown từ tham số màn hình (nếu có)
            const { headerShown } = route.params;
            // Thực hiện bất kỳ xử lý nào với giá trị headerShown ở đây
        }
    }, [route.params]);
    return (
        <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: 'red' }, headerTintColor: 'white', headerShown: false }}>
            <Stack.Screen name='ManagePhoneScreen' component={ManagePhoneScreen} options={{
                title: 'Phone Manage',
            }} />
            <Stack.Screen name='PhoneEditScreen' component={PhoneEditScreen}
            />
        </Stack.Navigator>
    )
}

export default StackPhoneList