import * as React from 'react';
import { Text, View, ImageBackground } from 'react-native';
import styles from "./WelcomeStyles";
import { IconButton, Colors } from 'react-native-paper';
//import * as Font from 'expo-font';

export class WelcomeComponent extends React.Component<{navigation}> {

    render(){
        return(
            <View>
                <ImageBackground
                    style={{width:"100%",height: '100%'}}
                    source={require("../../../../assets/a.png") }
                >
                    <Text style={styles.logoText}>Travi</Text>
                    <Text style={[styles.welcomeText]}>
                        Добро пожаловать!{"\n"}
                        Это - твой личный помощник в организации путешествий.{"\n"}
                        Для начала заполним немного информации.{"\n"}
                        Let's start!
                    </Text>
                    }
                    
                    <IconButton
                    style={styles.button}
                    icon="arrow-down-circle"
                    color={Colors.pink100}
                    size={80}
                    onPress={() =>{
                        this.props.navigation.navigate('Registration');
                    }
                    }
                    />
                </ImageBackground>
            </View>
        )
    }
    
}

