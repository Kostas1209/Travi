import * as React from 'react';

import UserCabinet from './User';
import NewTravelling from './NewTravelling';
import MainScreen from './MainScreen/MainScreenComponent';
import UserTravelling from './UserTravelling/UserTravellingComponent';
import NeededThingsScreen from './NeededThings/NeededThingsComponent';
import { createStackNavigator } from '@react-navigation/stack';
import { TravellComponentFullInformation } from './shared/Travel/Travel';

interface MainScreenProps
{
    navigation: any
}

class Main extends React.Component<MainScreenProps>
{ 
    render(){
        const MainStack = createStackNavigator();
        return(
            <MainStack.Navigator initialRouteName="MainScreen">
                <MainStack.Screen name="MainScreen" component = { MainScreen } options={{ title: 'init window', headerShown: false, }}/>
                <MainStack.Screen name="UserCabinet" component = { UserCabinet } options={{ title: 'user cabinet', headerShown: false, }} />
                <MainStack.Screen name="NewTravelling" component = { NewTravelling } options={{ title: 'new travelling', headerShown: false, }} />      
                <MainStack.Screen name="FullInformationTravelling" component = { TravellComponentFullInformation } options={{ 
                    title: 'user travelling', 
                    headerShown: false, }} /> 
                <MainStack.Screen name="NeededThingsScreen" component = { NeededThingsScreen } options={{ title: 'needed things', headerShown: false, }}/>
            </MainStack.Navigator>
        )
    }
}
export default Main