import * as React from 'react';
import { monthNames } from "../Constants";
import { Button as PaperButton, Colors, IconButton } from 'react-native-paper';
import { View, Text, TimePickerAndroid, Button, TextInput, KeyboardAvoidingView, Animated} from "react-native";
import  DatePickerAndroid  from '@react-native-community/datetimepicker'
import { AnyAction } from 'redux';
import FilePickerManager from 'react-native-file-picker';
import { deleteTravelling, createTravelling } from '../../../../redux/Travelling/actions';
import { connect } from 'react-redux';
import  HeaderComponent  from '../Header';
import { Travelling, Time } from '../../../../types/Travelling';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { styles } from './TravelStyle';
import DateRangePicker from '../../../../services/DateRangePicker';
import FileViewer from 'react-native-file-viewer';


export const TravellComponentOverview = ({travelling, index}) => 
{
    return(
        <View style={{borderRadius: 5, backgroundColor: Colors.purple100, alignSelf: "center", width: "80%", alignContent: "center", alignItems: "center", marginTop: 15}}>
            <Text>{travelling.country}</Text>
            <Text>
                Начало путешествия {travelling.arriveDate.getDate()} {monthNames[travelling.arriveDate.getMonth()]} {travelling.arriveDate.getFullYear()}
            </Text>
            <Text>
                Конец путешествия {travelling.comeDate.getDate()} {monthNames[travelling.comeDate.getMonth()]} {travelling.comeDate.getFullYear()}
            </Text>
        </View>
    )
}

interface Props{
    navigation : any, 
    route : {params:{travelling: Travelling, index: number}}, 
    deleteTravel: (index: number) => void,
    saveTravel: (travelling: Travelling) => void
}
interface State{
    travelling: Travelling,
    index: number
    calendarIsOpen: boolean,
    fadeAnim : Animated.Value
}

export class TravellComponentFullInfo extends React.Component<Props, State> 
{
    state={
        travelling: this.props.route.params.travelling,
        index: this.props.route.params.index,
        calendarIsOpen : false,
        fadeAnim : new Animated.Value(0)
    }

    selectDate = async (): Promise<Date | null>=> 
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

    selectTime = async () : Promise<Time> => {
        try{
            const {action, hour, minute} = await TimePickerAndroid.open({
                hour: 14,
                minute: 0,
                is24Hour: true,
                mode: "default"
            })
            if(action !== TimePickerAndroid.dismissedAction)
            {
                return {hour,minute}
            }
        }
        catch(message)
        {
            console.log("Error " + message);
        }
    }

    fadeOutDialog = () => {
        // Will change fadeAnim value to 0 in 5 seconds
        Animated.sequence(
            [
                Animated.timing(this.state.fadeAnim, {
                    toValue: 1,
                    duration: 2000
                  }),
                Animated.timing(this.state.fadeAnim, {
                    toValue: 0,
                    duration: 2000
                  })
            ]
        ).start()
    };


    render()
    {
        return(
            <KeyboardAvoidingView behavior="height" enabled>
            <ScrollView>
                <HeaderComponent navigation={this.props.navigation} />
                <Animated.View style={{
                        backgroundColor: Colors.green500,
                        width: "60%",
                        height: "8%",
                        borderRadius: 10,
                        alignSelf: "center",
                        opacity: this.state.fadeAnim
                    }}>
                    <TouchableOpacity 
                    style={{flexDirection: "row",alignContent: "center",
                    alignItems: "center",
                    alignSelf: "center",
                    }}>
                        <Text>Успешно сохранено</Text>
                        <IconButton icon="checkbox-marked-outline"
                            color={Colors.black}
                        />
                    </TouchableOpacity>
                </Animated.View>
                <Text style={styles.Title}>{this.state.travelling.country}</Text>
                <TouchableOpacity
                    style={styles.container}
                    onPress={()=>{this.setState({calendarIsOpen: !this.state.calendarIsOpen})}}
                >
                    {
                        this.state.travelling.arriveDate !== undefined?
                        <Text style={[styles.text, {top: 8}]}>
                             {this.state.travelling.arriveDate.getDate() + "\t" + 
                            monthNames[this.state.travelling.arriveDate.getMonth()] + "\t" +this.state.travelling.arriveDate.getFullYear()} -
                            {"\t" + this.state.travelling.comeDate.getDate() + "\t" + 
                            monthNames[this.state.travelling.comeDate.getMonth()] + "\t" +this.state.travelling.comeDate.getFullYear()}
                        </Text> 
                        :
                        <Text style={styles.text}>Не указан</Text>
                    }
                    <IconButton icon="calendar"
                                            style={{position:"absolute", top: "0%", width:"180%"  }}
                                            color={Colors.purple700}
                                        />
                </TouchableOpacity>
                {
                    this.state.calendarIsOpen && 
                    <DateRangePicker
                    initialRange={[this.state.travelling.arriveDate, this.state.travelling.comeDate]}
                    onSuccess={(from, to) => {
                        let newTravelling = Object.assign({}, this.state.travelling); 
                        newTravelling.arriveDate = new Date(from);
                        newTravelling.comeDate = new Date(to);
                        this.setState({travelling : newTravelling});
                        this.setState({calendarIsOpen : false})
                        console.log(from + '||' + to)
                    }}
                    onEject={()=>this.setState({calendarIsOpen : false})}
                    theme={{ edgeColor: Colors.purple700, markColor: Colors.purple200, markTextColor: 'white' }}/>
                }
                <View style={{marginTop: 15}}>
                    <Text style={{alignSelf: "center"}}>Указать время прибытия</Text>
                    <TouchableOpacity style={styles.container}
                        onPress={()=>{
                            this.selectTime()
                            .then((time: Time) => {
                                let newTravelling = Object.assign({}, this.state.travelling); 
                                newTravelling.flightArriveTime = time;
                                newTravelling.arriveDate.setHours(time.hour);
                                newTravelling.arriveDate.setMinutes(time.minute);
                                this.setState({travelling: newTravelling});
                            })
                        }}
                    >
                        <View>
                            {
                                this.state.travelling.flightArriveTime == undefined ?
                                <Text style={styles.text}>Не выбрано</Text> :
                                <Text>{this.state.travelling.flightArriveTime.hour < 10 ? "0": ""}{this.state.travelling.flightArriveTime.hour + "\t"} 
                                    :{this.state.travelling.flightArriveTime.minute < 10 ? " 0":""}{this.state.travelling.flightArriveTime.minute}</Text> 
                            }
                            <IconButton icon="clock-outline"
                                style={{position:"absolute", top: "0%", width:"180%"  }}
                                color={Colors.purple700}
                            />
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{marginTop: 15}}>
                    <Text style={{alignSelf: "center"}}>Указать время возвращения</Text>
                    <TouchableOpacity style={styles.container}
                        onPress={()=>{
                            this.selectTime()
                            .then((time: Time) => {
                               // console.log(time)
                                let newTravelling = Object.assign({}, this.state.travelling); 
                                newTravelling.flightComeTime = time;
                                newTravelling.comeDate.setHours(time.hour);
                                newTravelling.comeDate.setMinutes(time.minute);
                                this.setState({travelling: newTravelling});
                            })
                        }}
                    >
                        {
                            this.state.travelling.flightComeTime == undefined ?
                            <Text style={styles.text}>Не выбрано</Text> :
                            <Text>{this.state.travelling.flightComeTime.hour < 10 ? "0": ""}{this.state.travelling.flightComeTime.hour + "\t"} 
                                :{this.state.travelling.flightComeTime.minute < 10 ? " 0":""}{this.state.travelling.flightComeTime.minute}</Text> 
                            
                        }
                         <IconButton icon="clock-outline"
                            style={{position:"absolute", top: "0%", width:"180%"  }}
                            color={Colors.purple700}
                        />
                    </TouchableOpacity>
                </View>
                <View style={{flexDirection: "row"}}>
                    <TouchableOpacity onPress={()=>{
                        if(this.state.travelling.pathToArriveBoardingPass)
                        {
                            FileViewer.open(this.state.travelling.pathToArriveBoardingPass)
                        }
                    }}>
                        <Text>Посадочный билет туда</Text>
                        {
                            this.state.travelling.pathToArriveBoardingPass !== undefined ? 
                            <Text >Нажмите,чтобы открыть</Text>
                            :
                            <Text>
                                Не выбрано
                            </Text>
                        }
                    </TouchableOpacity>
                    <IconButton
                        icon="file"
                        onPress={()=>{
                            FilePickerManager.showFilePicker(null,
                                (response) => {
                                    console.log('Response = ', response);
                                
                                    if (response.didCancel) {
                                    console.log('User cancelled file picker');
                                    }
                                    else if (response.error) {
                                    console.log('FilePickerManager Error: ', response.error);
                                    }
                                    else {
                                        console.log(response)
                                        let newTravelling = Object.assign({}, this.state.travelling);
                                        newTravelling.pathToArriveBoardingPass = response.uri
                                        this.setState({travelling: newTravelling});
                                    }
                                })
                        }}
                    />
                </View>
                {/* <View>
                    <Text>Посадочный билет обратно</Text>
                    {
                        this.state.travelling.pathToComeBoardingPass !== undefined ? 
                        <Text>
                            boarding pass {this.state.travelling.pathToComeBoardingPass}
                        </Text> :
                        <Text>Не выбран</Text>
                    }
                    <Button 
                        title="Выбрать посадочный билет обратно"
                        onPress={()=>{this.selectDocument().then((path: string) => {
                            let newTravelling = Object.assign({}, this.state.travelling);
                            newTravelling.pathToComeBoardingPass = path;
                            this.setState({travelling: newTravelling});
                        })}}
                    />
                </View> */}
                <View>
                    <TextInput 
                    multiline={true}
                        placeholder="Начните писать, чтобы добавить планы в путешествие"
                        onChangeText={(text : string )=>{
                            let newTravelling = Object.assign({}, this.state.travelling);
                            newTravelling.yourPlan = text;
                            this.setState({travelling: newTravelling});
                        }}
                        style={styles.input}
                        value={this.state.travelling.yourPlan}/>
                </View>
                <View style={{height : 150, marginTop:50  ,flexDirection: "row", alignSelf: "center"}}>
                    <PaperButton
                            mode="contained"
                            icon="delete"
                            style={{width: "35%", alignSelf: "center"}}
                            color={Colors.red500}
                            onPress={()=>{
                                this.props.deleteTravel(this.state.index);
                                this.props.navigation.navigate("MainScreen")
                            }}
                        >Удалить</PaperButton>
                    <Text>        </Text> 
                    <PaperButton
                        mode="contained"
                        icon="file"
                        style={{width: "35%", alignSelf: "center"}}
                        color={Colors.green700}
                        onPress={()=>{
                            this.fadeOutDialog()
                            this.props.deleteTravel(this.state.index); /// delete and create a new travelling
                            this.props.saveTravel(this.state.travelling);
                        }}
                    >Сохранить
                    </PaperButton>
                </View>
            </ScrollView>
            </KeyboardAvoidingView>
        )
    }
}

const mapDispatchToProps = (dispatch: React.Dispatch<AnyAction>) => ({
    deleteTravel: (index: number) => dispatch(deleteTravelling({index})),
    saveTravel: (travelling: Travelling) => dispatch(createTravelling({travelling}))
})

export const TravellComponentFullInformation = connect(
    null,
    mapDispatchToProps
) (TravellComponentFullInfo)