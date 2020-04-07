import * as React from 'react';
import {Text, View} from 'react-native';
import  HeaderComponent  from '../../shared/Header';

class UserDocumentComponent extends React.Component<{navigation}>
{
    render()
    {
        return(
            <View>
                <HeaderComponent 
                    navigation={this.props.navigation} 
                />
                <Text>User Document</Text>
            </View>
        )
    }
}

export default UserDocumentComponent;