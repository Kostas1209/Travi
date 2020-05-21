import { StyleSheet } from 'react-native'
import { Colors } from 'react-native-paper'

const styles = StyleSheet.create ({
    input:{
        width: "80%",
        alignSelf: "center",
        borderBottomColor: "transparent",
        borderTopColor: Colors.purple700,
        marginTop: 10,
        opacity: 0.5,
        height : 50,
        borderRadius: 5,
        position: "relative",
        backgroundColor: Colors.white,
    },
    button:{
        width: "50%",
        fontSize: 20,
        alignSelf: "center",
        top: "100%",
        borderRadius: 20,
        position: "absolute"
    },
})

export default styles