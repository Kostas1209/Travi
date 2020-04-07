import * as React from 'react';
import { IconButton, Colors, Avatar } from 'react-native-paper';
import { View, TouchableOpacity} from 'react-native';
import { Header } from 'react-native-elements';
//import * as Font from 'expo-font';
import { User } from '../../../types/User';
import { connect } from 'react-redux';
import { RootState } from '../../../redux/rootReducer';

const MyLeftComponent = (navigation) =>
{
    return(
        <IconButton 
                icon = "home"
                color = {Colors.white}
                size={30}
                onPress={()=>{navigation.navigate("MainScreen")}}
                animated={true}
            />
        
    )
}

declare type Props ={
    navigation : any,
    user: User
}

const MyRightComponent: React.SFC<Props> = ( {navigation, user} ) =>
{
    return (
        <TouchableOpacity onPress={()=>{navigation.navigate("UserCabinet")}}>
        {
            user.imagePath ? 
            <Avatar.Image style={{alignSelf: "center"}} size={10} source={{uri: user.imagePath}} />
            : <Avatar.Text style={{alignSelf: "center"}} size={10} label={user.name[0] + user.lastName[0]} />
        }
        </TouchableOpacity>
    )
} 

const mapStateToProps = (state: RootState) => ({
    user: state.user.user
})


class HeaderComponent extends React.Component<{navigation, user: User}> 
{
    state = {
        fontIsLoading: false
    }
    // async componentDidMount() {
    //     await Font.loadAsync({
    //         'Darkline': require('../../../../assets/fonts/Darkline.ttf'),
    //       })
    //     Font.loadAsync({
    //       '17687': require('../../../../assets/fonts/17687.ttf'),
    //     }).then(()=> this.setState({fontIsLoading : true}))
       
    //   }
      
    render()
    {
        return (
            <View>
                {
                    this.state.fontIsLoading ? 
                    <Header 
                        //leftComponent={ MyLeftComponent(this.props.navigation) }
                        centerComponent={{onPress:()=>this.props.navigation.navigate("MainScreen"), text: 'Travi', style: { color: Colors.pink100, fontFamily: "Darkline", fontSize: 40} }}
                        rightComponent={
                            <TouchableOpacity onPress={()=>{this.props.navigation.navigate("UserCabinet")}}>
                            {
                                this.props.user.imagePath ? 
                                <Avatar.Image style={{alignSelf: "center"}} size={40} source={{uri: this.props.user.imagePath}} />
                                : <Avatar.Text style={{alignSelf: "center"}} size={40} label={this.props.user.name[0] + this.props.user.lastName[0]} />
                            }
                            </TouchableOpacity>
                        }
                        containerStyle={{backgroundColor: "#750575"}}
                    /> : null
                }
            </View>
        )
    }
}

export default connect(
    mapStateToProps
)(HeaderComponent);