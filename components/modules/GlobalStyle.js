import {StyleSheet} from "react-native";

const GlobalStyles = StyleSheet.create({
    mainContainer:{
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    innerContainer:{
        minWidth:'80%'
    },
    error: {
        color: 'red',
    },
    inputField: {
        borderWidth: 1,
        margin: 10,
        padding: 10,
    },
    header: {
        fontSize: 20,
    },

});

export default GlobalStyles
