import { StyleSheet } from "react-native";
import { Colors } from "react-native-paper";

export const styles = StyleSheet.create({  
    container : {
        backgroundColor: Colors.white,
        borderRadius: 5,
        height: 40,
        alignSelf: "center",
        paddingLeft: 10,
        paddingTop: 10,
        maxWidth: "80%",
        fontSize: 18,
        marginTop: 10,
        borderWidth :2,
        borderColor: Colors.black
    },
    documentContainer :{
        flexDirection: "row", 
        marginLeft : 20, 
        alignSelf: "center", 
        borderWidth: 1, 
        marginTop: 10, 
        width: "80%", 
        paddingLeft: 10,
        paddingTop: 5, 
        paddingBottom: 5, 
        borderRadius: 10
    },
    text:{
        alignSelf:"center",
        maxWidth: "80%",
        paddingLeft: 5
    }
})