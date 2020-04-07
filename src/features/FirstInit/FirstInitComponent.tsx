import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { WelcomeComponent } from './Welcome/WelcomeComponent';
import RegistrationComponent  from './Registration/RegistrationComponent';

const FirstInitialStack = createStackNavigator();

export class FirstInit extends React.Component
{
    render(){
        return(
            // <ImageBackground
            //     style={{width:"100%",height: '100%'}}
            //     source={require("../../../assets/mountainBackground.jpg")}
            // >
                <FirstInitialStack.Navigator initialRouteName="Welcome" mode="modal">
                    <FirstInitialStack.Screen name="Welcome" component = {WelcomeComponent} options={{
                        cardStyle:{backgroundColor: 'transparent', shadowColor: 'transparent'},
                        title: 'Hello!', 
                        headerShown: false   }} />      
                    <FirstInitialStack.Screen name="Registration" component = {RegistrationComponent} options={{
                        cardStyle:{backgroundColor: 'transparent', shadowColor: 'transparent'},
                        title: "Let's meet" , 
                        headerShown: false }} />
                </FirstInitialStack.Navigator>
            //</ImageBackground>
        )
    }
    
}
