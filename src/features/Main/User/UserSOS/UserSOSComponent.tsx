import * as React from 'react';
import {Text, View} from 'react-native';
import  HeaderComponent  from '../../shared/Header';

class SOSComponent extends React.Component<{navigation}>
{
    render()
    {
        return(
            <View>
                <HeaderComponent 
                    navigation={this.props.navigation}
                />
                <Text>SOS</Text>
            </View>
        )
    }
}

export default SOSComponent;