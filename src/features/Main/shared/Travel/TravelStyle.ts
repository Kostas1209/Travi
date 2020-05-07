import { StyleSheet } from 'react-native';
import { Colors } from 'react-native-paper';

export const styles = StyleSheet.create({  
    Title : {
        fontSize: 20,
        alignSelf: "center",
        // borderWidth: 1,
        // borderRadius: 5,
        textAlign: "center",
    },
    text: {
        fontSize: 15,
        alignSelf: "flex-start",
        textAlign: "center",
    },
    container : {
        backgroundColor: Colors.white,
        borderRadius: 5,
        height: 40,
        paddingLeft: 10,
        paddingTop: 10,
        width: "70%",
        fontSize: 18,
        alignSelf: "center",
        marginTop: 10,
    },
    input:{
        alignSelf:"center",
        textAlign: "auto",
        paddingLeft: 10, 
        marginTop: 20,
        height: "auto", 
        borderRadius: 5, 
        width: "90%",
        backgroundColor: Colors.white
    }
})