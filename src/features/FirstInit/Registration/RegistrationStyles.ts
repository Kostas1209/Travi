import { StyleSheet, Dimensions } from 'react-native'
import { Colors } from 'react-native-paper';

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create ({
    logoText:{
        opacity: 0.3,
        fontFamily: "Darkline",
        position: "absolute",
        top: "1%",    
        alignSelf: "center",
        fontSize: windowWidth * 0.4 ,
        color: Colors.pink100
    },
    container:{
        width: "70%",
        position: "relative",
        top: "30%",
        alignSelf: "center",
        justifyContent: "flex-end",
        paddingBottom : "20%"
    },
    button:{
        alignSelf: "center",
        top: 30,
        backgroundColor: "#800080",
        borderRadius: 20,
        position: "relative"
    },
    input:{
        borderBottomColor: "transparent",
        borderTopColor: Colors.purple700,
        marginTop: 10,
        opacity: 0.5,
        height : 50,
        borderRadius: 5,
        position: "relative",
        backgroundColor: Colors.white,
    }
})

export default styles;