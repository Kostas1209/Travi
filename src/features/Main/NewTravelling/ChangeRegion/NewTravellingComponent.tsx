import React from 'react';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import { View, Text, Animated} from 'react-native';
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
    isButtonVisiable: boolean,
    errorMessage: string,
    fadeAnim : Animated.Value
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
    isButtonVisiable: false,
    errorMessage : "asdf",
    fadeAnim : new Animated.Value(0)
}


class TrackingMapWithMarker extends React.Component<{navigation}, MapState>{
    state=INITIAL_STATE
    
    myRef: MapView;
    
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
                this.setState({isButtonVisiable : true})
            }
            else{
                this.setState({errorMessage : "Не смогли найти такой город"});
                this.fadeOutDialog()
                console.log("Some went wrong")
            }
        })
        .catch(error => {
            this.setState({errorMessage : "Проверьте интернет подключение"});
            this.fadeOutDialog()
            console.log(JSON.stringify(error))
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
            <View style={{flexDirection :"column", flex : 1}}>
                <HeaderComponent navigation={this.props.navigation} />
                <View style={{flex:5}}>
                    <TextInput 
                        style={styles.input}
                        placeholder="Введите город"
                        onChangeText={(text) => {
                            this.onChangeTown(text)
                            this.setState({isButtonVisiable: false})
                        }}
                    />
                    <View>
                        {
                            this.state.isButtonVisiable === false ? 
                            <PaperButton 
                            style={[styles.button,{backgroundColor: "#800080"}]}
                            onPress={()=>{
                                if(this.state.town === "")
                                {
                                    this.setState({errorMessage : "Нужно указать город"});
                                    this.fadeOutDialog()
                                }
                                else{
                                    this.SearchTown()
                                }
                            }}
                            color={Colors.white}
                            >
                                Найти
                            </PaperButton> :
                            <Text> </Text>
                        }
                        {
                            this.state.isButtonVisiable === true ?
                            <PaperButton 
                                style={[styles.button,{backgroundColor: Colors.green500}]}
                                onPress={()=>{
                                    fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=
                                    ${this.state.location.latitude},${this.state.location.longitude}&key=${GOOGLE_API_KEY}`)
                                    .then(response => response.json())
                                    .then((data: any) => {
                                        console.log(data.results[data.results.length - 3].formatted_address);
                                        this.setState(INITIAL_STATE);
                                        this.setState({town : ""});
                                        this.props.navigation.navigate("ChangeDate",{town: data.results[data.results.length - 3].formatted_address})
                                    }) 
                                }}
                                color={Colors.white}
                            >
                                Подтвердить
                            </PaperButton> : 
                            <Text> </Text>
                        }

                    </View>
                    <Animated.View
                            style={{
                            //backgroundColor: Colors.red500,
                            position: "absolute",
                            top: "70%",
                            marginTop: 10,
                            display: this.state.errorMessage !== "" ? null : "none",
                            width: "80%",
                            borderRadius: 10,
                            alignSelf: "center",
                            opacity: this.state.fadeAnim}} >
                            <Text style={{paddingTop: 2, paddingLeft: 5,alignSelf: "center", fontSize: 15, color: Colors.red500}}>{this.state.errorMessage}</Text>
                    </Animated.View>
                    
                </View>
                <MapView
                    zoomControlEnabled={false}
                    ref = {(mapView) => { this.myRef = mapView; }}
                    provider={PROVIDER_GOOGLE}
                    style={{position:"relative", height: "62%"}}
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
