import * as React from 'react'; 
import { View } from 'react-native';
import UserTravelling from '../UserTravelling/UserTravellingComponent';


const MainScreenComponent = ({navigation}) =>
{
    return(
        <View>
            <UserTravelling navigation={navigation} />
        </View>
    )
}

export default MainScreenComponent;