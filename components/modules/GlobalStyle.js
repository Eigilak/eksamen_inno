import {StyleSheet} from "react-native";

const GlobalStyles = StyleSheet.create({
    mainContainer:{
        flex: 1,
        backgroundColor: '#fff',
        width:"100%",
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
    /*ProfileScreen*/
    myInfoContainer:{
    },
    myInfoRightContainer:{

    },
    /*Create and edit Container*/
    createContainer:{
        flex:1,
        flexWrap:"wrap",
    }
});

export default GlobalStyles
