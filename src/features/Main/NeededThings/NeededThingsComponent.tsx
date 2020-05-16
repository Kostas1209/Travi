import * as React from 'react';
import { View, Text, ScrollView, TouchableHighlightComponent} from 'react-native';
import HeaderComponent from '../shared/Header';
import { RootState } from 'src/redux/rootReducer';
import { Thing } from 'src/types/Things';
import { AnyAction } from 'redux';
import { addThing, changeThing } from '../../../redux/NeededThings/actions';
import { connect } from 'react-redux';
import { Colors } from 'react-native-paper';
import { CheckBox } from 'react-native-elements';

interface Props
{
    navigation : any,
    neededThings : Array<Thing>
    addThing: (thing : Thing) => void,
    changeThing: (thing: Thing, index: number) => void
}

class NeededThingsComponent extends React.Component<Props>
{
    state={
        neededThings : this.props.neededThings
    } 
    render()
    {
        return(
            <View>
                <HeaderComponent navigation={this.props.navigation} />
                <ScrollView style={{height: "100%"}}>
                    {
                        this.state.neededThings.length > 0 ? 
                        this.props.neededThings.map((thing: Thing, index : number) => 
                        {
                            return(
                                <CheckBox 
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
                            )
                        }):
                        <Text style={{
                          alignSelf: "center",
                          paddingTop: "50%",
                          fontSize: 30,
                          color: Colors.black
                        }}>Нет вещей</Text>
                    }
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
    changeThing: (thing: Thing, index: number) => dispatch(changeThing({thing: thing, index: index}))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NeededThingsComponent);