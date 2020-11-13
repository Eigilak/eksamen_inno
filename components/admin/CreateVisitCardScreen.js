import firebase from "firebase";
import {Button, StyleSheet, Text, View} from 'react-native';
import * as React from 'react';
import GlobalStyles from "../modules/GlobalStyle";

export default class CreateVisitCardScreen extends React.Component {
    render() {
        return(
            <View style={GlobalStyles.mainContainer}>
                <Text>CreateVisitCardScreen</Text><Button
                title={"Gå tilbage"}
                onPress={() => {this.props.navigation.goBack()}}
            />
            </View>
        )
    }
}
