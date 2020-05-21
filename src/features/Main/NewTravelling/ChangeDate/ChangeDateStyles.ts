import { StyleSheet, Dimensions } from 'react-native'
import { Colors } from 'react-native-paper'

export const styles = StyleSheet.create ({
    unactiveButton :{
        position: "absolute",
        top: Dimensions.get('screen').height - 200,
        alignSelf: "center",
        backgroundColor: Colors.purple100,
        width: "65%",
    },
    button :{
        position: "absolute",
        top: Dimensions.get('screen').height - 200,
        alignSelf: "center",
        backgroundColor: "#800080",
        width: "65%",
    },
    container: {
        alignContent: "center",
        justifyContent: "center"
    },
    input:{
        width: "80%",
        alignSelf: "center",
        borderBottomColor: "transparent",
        marginTop: 10,
        opacity: 0.5,
        height : 50,
        borderRadius: 5,
        position: "relative",
        backgroundColor: Colors.white,
    },
    Text:{ 
        top: 20,
        width: "80%",
        alignSelf: "center",
        backgroundColor: Colors.purple400,
        borderRadius: 10,
        color: "#f5f5f5",
        fontFamily: "17687",
        position: "relative",
        textAlign: "center",
        fontSize: 20,
        fontWeight: "bold"
    }
})
