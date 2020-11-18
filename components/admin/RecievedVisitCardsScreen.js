import firebase from "firebase";
import { StyleSheet, Text, View,Button, FlatList, SafeAreaView } from 'react-native';
import * as React from 'react';
import GlobalStyles from "../modules/GlobalStyle";
import ListVisitCardItem from "./items/NewVisitCardItem";
import VisitCardItem from "./items/VisitCardItem";
import TitleModule from "../modules/TitleModule.js";

export default class RecievedVisitCardsScreen extends React.Component {
    state={
        ReceivedVisitCards:[]
    }

    constructor() {
        super();
    }

    componentDidMount() {
        this.getYourRecievedVisitCards();
    }

    /*Hent mine opgivet informationer fra ProfilScreen*/
    getYourRecievedVisitCards = async () =>{
        try {
            /*Kald denne metode for at tjek info på opgivet brugere*/
            var allVisitCards=[];
            await firebase
                .database()
                .ref('/visitkort/')
                .on('value', snapshot =>{
                    if(snapshot.val()){
                        this.setState({ReceivedVisitCards:snapshot.val()})
                    }
                });
        }catch (e) {
            console.log("Fejl!! \n",e)
        }

    }

    /* Her oprettes et array der indeholder information om visitkort*/
    render() {
        const { ReceivedVisitCards } = this.state;
        // Vi viser ingenting hvis der ikke er data
        if (!ReceivedVisitCards) {
            return null;
        }

        // Flatlist forventer et array. Derfor tager vi alle values fra vores cars objekt, og bruger som array til listen
        const visitCardsArray = Object.values(ReceivedVisitCards);
        // Vi skal også bruge alle IDer, så vi tager alle keys også.
        const visitCardsKeys = Object.keys(ReceivedVisitCards);

        const renderCardItem = ({item,index}) => {
            if (item.id !== firebase.auth().currentUser.uid) {
                return  <ListVisitCardItem
                    VisitCardItem={item}
                    id={ReceivedVisitCards[index]}
                />
            }
        };

        return(
            <View style={styles.container}>
                {/* Title med styling*/ }
                <TitleModule title = "Modtaget visitkort"/>
                {/* FlatList komponent med title propertien og en værdi HANS*/ }
                {visitCardsArray.length > 0 ?

                    <FlatList
                        style={styles.inlineScroll}
                        data={visitCardsArray}
                        renderItem={renderCardItem}
                        keyExtractor={(item,index)=>visitCardsKeys[index] }
                    />

                    : <Text> Ingen visitkort modtaget</Text>
                }


            </View>

        )
    }

}

const styles = StyleSheet.create({
    inlineScroll:{
        height: 100
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }
});


