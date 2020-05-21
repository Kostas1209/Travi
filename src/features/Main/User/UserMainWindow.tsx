import * as React from 'react';
import {Button as PaperButton, Avatar} from 'react-native-paper';
import { View, TouchableOpacity, Text, PermissionsAndroid } from 'react-native';
import HeaderComponent from '../shared/Header';
import { RootState } from '../../../redux/rootReducer';
import { connect } from 'react-redux';
import { User } from '../../../types/User';
import { SaveAvatar } from '../../../redux/User/actions';
import { AnyAction } from 'redux';
import ImagePicker  from 'react-native-image-picker';

interface Props{
    navigation: any,
    user: User,
    saveUserAvatar: (path: string) => void
}

class MainWindowComponent extends React.Component<Props>
{
    _pickImage = async () => {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            {
                title: "Travi Нужен доступ к вашим файлам",
                message:
                  "Travi пытается получить фото с вашей галереи",
                buttonNegative: "Отказать",
                buttonPositive: "OK"
            })
        if(granted === PermissionsAndroid.RESULTS.GRANTED)
        {
            ImagePicker.showImagePicker({}, (response) => {
                console.log('Response = ', response);
            
                if (response.didCancel) {
                console.log('User cancelled image picker');
                } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
                } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
                } else {
                console.log(response);
            
                // You can also display the image using data:
                // const source = { uri: 'data:image/jpeg;base64,' + response.data };
            
                this.props.saveUserAvatar(response.uri as string)
                }
            });
        }
    }

    render()
    {
        return(
            <View>
                <HeaderComponent 
                    navigation={this.props.navigation}
                />
                <TouchableOpacity onPress={this._pickImage}>
                    {
                        this.props.user.imagePath ? 
                        <Avatar.Image style={{alignSelf: "center"}} size={180} source={{uri: this.props.user.imagePath}} />
                        : <Avatar.Text style={{alignSelf: "center"}} size={180} label={this.props.user.name[0] + this.props.user.lastName[0]} />
                    }
                </TouchableOpacity>
                <Text style={{alignSelf: "center"}}>Привет, {this.props.user.name}!</Text>
                <PaperButton onPress={()=>this.props.navigation.navigate("UserInfo")}>Личная информация</PaperButton>
                <PaperButton onPress={()=>this.props.navigation.navigate("UserDocument")}>Документы</PaperButton>
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