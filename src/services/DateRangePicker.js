import React, { Component } from 'react'
import { View} from 'react-native'
import { Calendar} from 'react-native-calendars'
import { Button as PaperButton } from 'react-native-paper';

const XDate = require('xdate');

const today = new Date();

type Props = {
  initialRange: React.PropTypes.array.isRequired,
  onSuccess: React.PropTypes.func.isRequired,
  onEject: () => void
};
export default class DateRangePicker extends Component<Props> {

  state = {isFromDatePicked: false, isToDatePicked: false, markedDates: {}}

  componentDidMount() { this.setupInitialRange() }

  onDayPress = (day) => {
    if (!this.state.isFromDatePicked || (this.state.isFromDatePicked && this.state.isToDatePicked)) {
      this.setupStartMarker(day)
    } else if (!this.state.isToDatePicked) {
      let markedDates = {...this.state.markedDates}
      console.log(this.state.fromDate)
      console.log(day.dateString)
      console.log(markedDates);
      let [mMarkedDates, range] = this.setupMarkedDates(new Date(this.state.fromDate), new Date(day.dateString), markedDates)
      console.log("second ")
      if (range >= 0) {
        this.setState({isFromDatePicked: true, isToDatePicked: true, markedDates: mMarkedDates})
        this.setState({toDate: day.dateString})
      } else {
        this.setupStartMarker(day)
      }
    }
  }

  setupStartMarker = (day) => {
    let markedDates = {[day.dateString]: {startingDay: true, color: this.props.theme.markColor, textColor: this.props.theme.markTextColor}}
    this.setState({isFromDatePicked: true, isToDatePicked: false, fromDate: day.dateString, markedDates: markedDates})
    console.log('picked day' + day)
  }

  setupMarkedDates = (fromDate, toDate, markedDates) => {
    console.log("from Fate" +fromDate.getFullYear())
    let mFromDate = new XDate(fromDate.getFullYear(), fromDate.getMonth(),fromDate.getDate())
    let mToDate = new XDate(toDate.getFullYear(), toDate.getMonth(), toDate.getDate())
    let range = mFromDate.diffDays(mToDate) /// Bug Range not integer
    console.log(mFromDate);
    console.log(mToDate);
    console.log("range" + range);
    if (range >= 0) {
      if (range == 0) {
        markedDates = {[toDate]: {color: this.props.theme.edgeColor, textColor: this.props.theme.markTextColor}}
      } else {
        markedDates[mFromDate.toString('yyyy-MM-dd')] = {color: this.props.theme.edgeColor, textColor: this.props.theme.markTextColor}
        for (var i = 1; i <= range; i++) {
          let tempDate = mFromDate.addDays(1).toString('yyyy-MM-dd')
          if(i < range) {
            markedDates[tempDate] = {color: this.props.theme.markColor, textColor: this.props.theme.markTextColor}
          } else {
            console.log(tempDate);
            markedDates[tempDate] = {endingDay: true, color: this.props.theme.edgeColor, textColor: this.props.theme.markTextColor}
          }
        }
      }
    }
    return [markedDates, range]
  }

  setupInitialRange = () => {
    if (!this.props.initialRange) return
    let [fromDate, toDate] = this.props.initialRange
    let markedDates = {[fromDate]: {startingDay: true, color: this.props.theme.markColor, textColor: this.props.theme.markTextColor}}
    let [mMarkedDates, range] = this.setupMarkedDates(fromDate, toDate, markedDates)
    this.setState({markedDates: mMarkedDates, fromDate: fromDate})
  }

  render() {
    return (
      <View>
        <Calendar {...this.props}
                  markingType={'period'}
                  current={this.state.fromDate}
                  markedDates={this.state.markedDates}
                  onDayPress={(day) => {this.onDayPress(day)}}
                  hideArrows={false}
                  disableArrowLeft={false}
                  disableArrowRight={false}/>
        <View style={{flexDirection: "row", alignContent: "space-between", left: "16%" }}>
          <PaperButton title="ОК" style={{width: "40%"}}onPress={() => {
            if(this.state.isFromDatePicked && this.state.isToDatePicked)
            {
              this.props.onSuccess(this.state.fromDate, this.state.toDate)
            }
            else{
              this.props.onEject();
            }
          }}>ОК</PaperButton>
          <PaperButton title="Отмена" onPress={() => this.props.onEject()} >Отмена</PaperButton>
        </View>
      </View>
    )
  }
}

DateRangePicker.defaultProps = {
  theme: { markColor: '#00adf5', markTextColor: '#ffffff' }
};