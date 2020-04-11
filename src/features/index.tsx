import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { connect } from 'react-redux';
import { FirstInit } from './FirstInit/FirstInitComponent';
import { RootState } from '../redux/rootReducer';
import Main from './Main/MainComponent';
import  Splash  from './Splash';

interface RootProps{
    navigation: any,
    isUserInit: boolean
}

class Root extends React.Component<RootProps>
{ 
    render(){
        const Stack = createStackNavigator();
        return(
            <NavigationContainer>
                <Stack.Navigator initialRouteName={"Splash"}>
                    <Stack.Screen name="Main" component = {Main} options={{ 
                        cardStyle:{backgroundColor: 'transparent', shadowColor: 'transparent'},
                        title: 'Travello',
                        headerShown: false,  
                        headerLeft: null }} />
                    <Stack.Screen name="FirstInit" component = {FirstInit} options={{ 
                        cardStyle:{backgroundColor: 'transparent', shadowColor: 'transparent'},
                        title: 'first init', 
                        headerShown: false, 
                        headerLeft: null}}/> 
                    <Stack.Screen name="Splash" component = {Splash} options={{ 
                        cardStyle:{backgroundColor: 'transparent', shadowColor: 'transparent'},
                        title: 'Travello',
                        headerShown: false,  
                        headerLeft: null }} />        
                </Stack.Navigator>
            </NavigationContainer>
        )
    }
    
}

const mapStateToProps = (state: RootState) => ({
    isUserInit : state.user.userCreate
  })

export default connect(
    mapStateToProps,
    null
  )(Root);