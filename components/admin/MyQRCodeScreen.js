import firebase from "firebase";
import {Button, StyleSheet, Text, View,ScrollView,SafeAreaView, Alert, TextInput,TouchableOpacity} from 'react-native';
import * as React from 'react';
import GlobalStyles from "../modules/GlobalStyle";
import TitleModule from "../modules/TitleModule";
import QRCode from 'react-native-qrcode-svg';



export default class MyQRCodeScreen extends React.Component {

    state ={
        qrVisitCard:{},
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
            .ref('/visitCard/my/'+userId+'/'+id )
            .once( 'value', dataObject => {
                //her hentes opgaven fra databasen
                const qrVisitCard = dataObject.val();
                this.setState({qrVisitCard})
                console.log(qrVisitCard)
                //her deles de forskellige værdier op
            });

    }


    render() {
        const {qrVisitCard} = this.state
        if (!qrVisitCard) {
            return null;
        }
        const StringyFiied = JSON.stringify(qrVisitCard)

        return (
            <View style={GlobalStyles.mainContainer}>
                <QRCode
                    size={350}
                    color={"#0a66c2"}
                    value={StringyFiied}
                />
            </View>

        );
    };
}