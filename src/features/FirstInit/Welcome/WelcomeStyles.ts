import { StyleSheet } from 'react-native'
import { Colors } from 'react-native-paper';

const styles = StyleSheet.create ({
    logoText:{
        fontFamily: "Darkline",
        top: "5%",
        alignSelf: "center",
        color: Colors.pink100
    },
    welcomeText:{ 
        alignSelf: "center",
        backgroundColor: "#f8bbd050",
        borderRadius: 10,
        color: "#e6dae4",
        fontFamily: "serif",
        textAlign: "center",
        fontWeight: "bold"
    },
    button:{
        alignSelf: "center",
        opacity: 0.3
    },
    container:{
        textAlign: "center",
    }
})

export default styles;