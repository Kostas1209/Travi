import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ChangeRegion from './ChangeRegion/NewTravellingComponent';
import ChangeDate from './ChangeDate/ChangeDateComponent';

interface RootProps{
    navigation: any,
    isUserInit: boolean
}

class Root extends React.Component<RootProps>
{ 
    render(){
        const Stack = createStackNavigator();
        let initialRoute = "ChangeRegion";
        return(
                <Stack.Navigator initialRouteName={initialRoute}>
                    <Stack.Screen name="ChangeRegion" component = {ChangeRegion} options={{ title: 'Travello',headerShown: false }} />   
                    <Stack.Screen name="ChangeDate" component = {ChangeDate} options={{ title: 'Travello',headerShown: false }} />       
                </Stack.Navigator>
        )
    }
    
}

export default Root