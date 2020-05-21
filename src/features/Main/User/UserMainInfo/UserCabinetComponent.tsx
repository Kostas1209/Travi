import * as React from 'react';
import * as yup from 'yup';
import { View, Text, Alert, TouchableOpacity, TextInput, DatePickerAndroid, Animated} from 'react-native';
import { Button as PaperButton, Colors, IconButton } from 'react-native-paper';
import { User } from '../../../../types/User';
import { RootState } from '../../../../redux/rootReducer';
import { connect } from 'react-redux';
import getEnvVars from '../../../../../environment';
import  HeaderComponent  from '../../shared/Header';
import { AnyAction } from 'redux';
import { SaveUser } from '../../../../redux/User/actions';
import { Formik} from 'formik';
import {userCabinetStyles} from './UserCabinetStyles';
import { monthNames } from '../../shared/Constants';



const {GOOGLE_API_KEY} = getEnvVars.dev;

interface UserCabinetProps{
    navigation: any,
    user: User,
    changeUserInfo: (user: User) => void,
}

class UserCabinet extends React.Component<UserCabinetProps>
{
    state = {
        location: null,
        dialogIsOpen: true,
        fadeAnimSuccess : new Animated.Value(0),
        fadeAnimError : new Animated.Value(0)
      };

    fadeOutDialogSuccess = () => {
        // Will change fadeAnim value to 0 in 5 seconds
        Animated.sequence(
            [
                Animated.timing(this.state.fadeAnimSuccess, {
                    toValue: 1,
                    duration: 2000
                  }),
                Animated.timing(this.state.fadeAnimSuccess, {
                    toValue: 0,
                    duration: 2000
                  })
            ]
        ).start()
    };

    fadeOutDialogError = () => {
        // Will change fadeAnim value to 0 in 5 seconds
        Animated.sequence(
            [
                Animated.timing(this.state.fadeAnimError, {
                    toValue: 1,
                    duration: 2000
                  }),
                Animated.timing(this.state.fadeAnimError, {
                    toValue: 0,
                    duration: 2000
                  })
            ]
        ).start()
    };
    
    constructor(props)
    {
        super(props);
        console.log(this.props.user.birthday)
    }

    validationSchema = yup.object().shape({
        email: yup.string()
          .label('Email')
          .email('Enter a valid email')
          .required("email is required"),
        name: yup.string()
          .label('Email')
          .min(3,'name min 3 letters')
          .required("Name is required"),
        lastName: yup.string()
          .label('Email')
          .min(3,'lastname min 3 letters')
          .required("lastName is required")
    })

    ChangeDate = async (): Promise<Date> => 
    {
        try {
            const {action, year, month, day} = await DatePickerAndroid.open({
                // Use `new Date()` for current date.
                // May 25 2020. Month 0 is January.
                date: new Date(),
            });
            if (action !== DatePickerAndroid.dismissedAction) {
                return (new Date(year,month,day)); 
            }
            else{
                Promise.reject("Cancel")
            }
        }
        catch ({code, message}) {
              console.warn('Cannot open date picker', message);
        }
    } 
    findCoordinates = () => {
        navigator.geolocation.getCurrentPosition(
          (position : any) => {
            const userLatitude =  position.coords.latitude
            const userLongitude = position.coords.longitude;
            fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${userLatitude},${userLongitude}&key=${GOOGLE_API_KEY}`)
            .then(response => response.json())
            .then((data:any) => {
                console.log("Your position " + data.results[0].formatted_address);
                this.setState({ location : data.results[0].formatted_address});
            });
          },
          error => Alert.alert(error.message),
          { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );
    };
      
    render(){
        return(
            <View>
                <HeaderComponent navigation={this.props.navigation}/>
                <Animated.View style={{
                        //backgroundColor: Colors.green500,
                        display: this.state.dialogIsOpen ? null : "none",
                        width: "60%",
                        height: "10%",
                        borderRadius: 10,
                        alignSelf: "center",
                        opacity: this.state.fadeAnimSuccess
                    }}>
                    <TouchableOpacity 
                    style={{flexDirection: "row",alignContent: "center",
                    alignItems: "center",
                    alignSelf: "center",}}
                    onPress={() => this.setState({dialogIsOpen: false} )}>
                        <Text style={{color: Colors.green500}}>Успешно сохранено</Text>
                        <IconButton icon="checkbox-marked-outline"
                            color={Colors.green500}
                        />
                    </TouchableOpacity>
                </Animated.View>
                <Formik
                    initialValues={{ 
                        name: this.props.user.name,
                        lastName: this.props.user.lastName,
                        username: this.props.user.username,
                        email: this.props.user.email,
                        birthday: new Date(this.props.user.birthday)
                    }}
                    initialTouched={{
                        name: false,
                        lastName: false,
                        email: false, 
                        birthday: false
                    }}
                    onSubmit={
                        values => {
                            let newUser = Object.assign({}, this.props.user);
                            newUser.birthday = values.birthday
                            newUser.email = values.email
                            newUser.lastName = values.lastName
                            newUser.name = values.name
                            newUser.username = values.username
                            this.props.changeUserInfo(newUser)
                            this.fadeOutDialogSuccess()
                        }
                    }
                    validationSchema={this.validationSchema}
                >
                {
                    (prop, dirty, touched) =>(
                        <View>
                            {prop.errors.name && <Text style={{color:Colors.red500}}>{prop.errors.name}</Text>}
                            <TextInput 
                                style={userCabinetStyles.input}
                                onChangeText={(text)=>{prop.setTouched({'name': true });prop.setFieldValue('name',text)}}
                                value={prop.values.name}
                            /> 
                            {prop.errors.lastName && <Text style={{color:Colors.red500}}>{prop.errors.lastName}</Text>}
                            <TextInput 
                                style={userCabinetStyles.input}
                                onChangeText={(text)=>{prop.setTouched({'lastName': true });prop.setFieldValue('lastName',text)}}
                                value={prop.values.lastName}
                            /> 
                            {prop.errors.email && <Text style={{color:Colors.red500}}>{prop.errors.email}</Text>}
                            <TextInput 
                                style={userCabinetStyles.input}
                                onChangeText={(text)=>{prop.setTouched({'email': true });prop.setFieldValue('email',text)}}
                                value={prop.values.email}
                            /> 
                            <View>
                                    <TouchableOpacity style={userCabinetStyles.dateContainer}
                                    onPress={()=>{
                                        this.ChangeDate().then((date:Date) => {
                                            if(date  && date < new Date())
                                            {
                                                prop.setFieldValue('birthday',date)
                                                prop.setTouched({'birthday': true })
                                            }
                                            else{
                                                this.fadeOutDialogError()
                                            }
                                        })
                                    }}
                                    >
                                        {
                                        (monthNames[prop.values.birthday.getMonth()] !== undefined)?
                                            <Text
                                                style={{alignSelf:"center", textAlign: "center"}}
                                            >
                                                {prop.values.birthday.getDate() + "\t" + 
                                                monthNames[prop.values.birthday.getMonth()] + "\t" +prop.values.birthday.getFullYear()}
                                            </Text> 
                                            :
                                            <Text style={{alignSelf:"center", textAlign: "center", left: 10}}>День рождения не указан</Text>
                                        }
                                        <IconButton icon="calendar"
                                            style={{position:"absolute", top: "0%", width:"180%"  }}
                                            color={Colors.purple700}
                                        />
                                    </TouchableOpacity>
                                    <Animated.View style={{
                                        //backgroundColor: Colors.green500,
                                        display: this.state.dialogIsOpen ? null : "none",
                                        width: "60%",
                                        height: "10%",
                                        borderRadius: 10,
                                        alignSelf: "center",
                                        opacity: this.state.fadeAnimError
                                    }}>
                                       <Text style={{color:Colors.red500}}>Дата выбрана неправильно</Text> 
                                    </Animated.View>
                            </View>
                            {/* <TouchableOpacity onPress={this.findCoordinates}>
                                <Text>Find My Coords?</Text>
                                <Text>Location: {this.state.location}</Text>
                            </TouchableOpacity> */}
                            <PaperButton
                                color={Colors.white}
                                style={[userCabinetStyles.button,{
                                    display: (prop.isValid && (prop.touched.name || prop.touched.lastName || prop.touched.email || prop.touched.birthday))?null:"none"
                                }]}
                                onPress={()=>{prop.handleSubmit(); prop.setTouched({'name': false,'lastName': false,'email': false,'birthday': false})}}
                            >Сохранить</PaperButton>
                        </View>
                    )
                }
                </Formik>
            </View>
        )
    }
}

const mapStateToProps = (state: RootState) => ({
    user: state.user.user
})
const mapDispatchToProps = (dispatch: React.Dispatch<AnyAction>) => ({
    changeUserInfo: (user: User) => dispatch(SaveUser({user : user})),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserCabinet);

