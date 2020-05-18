import * as React from 'react';
import { View, Text, DatePickerAndroid, TouchableOpacity, Animated} from 'react-native';
import HeaderComponent  from '../../shared/Header';
import { styles } from './ChangeDateStyles';
import { Button as PaperButton, Colors, IconButton} from 'react-native-paper';
import { Travelling } from '../../../../types/Travelling';
import { createTravelling } from '../../../../redux/Travelling/actions';
import { AnyAction } from 'redux';
import { connect } from 'react-redux';
import { monthNames } from '../../shared/Constants';
import DateRangePicker from '../../../../services/DateRangePicker';
import PushNotification from "react-native-push-notification";


interface Props{
    navigation : any,
    route :any,
    createTravel : (travelling: Travelling) => void
}

interface State{
    arriveDate: Date | undefined,
    comeDate: Date | undefined,
    name: string,
    nameCorrect: boolean,
    calendarIsOpen: boolean,
    successEnterDate: boolean
    fadeAnim : Animated.Value
}
const INITIAL_STATE: State = {
    arriveDate: undefined,
    comeDate: undefined,
    name: "",
    nameCorrect: false,
    calendarIsOpen: false,
    successEnterDate : false,
    fadeAnim : new Animated.Value(0)
}

class ChangeDate extends React.Component<Props, State>
{
    state=INITIAL_STATE

    fadeOutDialog = () => {
        // Will change fadeAnim value to 0 in 5 seconds
        Animated.sequence(
            [
                Animated.timing(this.state.fadeAnim, {
                    toValue: 1,
                    duration: 3000
                  }),
                Animated.timing(this.state.fadeAnim, {
                    toValue: 0,
                    duration: 3000
                  })
            ]
        ).start()
        console.log("animation is going")
    }

    testPush = () =>
    {
        PushNotification.localNotification({
            title: "My Notification Title", // (optional)
            message: "My Notification Message", // (required)
        });
    }

    schedulPush = () => {
        PushNotification.localNotificationSchedule({
            //... You can use all the options from localNotifications
            message: "My schedull notification message", // (required)
            date: new Date(Date.now() + 30 * 1000) // in 60 secs
        });
    }

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
                return null
            }
          } catch ({code, message}) {
            console.warn('Cannot open date picker', message);
          }
    }

    render(){
        return(
            <View>
                <HeaderComponent navigation={this.props.navigation} />
                {/* <PaperButton
                    onPress={()=>{
                        this.schedulPush()
                        this.testPush()
                    }}
                >
                    Notification
                </PaperButton> */}
                <View>
                    <Text style={styles.Text}>{this.props.route.params.town}</Text>
                    <TouchableOpacity
                        style={{alignSelf:"center", marginTop: 30, borderRadius: 5, backgroundColor: Colors.white,width:"80%"}}
                        onPress={()=>{this.setState({calendarIsOpen: !this.state.calendarIsOpen})}}
                    >
                        {
                            this.state.arriveDate !== undefined && this.state.comeDate !== undefined?
                            <Text style={{ fontSize: 15,
                                margin:15,
                                alignSelf: "flex-start",}}>
                                {this.state.arriveDate.getDate() + "\t" +
                                monthNames[this.state.arriveDate.getMonth()] + "\t" +this.state.arriveDate.getFullYear()} - {this.state.comeDate.getDate() + "\t" + monthNames[this.state.comeDate.getMonth()] + "\t" +this.state.comeDate.getFullYear()}
                            </Text>
                            :
                            <Text style={{ fontSize: 15,
                                margin:15,
                                alignSelf: "flex-start",}}>Не указан</Text>
                        }
                        <IconButton icon="calendar"
                                            style={{position:"absolute", top: "0%", width:"180%"  }}
                                            color={Colors.purple700}
                                        />
                    </TouchableOpacity>
                    <Animated.View
                            style={{
                            //backgroundColor: Colors.red500,
                            width: "80%",
                            borderRadius: 10,
                            alignSelf: "center",
                            opacity: this.state.fadeAnim}} >
                            <Text style={{paddingTop: 2, paddingLeft: 5,alignSelf: "center", fontSize: 15, color: Colors.red500}}>Нужно выбрать дату</Text>
                    </Animated.View>
                    {
                        this.state.calendarIsOpen &&
                        <DateRangePicker
                        initialRange={[this.state.arriveDate ? this.state.arriveDate : new Date(), this.state.comeDate ? this.state.comeDate : new Date()]}
                        onSuccess={(from, to) => {
                            this.setState({arriveDate: new Date(from)});
                            this.setState({comeDate: new Date(to)});
                            this.setState({calendarIsOpen : false})
                            this.setState({successEnterDate : true})
                            console.log(from + ' || ' + to)

                        }}
                        onEject={()=>this.setState({calendarIsOpen : false})}
                        theme={{ edgeColor: Colors.purple700, markColor: Colors.purple200, markTextColor: 'white' }}/>
                    }
                    {
                        !this.state.calendarIsOpen &&
                        <PaperButton
                            color={Colors.white}
                            style={this.state.successEnterDate ? styles.button : styles.unactiveButton}
                            onPress={()=>
                                {
                                    if(this.state.successEnterDate)
                                    {
                                        this.props.createTravel({
                                            name: this.state.name,
                                            country: this.props.route.params.town,
                                            arriveDate: this.state.arriveDate,
                                            comeDate: this.state.comeDate
                                        })
                                        this.setState(INITIAL_STATE);
                                        this.props.navigation.push("ChangeRegion");
                                        this.props.navigation.navigate("MainScreen")
                                    }
                                    else{
                                        this.fadeOutDialog();
                                    }
                            }}
                        > Сохранить </PaperButton>
                    }
                </View>
            </View>
        )
    }
}

const mapDispatchToProps = (dispatch: React.Dispatch<AnyAction>) => ({
    createTravel: (travelling: Travelling) => dispatch(createTravelling({travelling : travelling}))
})

export default connect(
    null,
    mapDispatchToProps
)(ChangeDate);