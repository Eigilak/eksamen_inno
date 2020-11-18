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
    id: "0001",
    instagram: "https://www.instagram.com/nadiadejgaard/",
    jobTitle: "Top Model",
    linkedInUrl: "https://www.linkedin.com/in/nadia-dejgaard-05056217a/",
    name: "Nadia Dejgaard Nielsen"
  }
];

export default class MyVisitCardsScreen extends React.Component {
    constructor() {
        super();
    }
    navigateCreate = () => {
    }

    /* Her oprettes et array der indeholder information om visitkort*/
    render() {
      //Lav en konstant kaldt render Carbrands som tager en parametre med til vores CarbrandItem kompnent
      const renderCarBrandItem = ({item}) =>(
        <VisitCardItems VisitCardName={item}/>
      )

      return(
        <View style={styles.container}>
          {/* Title med styling*/ }
          <TitleModule title = "Mine Visit Kort"/>
          {/* FlatList komponent med title propertien og en værdi HANS*/ }
          <FlatList
            style={styles.inlineScroll}
            data={DATA}
            renderItem={renderCarBrandItem}
            keyExtractor={item => item.id}
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


