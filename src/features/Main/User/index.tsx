import * as React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import UserMainWindow from "./UserMainWindow";
import UserDocument from "./UserDocuments/UserDocumentComponent";
import UserInfo from './UserMainInfo/UserCabinetComponent';

class UserNavigation extends React.Component
{ 
    render(){
        const UserStack = createStackNavigator();
        return(
            <UserStack.Navigator initialRouteName="UserMainWindow">
                <UserStack.Screen name="UserMainWindow" component = { UserMainWindow } options={{ title: 'user main window', headerShown: false, }} />
                <UserStack.Screen name="UserDocument" component = { UserDocument } options={{ title: 'UserDocument', headerShown: false, }} />       
                <UserStack.Screen name="UserInfo" component = { UserInfo } options={{ 
                    title: 'UserInfo', 
                    headerShown: false, }} /> 
            </UserStack.Navigator>
        )
    }
}

export default UserNavigation