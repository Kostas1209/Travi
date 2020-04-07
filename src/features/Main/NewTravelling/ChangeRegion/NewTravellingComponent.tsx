import React from 'react';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import { View} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { Button as PaperButton, Colors } from 'react-native-paper';
import styles from "./NewTravellingStyles";
import environment from "../../../../../environment";
import HeaderComponent from '../../shared/Header';
import { IGeolocation, IRegion } from '../../../../types/Travelling';

const {GOOGLE_API_KEY} = environment.dev;


interface MapState{
    location: IGeolocation,
    region: IRegion,
    country: string,
    town: string,
    SelectTown: string
}

const INITIAL_STATE : MapState={
    location: {
        latitude: 37.78825,
        longitude: -122.4324,
    },
    region:{
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
    },
    country: "",
    town: "",
    SelectTown: ""
}


class TrackingMapWithMarker extends React.Component<{navigation}, MapState>{
    state=INITIAL_STATE
    
    myRef: MapView;
    

    SearchTown = () =>
    {
        fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${this.state.country}+${this.state.town},&key=${GOOGLE_API_KEY}`)
        .then(response => response.json())
        .then(data => {
            if(data.status === "OK")
            {
                this.setState({location: {
                    latitude: data.results[0].geometry.location.lat,
                    longitude: data.results[0].geometry.location.lng
                }});
                this.setState({region: {
                    latitude: data.results[0].geometry.location.lat,
                    longitude: data.results[0].geometry.location.lng,
                    latitudeDelta: 0.1,
                    longitudeDelta: 0.1,
                }})
            }
            else{
                console.log("Some went wrong")
            }
        })
    }

    onRegionChange(region) {    
        this.setState({ region : {
            latitude: region.latitude,
            longitude: region.longitude,
            latitudeDelta: region.latitudeDelta,
            longitudeDelta: region.longitudeDelta
        }});
    }
    onChangeTown(text : string) {
        this.setState({ town: text });
    }

    render()
    {
        return (
            <View style={{flex : 1}}>
                <HeaderComponent navigation={this.props.navigation} />
                <View style={{flex:5,borderColor: '#009688',borderWidth: 1}}>
                    <TextInput 
                        style={styles.input}
                        placeholder="Enter your endpoint town"
                        onChangeText={text => this.onChangeTown(text)}
                    />
                    <View style={{flexDirection: "row"}}>
                        <PaperButton 
                            style={[styles.button,{backgroundColor: "#800080"}]}
                            onPress={this.SearchTown}
                            color={Colors.white}
                        >
                            Найти
                        </PaperButton>
                        <PaperButton 
                            style={[styles.button,{backgroundColor: Colors.green300}]}
                            onPress={()=>{
                                fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=
                                ${this.state.location.latitude},${this.state.location.longitude}&key=${GOOGLE_API_KEY}`)
                                .then(response => response.json())
                                .then((data: any) => {
                                    console.log(data.results[data.results.length - 3].formatted_address);
                                    this.setState(INITIAL_STATE);
                                    this.props.navigation.navigate("ChangeDate",{town: data.results[data.results.length - 3].formatted_address})
                                }) 
                            }}
                            color={Colors.white}
                        >
                            Подтвердить
                        </PaperButton>
                    </View>
                    
                </View>
                <MapView
                    zoomControlEnabled={false}
                    ref = {(mapView) => { this.myRef = mapView; }}
                    provider={PROVIDER_GOOGLE}
                    style={{position:"relative", flex: 11}}
                    region={this.state.region}
                    //   onRegionChange={region=>{
                    //     this.onRegionChange(region);
                    //     this.setState({location: {
                    //                 latitude: region.latitude,
                    //                 longitude: region.longitude
                    //             }});
                    //   }}
                    onRegionChangeComplete={data => {
                        this.setState({location: {
                            latitude: data.latitude,
                            longitude: data.longitude
                        }});
                        this.onRegionChange(data);
                    }}
                    
                    onPress={(data)=>{
                        this.setState({location: {
                        latitude: data.nativeEvent.coordinate.latitude,
                        longitude: data.nativeEvent.coordinate.longitude
                    }})}}
                    >
                    <Marker
                          coordinate={{
                              latitude: this.state.location.latitude,
                              longitude: this.state.location.longitude,
                          }}
                      />
                  </MapView>
            </View>
        );
    }
  
};

export default TrackingMapWithMarker
