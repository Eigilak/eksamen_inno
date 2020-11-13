import firebase from "firebase";
import { StyleSheet, Text, View } from 'react-native';
import * as React from 'react';
import GlobalStyles from "../modules/GlobalStyle";

export default class RecievedVisitCardsScreen extends React.Component {
    render() {
        return(
            <View style={GlobalStyles.mainContainer}>
                <Text>RecievedVisitCardsScreen</Text>
            </View>
        )
    }
}
