import { StyleSheet } from 'react-native';
import { Colors } from 'react-native-paper';

export const userCabinetStyles = StyleSheet.create({
    big: {
      fontSize: 40,
    },
    small: {
      fontSize: 20,
    },
    input:{
      textDecorationColor: Colors.black,
      width: "80%",
      alignSelf: "center",
      paddingLeft : 10,
      borderTopColor: Colors.purple700,
      marginTop: 10,
      height : 50,
      borderRadius: 5,
      position: "relative",
      backgroundColor: Colors.white,
  },
  button:{
      width: "50%",
        alignSelf: "center",
        top: 30,
        backgroundColor: "#800080",
        borderRadius: 20,
        position: "relative"
        
    },
  dateContainer:{
    paddingLeft: 10,
    marginTop: 10,
    flexDirection: "row", 
    alignSelf: "center",
    alignContent: "space-around",
    backgroundColor: Colors.white,
    borderRadius: 5,
    width: "80%",
    height: 50
  }

  });