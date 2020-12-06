import firebase from "firebase";
import { StyleSheet, Text, View,Button, FlatList, SafeAreaView } from 'react-native';
import * as React from 'react';
import GlobalStyles from "../modules/GlobalStyle";
import ListVisitCardItem from "./items/ListVisitCardItem";
import TitleModule from "../modules/TitleModule.js";

export default class RecievedVisitCardsScreen extends React.Component {
    state={
        RecievedvisitCards:[],
        loading:false,
        premium_max:false
    }

    constructor() {
        super();
    }
    componentDidMount() {
        this.getRecievedCards();
    }
    /*Test af Master*/
    /*Hent mine opgivet informationer fra ProfilScreen*/
    getRecievedCards = async () =>{
        const {id} = firebase.auth().currentUser.uid;
        this.setState({loading:true});
        try {
            /*Kald denne metode for at tjek info på opgivet brugere*/
            var allVisitCards=[];
            await firebase
                .database()
                .ref('/visitCard/recieved/'+id)
                .on('value', snapshot =>{
                    if(snapshot.val()){
                        console.log(snapshot.val())
                        this.setState({RecievedvisitCards:snapshot.val()})
                        var length = Object.keys(snapshot.val())
                        if(length.length > 1){
                            this.setState({premium_max: true})
                        }
                    }

                    this.setState({loading:false});

                });
        }catch (e) {
            console.log("Fejl!! \n",e)
        }

    }

    handleSelectVisitCard = id => {
        console.log(id)
        this.props.navigation.navigate('SeeRecievedVisitCard', { id });
    };

    /* Her oprettes et array der indeholder information om visitkort*/
    render() {
        const { RecievedvisitCards,loading,premium_max } = this.state;
        // Vi viser ingenting hvis der ikke er data
        if (!RecievedvisitCards) {
            return null;
        }

        // Flatlist forventer et array. Derfor tager vi alle values fra vores cars objekt, og bruger som array til listen
        const visitCardsArray = Object.values(RecievedvisitCards);
        // Vi skal også bruge alle IDer, så vi tager alle keys også.
        const visitCardsKeys = Object.keys(RecievedvisitCards);

        /*render*/
        const renderCardItem = ({item,index}) => {
            if (item.id !== firebase.auth().currentUser.uid) {
                return(
                    <ListVisitCardItem
                        VisitCardItem={item}
                        id={visitCardsKeys[index]}
                        onSelect={
                            this.handleSelectVisitCard
                        }
                    />
                )

            }
        };

        if(loading){
            return (
                <View style={styles.container}>
                    <TitleModule title = "Loading....."/>
                </View>

            )
        }else{
            return (
                <View style={styles.container}>
                    {/* Title med styling*/ }
                    <TitleModule title = "Mine modtaget visitkort"/>
                    {/* FlatList komponent med title propertien og en værdi HANS*/ }
                    {visitCardsArray.length > 0 ?
                        <FlatList
                            style={styles.inlineScroll}
                            data={visitCardsArray}
                            renderItem={renderCardItem}
                            keyExtractor={(item,index)=>visitCardsKeys[index] }
                        />

                        : <Text> Ingen modtaget VisitKort</Text>
                    }

                </View>
            )
        }
    }

}

const styles = StyleSheet.create({
    inlineScroll:{
        height: 100,

    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',

    }
});
