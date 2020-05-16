import  * as React from 'react'; 
import { connect } from 'react-redux';
import { RootState } from '../../../redux/rootReducer';
import { Travelling } from '../../../types/Travelling';
import { View, Dimensions, Text } from 'react-native';
import  HeaderComponent from '../shared/Header';
import { TravellComponentOverview } from '../shared/Travel/Travel';

import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { Colors } from 'react-native-paper';

declare type Props = {
    userTravelling: Travelling[],
    navigation: any
}

const UserTravelling: React.SFC<Props> = ( {userTravelling, navigation } ) => 
{
    const date = new Date();

    const initialLayout = { 
        width: Dimensions.get('screen').width, 
        heigth: Dimensions.get('screen').height - 140
    };
    
    const [index, setIndex] = React.useState(0);
    
    const [routes] = React.useState([
        { key: 'current', title: 'Текущие' },
        { key: 'future', title: 'Будущие' },
        { key: 'previous', title: 'Прошлые' },
        { key: 'add', title: 'Добавить'} 
    ]);
    
    const accordionContent = ( exprassion : (arrive: Date, come: Date , now: Date) => boolean )=>
      {
          return(
              <ScrollView style={{height: "100%"}}>
                  {
                      userTravelling.length > 0 ? 
                      userTravelling.map((travelling: Travelling, index : number) => 
                      {
                          travelling.arriveDate = new Date(travelling.arriveDate.toString());
                          travelling.comeDate = new Date(travelling.comeDate.toString());
  
                          if(exprassion(travelling.arriveDate,travelling.comeDate, date))
                          {
                              return(
                                  <TouchableOpacity onPress={()=>{
                                      navigation.navigate("FullInformationTravelling",{travelling: travelling, index: index});
                                  }}
                                  activeOpacity={0.5}>
                                      <TravellComponentOverview
                                          travelling={travelling} 
                                          index={index}
                                      />
                                  </TouchableOpacity>
                              )
                          }
                      }) 
                      :
                      <Text style={{
                          alignSelf: "center",
                          paddingTop: "50%",
                          fontSize: 30,
                          color: Colors.black
                        }}>Нет путешествий</Text>
                  }
              </ScrollView>
          )
    }
    
    
    const CurrentRoute = () => {
        return (accordionContent((arrive:Date, come:Date, now:Date)=>{
            return arrive <= now && come>= now; 
        }))
    }
  
    const FutureRoute = () => (
        accordionContent((arrive:Date, come:Date, now:Date)=>{
            return arrive > now && come > now; 
        })
    );

    const PreviousRoute = () => (
        accordionContent((arrive:Date, come:Date, now:Date)=>{
            return arrive < now && come < now; 
        })
    );
    const AddRoute = () => {
        return(<View>{index===3 ? <View>{navigation.navigate("NewTravelling")}{setIndex(0)}</View>: <Text></Text>}</View>)
    };
    const renderTabBar = props => (
        <TabBar
          {...props}
          indicatorStyle={{ backgroundColor: Colors.purple100 }}
          style={{ backgroundColor: Colors.purple400}}
          renderLabel={({ route, focused, color }) => (
            <Text style={{height: "100%", color, fontSize: 15 }}>
              {route.title}
            </Text>
          )}
        />
      );

    const renderScene = SceneMap({
        current: CurrentRoute ,
        future: FutureRoute,
        previous: PreviousRoute,
        add: AddRoute
    });
    return(
        <ScrollView>
                <HeaderComponent navigation={navigation} />
                <TabView
                    sceneContainerStyle={{height: initialLayout.heigth, width: initialLayout.width}}
                    renderTabBar={renderTabBar}
                    swipeVelocityImpact={0.5}
                    lazy={true}
                    swipeEnabled={true}
                    navigationState={{ index, routes }}
                    renderScene={renderScene}
                    onIndexChange={setIndex}
                    initialLayout={initialLayout}
                />
        </ScrollView>
        )
}

const mapStateToProps = (state: RootState) => ({
    userTravelling: state.travelling.travellingList
})


export default connect(
    mapStateToProps
)(UserTravelling)