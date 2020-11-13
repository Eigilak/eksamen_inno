import firebase from "firebase";
import { StyleSheet, Text, View,Button } from 'react-native';
import * as React from 'react';
import GlobalStyles from "../modules/GlobalStyle";

export default class MyVisitCardsScreen extends React.Component {
    constructor() {
        super();
    }
    navigateCreate = () => {
    }

    render() {
        return(
            <View style={GlobalStyles.mainContainer}>
                <Text>TEST</Text>
                <Button
                    title={"Opret visitkort"}
                    onPress={() => {this.props.navigation.navigate('CreateVisitCard')}}
                />
            </View>
        )
    }
}
