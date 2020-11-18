import firebase from "firebase";
import { StyleSheet, Text, View,Button, FlatList, SafeAreaView } from 'react-native';
import * as React from 'react';
import GlobalStyles from "../modules/GlobalStyle";
import VisitCardItems from "./items/VisitCardItems";
import TitleModule from "../modules/TitleModule.js";

const DATA = [
  {
    address: "Addresse",
    company: "Virk",
    facebookUrl: "Facebook",
    id: "0001",
    instagram: "https://www.instagram.com/lassthecreator/",
    jobTitle: "Pro Gamer",
    linkedInUrl: "https://www.linkedin.com/in/lasse-skovgaard-larsen-75b10216b/",
    name: "Lasse S. Larsen"
  },
  {
    address: "Addresse",
    company: "Virk",
    facebookUrl: "Facebook",
    id: "0002",
    instagram: "https://www.instagram.com/nadiadejgaard/",
    jobTitle: "Top Model",
    linkedInUrl: "https://www.linkedin.com/in/nadia-dejgaard-05056217a/",
    name: "Nadia Dejgaard Nielsen"
  }
];

export default class MyVisitCardsScreen extends React.Component {
    state={
        visitCards:[]
    }

    componentDidMount() {
        this.getYourVisitCards()
    }

    /*Hent mine opgivet informationer fra ProfilScreen*/
    getYourVisitCards = async () =>{
        try {
            /*Kald denne metode for at tjek info på opgivet brugere*/
            var allVisitCards=[];
            await firebase
                .database()
                .ref('/visitkort')
                .on('value', snapshot => {

                    allVisitCards.push(snapshot.val());
                    console.log(snapshot.val())

                    var cleanedVisitCards = []
                    /*Sorter all bruger attributter og gem dem der matcher med nuværende brugers ID*/
                    allVisitCards.map((visit_cardItem, index) => {
                        var item_vals = Object.values(visit_cardItem)
                        /*Inner loop for at se om ID er samme som opgivet*/
                        item_vals.map((item_val, index) => {
                            if (item_val.id === firebase.auth().currentUser.uid) {
                                /*Kun en gang push Tabel ID med dit eget ID*/
                                cleanedVisitCards.push(item_val)
                            }
                        });
                    });

                    console.log("Mine visitkort",cleanedVisitCards);


                    this.setState({visitCards:cleanedVisitCards})

                });
        }catch (e) {
            console.log("Fejl!! \n",e)
        }

    }

    /* Her oprettes et array der indeholder information om visitkort*/
    render() {
      //Lav en konstant kaldt render Carbrands som tager en parametre med til vores CarbrandItem kompnent
      const renderCarBrandItem = ({item}) =>(
        <VisitCardItems VisitCardName={item}/>
      )

        const {visitCards} = this.state;
      return(
        <View style={styles.container}>
          {/* Title med styling*/ }
          <TitleModule title = "Mine Visit Kort"/>
          {/* FlatList komponent med title propertien og en værdi HANS*/ }
          <FlatList
            style={styles.inlineScroll}
            data={visitCards}
            renderItem={renderCarBrandItem}
            keyExtractor={(item, index) => visitCards[index]}

          />
            <Button
                title={"Opret visitkort"}
                onPress={() => {this.props.navigation.navigate('CreateVisitCard')}}
            />


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


