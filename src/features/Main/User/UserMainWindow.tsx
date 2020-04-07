import * as React from 'react';
import {Button as PaperButton, Avatar} from 'react-native-paper';
import { View, TouchableOpacity, Text } from 'react-native';
import HeaderComponent from '../shared/Header';
import { RootState } from '../../../redux/rootReducer';
import { connect } from 'react-redux';
import { User } from '../../../types/User';
import { SaveAvatar } from '../../../redux/User/actions';
import { AnyAction } from 'redux';
//import * as ImagePicker from 'expo-image-picker';

interface Props{
    navigation: any,
    user: User,
    saveUserAvatar: (path: string) => void
}

class MainWindowComponent extends React.Component<Props>
{
    // _pickImage = async () => {
    //     let isAllowAccess = await ImagePicker.requestCameraRollPermissionsAsync()
    //     if(isAllowAccess.granted)
    //     {
    //         let result = await ImagePicker.launchImageLibraryAsync({
    //         mediaTypes: ImagePicker.MediaTypeOptions.All,
    //         allowsEditing: true,
    //         aspect: [4, 3],
    //         quality: 1
    //         });
    //         console.log("image  " + result);
    //         if (!result.cancelled) {
    //             this.props.saveUserAvatar(result.uri);
    //         }
    //     }
    //     else{
    //         alert("We need permission for accessing to your memory")
    //     }
    // }

    render()
    {
        return(
            <View>
                <HeaderComponent 
                    navigation={this.props.navigation}
                />
                {/* <TouchableOpacity onPress={this._pickImage}>
                    {
                        this.props.user.imagePath ? 
                        <Avatar.Image style={{alignSelf: "center"}} size={180} source={{uri: this.props.user.imagePath}} />
                        : <Avatar.Text style={{alignSelf: "center"}} size={180} label={this.props.user.name[0] + this.props.user.lastName[0]} />
                    }
                </TouchableOpacity> */}
                <Text style={{alignSelf: "center"}}>Привет, {this.props.user.name}!</Text>
                <PaperButton onPress={()=>this.props.navigation.navigate("UserInfo")}>User Info</PaperButton>
                <PaperButton onPress={()=>this.props.navigation.navigate("UserDocument")}>User Document</PaperButton>
                <PaperButton onPress={()=>this.props.navigation.navigate("UserSOS")}>User SOS</PaperButton>
            </View>
        )
    }
}

const mapStateToProps = (state: RootState) => ({
    user: state.user.user
})
const mapDispatchToProps = (dispatch: React.Dispatch<AnyAction>) => ({
    saveUserAvatar: (path: string) => dispatch(SaveAvatar({imagePath: path}))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MainWindowComponent);