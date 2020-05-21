import * as React from 'react';
import { View, Text, ScrollView, TouchableHighlightComponent} from 'react-native';
import HeaderComponent from '../shared/Header';
import { RootState } from 'src/redux/rootReducer';
import { Thing } from 'src/types/Things';
import { AnyAction } from 'redux';
import { addThing, changeThing, deleteThing } from '../../../redux/NeededThings/actions';
import { connect } from 'react-redux';
import { Colors, TextInput } from 'react-native-paper';
import { CheckBox } from 'react-native-elements';
import { IconButton, Button as PaperButton, TextInput as PaperInput }from 'react-native-paper';

interface Props
{
    navigation : any,
    neededThings : Array<Thing>
    addThing: (thing : Thing) => void,
    changeThing: (thing: Thing, index: number) => void,
    deleteThing: (index: number) => void
}

class NeededThingsComponent extends React.Component<Props>
{
    state={
        neededThings : this.props.neededThings,
        formIsVisiable: false,
        formText : ""
    } 

    componentWillMount()
    {
        console.log(this.props.neededThings)
    }

    render()
    {
        return(
            <View>
                <HeaderComponent navigation={this.props.navigation} />
                <ScrollView style={{height: "100%"}}>
                    {
                        this.state.neededThings.length > 0 ? 
                        this.state.neededThings.map((thing: Thing, index : number) => 
                        {
                            return(
                                <View>
                                    <View style={{flexDirection: "row", marginLeft : 20 }}>
                                        <CheckBox 
                                            containerStyle={{maxWidth: "80%",paddingRight : 30}}
                                            title={thing.name}
                                            checked={thing.isPicked}
                                            onPress={()=>{
                                                // let newNeededThings = Object.assign({}, this.state.neededThings);
                                                // newNeededThings[index] = {name: thing.name, isPicked: !thing.isPicked};
                                                // console.log(newNeededThings);
                                                this.props.changeThing({name: thing.name, isPicked: !thing.isPicked},index)
                                                // this.setState({neededThings: newNeededThings })
                                            }}
                                        />
                                        <IconButton 
                                            onPress={()=>{
                                                this.props.deleteThing(index)
                                                let newThingsList = Object.assign([], this.state.neededThings);
                                                newThingsList.splice(index,1);
                                                this.setState({neededThings: newThingsList});
                                            }}
                                            icon="delete"
                                        ></IconButton>
                                    </View>                          
                                </View>
                            )
                        }):
                        <Text style={{
                          alignSelf: "center",
                          paddingTop: "50%",
                          fontSize: 30,
                          color: Colors.black
                        }}>Нет вещей</Text>
                    }
                    <View style={{marginTop: 10,marginBottom: 200}}>
                         {
                             this.state.formIsVisiable ?
                             <PaperInput 
                                 label='Необходимый предмет'
                                 style={{width : "80%", alignSelf: "center"}}
                                 selectionColor="pink"
                                 mode="outlined"
                                 onChangeText={(text)=>{this.setState({formText: text})}}
                                 value={this.state.formText}
                                 onBlur={()=>{
                                     this.props.addThing({name: this.state.formText, isPicked: false})
                                     let newThingsList = Object.assign([], this.state.neededThings);
                                     newThingsList.push({name: this.state.formText, isPicked: false});
                                     this.setState({neededThings :newThingsList});
                                     this.setState({formText: ""});
                                     this.setState({formIsVisiable: false})
                                 }}
                             />:<Text></Text>
                         }
                         <PaperButton
                             disabled={this.state.formIsVisiable}
                             onPress={()=>{
                                 this.setState({formIsVisiable: true})
                             }}
                         >Добавить</PaperButton>
                    </View>  
                </ScrollView>
            </View>
        )
    }
}

const mapStateToProps = (state: RootState) => ({
    neededThings: state.neededThings.neededThings
})
const mapDispatchToProps = (dispatch: React.Dispatch<AnyAction>) => ({
    addThing: (thing: Thing) => dispatch(addThing({thing : thing})),
    changeThing: (thing: Thing, index: number) => dispatch(changeThing({thing: thing, index: index})),
    deleteThing: (index: number) => dispatch(deleteThing({index : index}))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NeededThingsComponent);