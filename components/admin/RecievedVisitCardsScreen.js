import firebase from "firebase";
import {FlatList, StyleSheet, Text, View} from 'react-native';
import * as React from 'react';
import GlobalStyles from "../modules/GlobalStyle";
import TitleModule from "../modules/TitleModule";
import VisitCardListItem from "./items/VisitCardListItem";

const DATA = [
  {
    address: "Addresse",
    company: "Virk",
    facebookUrl: "Facebook",
    id: "0000",
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
  },
  {
    address: "Addresse",
    company: "Virk",
    facebookUrl: "Facebook",
    id: "0002",
    instagram: "https://www.instagram.com/lassthecreator/",
    jobTitle: "Pro Gamer",
    linkedInUrl: "https://www.linkedin.com/in/lasse-skovgaard-larsen-75b10216b/",
    name: "Lasse S. Larsen"
  },
  {
    address: "Addresse",
    company: "Virk",
    facebookUrl: "Facebook",
    id: "0003",
    instagram: "https://www.instagram.com/lassthecreator/",
    jobTitle: "Pro Gamer",
    linkedInUrl: "https://www.linkedin.com/in/lasse-skovgaard-larsen-75b10216b/",
    name: "Lasse S. Larsen"
  },
  {
    address: "Addresse",
    company: "Virk",
    facebookUrl: "Facebook",
    id: "0004",
    instagram: "https://www.instagram.com/lassthecreator/",
    jobTitle: "Pro Gamer",
    linkedInUrl: "https://www.linkedin.com/in/lasse-skovgaard-larsen-75b10216b/",
    name: "Lasse S. Larsen"
  },
];

export default class RecievedVisitCardsScreen extends React.Component {
    render() {
      const renderCarBrandItem = ({item}) =>(
        <VisitCardListItem VisitCardName={item}/>
      )
        return(
            <View style={GlobalStyles.mainContainer}>
              <TitleModule title = "Visit Kort"/>
              <FlatList
                style={GlobalStyles.inlineScroll}
                data={DATA}
                renderItem={renderCarBrandItem}
                keyExtractor={item => item.id}
              />

            </View>
        )
    }
}
