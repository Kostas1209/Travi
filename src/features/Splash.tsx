import * as React from 'react';
import { Text, Animated, View, ImageBackground } from 'react-native';
import { connect } from 'react-redux';
import { RootState } from 'src/redux/rootReducer';
import { Colors } from 'react-native-paper';

interface SplashProps{
    navigation: any,
    isUserInit: boolean
}

export class Splash extends React.Component<SplashProps>{

    state={
        fadeAnim : new Animated.Value(0),
    }

    componentWillMount() {
        this.fadeOutDialog();
        setTimeout(() => {
            let initialRoute = this.props.isUserInit ? "Main" : "FirstInit";
            this.props.navigation.navigate(initialRoute)
        }, 10000);
    }
    
    fadeOutDialog = () => {

        Animated.timing(this.state.fadeAnim, {
            toValue: 1,
            duration: 5000
        }).start()
    };

    render(){
        return (
            <View style={{flex: 1, backgroundColor: Colors.pink100}}>
                <Animated.View style = {{top: "30%", opacity: this.state.fadeAnim}}>
                    <Text style={{
                        fontFamily: "Darkline",
                        alignSelf: "center",
                        fontSize: 150,
                        color: Colors.purple700}}
                    >Travi</Text>
                </Animated.View>
            </View>
        );
    }
}

const mapStateToProps = (state: RootState) => ({
    isUserInit : state.user.userCreate
  })

export default connect(
    mapStateToProps,
    null
  )(Splash);