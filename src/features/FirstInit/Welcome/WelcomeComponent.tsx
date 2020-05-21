import * as React from 'react';
import { Text, View, ImageBackground, Dimensions } from 'react-native';
import styles from "./WelcomeStyles";
import { IconButton, Colors } from 'react-native-paper';
//import * as Font from 'expo-font';

const width = Dimensions.get('screen').width

export class WelcomeComponent extends React.Component<{navigation}> {

    render(){
        return(
                <ImageBackground
                    style={{width:"100%",height: '100%'}}
                    source={require("../../../../assets/a.png") }
                >
                    <View style={{flexDirection: "column", alignSelf: "center"}}>
                    <Text style={[styles.logoText,{fontSize: width * 0.5}]}>Travi</Text>
                        <Text style={[styles.welcomeText,{fontSize: width * 0.05}]}>
                            Добро пожаловать!{"\n"}
                            Это - твой личный помощник в организации путешествий.{"\n"}
                            Для начала заполним немного информации.{"\n"}
                            Let's start!
                        </Text>
                        
                        <IconButton
                            style={styles.button}
                            icon="arrow-down-circle"
                            color={Colors.pink100}
                            size={80}
                            onPress={() =>{
                                this.props.navigation.navigate('Registration');
                            }}
                        />
                    </View>
                </ImageBackground>
        )
    }
    
}

