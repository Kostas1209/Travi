import { StyleSheet } from 'react-native'
import { Colors } from 'react-native-paper';

const styles = StyleSheet.create ({
    logoText:{
        fontFamily: "Darkline",
        position: "absolute",
        top: "13%",
        alignSelf: "center",
        fontSize: 150,
        color: Colors.pink100
    },
    welcomeText:{ 
        width: "80%",
        alignSelf: "center",
        backgroundColor: "#f8bbd050",
        borderRadius: 10,
        color: "#e6dae4",
        fontFamily: "serif",
        position: "absolute",
        top: "40%",
        textAlign: "center",
        fontSize: 20,
        fontWeight: "bold"
    },
    button:{
        position: "absolute",
        top: "65%",
        alignSelf: "center",
        opacity: 0.3
    },
    container:{
        textAlign: "center",
    }
})

export default styles;