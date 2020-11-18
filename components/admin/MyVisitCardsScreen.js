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
        const spoof_visitkort = [
                {address: "Addresse",
                company: "Virk",
                facebookUrl: "facebook",
                id: "osd4VTO7vPhCIajcRpqrIBDwH9z2",
                instagram: "insta",
                jobTitle: "titel",
                linkedInUrl: "linkedin",
                name: "Navn"},
                {address: "Addresse2",
                company: "Virk2",
                facebookUrl: "facebook",
                id: "osd4VTO7vPhCIajcRpqrIBDwH9z2",
                instagram: "insta",
                jobTitle: "titel",
                linkedInUrl: "linkedin",
                name: "Navn"},

        ]

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
