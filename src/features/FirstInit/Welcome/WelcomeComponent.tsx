import * as React from 'react';
import { Text, View, ImageBackground } from 'react-native';
import styles from "./WelcomeStyles";
import { IconButton, Colors } from 'react-native-paper';
//import * as Font from 'expo-font';

export class WelcomeComponent extends React.Component<{navigation}> {

    state = {
        fontIsLoading: true
    }

    // async componentDidMount() {
    //     await Font.loadAsync({
    //         'Darkline': require('../../../../assets/fonts/Darkline.ttf'),
    //       })
    //     Font.loadAsync({
    //       'Nautilus': require('../../../../assets/fonts/Nautilus.otf'),
    //     }).then(()=> this.setState({fontIsLoading : true}))
       
    //   }

    render(){
        return(
            <View>
                <ImageBackground
                    style={{width:"100%",height: '100%'}}
                    source={require("../../../../assets/a.png") }
                >
                    {
                        this.state.fontIsLoading ? <Text style={styles.logoText}>Travi</Text> : null
                    }
                     {
                        this.state.fontIsLoading ? <Text style={[styles.welcomeText]}>
                        Добро пожаловать!{"\n"}
                        Это - твой личный помощник в организации путешествий.{"\n"}
                        Для начала заполним немного информации.{"\n"}
                        Let's start!
                    </Text> : null
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

