import {Button, StyleSheet, Text, View} from 'react-native';
import * as React from 'react';
import Card1 from "./Cards";
import {CardTwo} from "react-native-card-ui";
//import GlobalStyles from ".../modules/GlobalStyle";

export default class VisitCardItems extends React.Component{
  render() {
    const{VisitCardName} = this.props
    return(
      <View>
      <Card1
        title={VisitCardName.name}
        subTitle={VisitCardName.jobTitle}
        subTitle2={VisitCardName.company}

        profile={{
          uri:
            "http://www.annonce-musicien.fr/assets/user_xl-e4e8b0bbfd2332dce41ff66644dd16f2.png"
        }}
        image={{
          uri:
            "https://www.gettyimages.com/gi-resources/images/frontdoor/creative/PanoramicImagesRM/FD_image.jpg"
        }}
        icon={"linkedin-square"}
        iconColor={"blue"}
        iconlink={VisitCardName.linkedInUrl}
        icon2={"instagram"}
        iconColor2={"black"}
        iconlink2={VisitCardName.instagram}
      />
      </View>
    )
  }
}
