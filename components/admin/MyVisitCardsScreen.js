import firebase from "firebase";
import { StyleSheet, Text, View, FlatList,TouchableOpacity } from 'react-native';
import * as React from 'react';
import GlobalStyles from "../modules/GlobalStyle";
import ListVisitCardItem from "./items/ListVisitCardItem";
import TitleModule from "../modules/TitleModule.js";

export default class MyVisitCardsScreen extends React.Component {
    state={
        visitCards:[],
        loading:false,
        premium_max:false
    }

    constructor() {
        super();
    }
    componentDidMount() {
        this.getYourVisitCards();
    }

    /*Hent mine opgivet informationer fra ProfilScreen*/
    getYourVisitCards = async () =>{

        this.setState({loading:true});
        try {
            /*Kald denne metode for at tjek info på opgivet brugere*/
            var allVisitCards=[];
            await firebase
                .database()
                .ref('/visitkort')
                .on('value', snapshot =>{
                    if(snapshot.val()){
                        console.log(snapshot.val())
                        this.setState({visitCards:snapshot.val()})
                        var length = Object.keys(snapshot.val())
                        if(length.length > 10){
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
        this.props.navigation.navigate('EditMyVisitCard', { id });
    };

    /* Her oprettes et array der indeholder information om visitkort*/
    render() {
        const { visitCards,loading,premium_max } = this.state;
        // Vi viser ingenting hvis der ikke er data
        if (!visitCards) {
            return null;
        }

        // Flatlist forventer et array. Derfor tager vi alle values fra vores cars objekt, og bruger som array til listen
        const visitCardsArray = Object.values(visitCards);
        // Vi skal også bruge alle IDer, så vi tager alle keys også.
        const visitCardsKeys = Object.keys(visitCards);

        /*render*/
        const renderCardItem = ({item,index}) => {
            if (item.id === firebase.auth().currentUser.uid) {
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
                    <TitleModule title = "Mine Visit Kort"/>
                    {/* FlatList komponent med title propertien og en værdi HANS*/ }
                    {visitCardsArray.length > 0 ?
                        <FlatList
                            style={styles.inlineScroll}
                            data={visitCardsArray}
                            renderItem={renderCardItem}
                            keyExtractor={(item,index)=>visitCardsKeys[index] }
                        />

                        : <Text> Ingen oprettet sad VisitKort</Text>
                    }
                    <View style={{right:10,bottom:10, borderWidth:2, borderRadius:50, backgroundColor: "transparent", position:"absolute"}}>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={GlobalStyles.touchButton}
                            onPress={() => { premium_max ? this.props.navigation.navigate('CreateVisitCard') :this.props.navigation.navigate('CreateVisitCard')}}
                        >
                            <Text style={{color:"white"}}>
                                { premium_max ? "Maximum af 10 visitkort nået - køb premium" :"Opret visitkort"}
                            </Text>
                        </TouchableOpacity>
                    </View>

                </View>
            )
        }
    }

}

const styles = StyleSheet.create({
    inlineScroll:{
        height: "auto"
    },
    container: {
        flex: 1,
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
    }
});
