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

    /* Her oprettes et array der indeholder information om visitkort*/
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
        ];

        //Lav en konstant kaldt render VisitCard som tager en parametre med til vores VisitCardItem kompnent
        const renderspoof_visitkortItem = ({item}) =>(
            <VisitCardItem VisitCardName={item}/>
        )

        return(
            <View style={GlobalStyles.mainContainer}>
                <Button
                    title={"Opret visitkort"}
                    onPress={() => {this.props.navigation.navigate('CreateVisitCard')}}
                />
                <Button
                    title={"Ændre visitkort"}
                    onPress={() => {this.props.navigation.navigate('EditVisitCard')}}

                />

            </View>
        )
    }
}

const styles = StyleSheet.create({
    inlineScroll:{
        height: 100
    },
});
