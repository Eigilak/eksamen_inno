import firebase from "firebase";
import { StyleSheet, Text, View,Button, FlatList, SafeAreaView } from 'react-native';
import * as React from 'react';
import GlobalStyles from "../modules/GlobalStyle";
import VisitCardItems from "./items/VisitCardItems";

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
];

const Item = ({ title }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);


export default class MyVisitCardsScreen extends React.Component {
    constructor() {
        super();
    }
    navigateCreate = () => {
    }

    /* Her oprettes et array der indeholder information om visitkort*/
    render() {
        const VisitCard =
            {address: "Addresse",
                company: "Virk",
                facebookUrl: "facebook",
                id: "osd4VTO7vPhCIajcRpqrIBDwH9z2",
                instagram: "insta",
                jobTitle: "titel",
                linkedInUrl: "linkedin",
                name: "Navn"}
        ;

        //Lav en konstant kaldt render VisitCard som tager en parametre med til vores VisitCardItem kompnent
        const renderVisitCard = ({item}) =>(
            <VisitCardItems VisitCardName={item}/>
        )

      const renderItem = ({ item }) => (
        <Item title={item.title} />
      );

      return (
        <SafeAreaView style={styles.container}>
          <FlatList
            data={DATA}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
        </SafeAreaView>
      );
    }
}

const styles = StyleSheet.create({
    inlineScroll:{
        height: 100
    },
});
