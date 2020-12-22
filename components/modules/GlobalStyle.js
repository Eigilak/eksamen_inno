import {StyleSheet,Platform} from "react-native";

const GlobalStyles = StyleSheet.create({
    mainContainer:{
        flex: 1,
        backgroundColor: 'white',
        width:"100%",
        alignItems: 'center',
        justifyContent: 'center',
        padding: 0,
        marginTop:(Platform.OS === 'ios') ? 20 : 15
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
        marginBottom:10,
        padding: 10
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
        flex:1,
        width:"100%"

    },

    //Create style
    createButtonContainer:{
      flex:1,
      flexDirection:"row",
        flexWrap:"wrap",
      justifyContent: "space-between"
    },
    /*Over all style*/
    touchButton:{
        backgroundColor: "#0a66c2",
        borderRadius: 20,
        padding:10,
        maxWidth:"100%",
    }
});

export default GlobalStyles
