import firebase from "firebase";
import {Alert, Button, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
import * as React from 'react';
import GlobalStyles from "../../modules/GlobalStyle";

export default class SeeRecievedVisitCardItem extends React.Component {

    //hente noget data der bliver preloadet. Når der skal ændres.
    state ={
        address: '',
        company: '',
        facebookUrl: '',
        id: firebase.auth().currentUser.uid,
        instagram: '',
        jobTitle:'',
        linkedInUrl: '',
        name:'',
        userId:firebase.auth().currentUser.uid
    }
    componentDidMount() {
        const id = this.props.navigation.getParam('id');
        this.getVisitCard(id)
    }

    getVisitCard = id =>  {
        const {userId} = this.state
        //igen her loeades opgavens data (duration, titel, priority) ud fra det id, vi har fået med fra navigationen
        firebase
            .database()
            .ref('/visitCard/recieved/'+"/"+userId+"/"+id )
            .once( 'value', dataObject => {
                //her hentes opgaven fra databasen
                const visitCard = dataObject.val();
                //her deles de forskellige værdier op
                const { address, company, facebookUrl, id, instagram, jobTitle, linkedInUrl, name} = visitCard;
                //her sættes staten så f.eks. opgavens titel er loadet når man går ind på siden
                this.setState({ address, company, facebookUrl, id, instagram, jobTitle, linkedInUrl, name});

            });

    }

    render() {
        const {address, company, facebookUrl, instagram, jobTitle,name, linkedInUrl} = this.state;
        return(
            <SafeAreaView style={GlobalStyles.mainContainer}>
                <ScrollView>
                    <Text> {name}</Text>
                    <Text> {jobTitle}</Text>
                    <Text> {linkedInUrl}</Text>
                    <Text> {address}</Text>
                    <Text> {company}</Text>

                </ScrollView>
            </SafeAreaView>
        );
    }
}
