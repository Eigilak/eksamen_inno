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
        borderWidth: 2,
        borderRadius:4,
        margin: 10,
        padding: 10,
    },
    inputFieldError:{
      borderColor:"red"
    },
    header: {
        fontSize: 20,
    },
    inlineScroll:{
    height: 100
    },
    /*ProfileScreen*/
    myInfoContainer:{
    },
    myInfoRightContainer:{

    }
});

export default GlobalStyles
