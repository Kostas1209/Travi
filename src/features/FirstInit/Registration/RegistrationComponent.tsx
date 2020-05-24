import * as React from 'react';
import { View, ImageBackground, KeyboardAvoidingView, Text} from "react-native";
import {TextInput as PaperInput, Colors, Button as PaperButton} from 'react-native-paper';
import styles from './RegistrationStyles';  
import { AnyAction } from 'redux';
import { User } from '../../../types/User';
import { SaveUser, setIsUserInit } from '../../../redux/User/actions';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import * as yup from 'yup'; 

const re = new RegExp("[а-я]+");

interface RegistrationProps{
    navigation: any
    saveUserInfo: (user: User) => void
    setUserIsInit: (bool: boolean)=>void
}

interface RegistrationState{
    
}

class RegistrationComponent extends React.Component<RegistrationProps, RegistrationState>
{

    validationSchema = yup.object().shape({
        email: yup.string()
          .label('Email')
          .email('Email введён не правильно')
          .required("Требуется email "),
        name: yup.string()
          .label('Имя')
          .min(2,'Имя минимум 2 буквы')
          .required("Требуется имя")
          .matches(re, "Имя должно содержать только буквы кириллицы"),
        lastName: yup.string()
          .label('Email')
          .min(2,'Фамилия минимум 2 буквы')
          .required("Требуется фамилия")
          .matches(re, "Фамилия должна содержать только буквы кириллицы"),
    })


    render()
    {
        return(
                <ImageBackground
                    style={{flex:1}}
                    source={require("../../../../assets/a.png")}
                >
                    <View style={styles.container}>
                        <Text style={styles.logoText}>Travi</Text>
                        <Formik
                            initialValues={{ 
                                name: "",
                                lastName: "",
                                username: "",
                                email: ""
                            }}
                            onSubmit={
                                values => {
                                    this.props.navigation.navigate("Main")
                                    let user: User = new User(values.name, values.lastName, values.email, values.username);
                                    this.props.saveUserInfo(user);
                                    this.props.setUserIsInit(true);
                                    this.props.navigation.reset();
                                }
                            }
                            validationSchema={this.validationSchema}
                        >
                            {
                                (prop) =>(
                                <View>
                                    <PaperInput label='Имя' 
                                    style={styles.input}
                                    selectionColor="pink"
                                    onChangeText={prop.handleChange('name')}
                                    value={prop.values.name}
                                    />
                                    <Text style={{color:Colors.red500}}>{prop.errors.name}</Text>

                                    <PaperInput
                                    label='Фамилия'
                                            style={styles.input}
                                            selectionColor="pink"
                                            mode="flat"
                                            onChangeText={prop.handleChange('lastName')}
                                            value={prop.values.lastName}/>
                                    <Text style={{color:Colors.red500}}>{prop.errors.lastName}</Text>
                                    
                                    <PaperInput 
                                            label='E-mail'
                                            style={styles.input}
                                            selectionColor="pink"
                                            mode="flat"
                                            onChangeText={prop.handleChange('email')}
                                            value={prop.values.email}
                                                />
                                    <Text style={{color:Colors.red500}}>{prop.errors.email}</Text>

                                    <PaperButton 
                                        style={[styles.button,{display: !prop.isValid?"none":null}]}
                                        color={Colors.white}
                                        onPress = {prop.handleSubmit}
                                    >Сохранить</PaperButton>
                                </View>
                                )
                            }
                            
                        </Formik>
                    </View>
                </ImageBackground>
        )
    }
}


const mapDispatchToProps = (dispatch: React.Dispatch<AnyAction>) => ({
    saveUserInfo: (user: User) =>dispatch(SaveUser({user: user})),
    setUserIsInit: (bool : boolean) => dispatch(setIsUserInit({userCreate: bool}))
  })

export default connect(
    null,
    mapDispatchToProps
)(RegistrationComponent);