import {Button, StyleSheet, Text, View} from 'react-native';
import * as React from 'react';
import Card from "./Cards";
//import GlobalStyles from ".../modules/GlobalStyle";

export default class VisitCardItem extends React.Component{
  render() {
    const{VisitCardItem} = this.props
    return(
      <View>
        <Card
          title={VisitCardItem.name}
          subTitle={VisitCardItem.jobTitle}
          subTitle2={VisitCardItem.company}

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
          iconlink={VisitCardItem.linkedInUrl}
          icon2={"instagram"}
          iconColor2={"black"}
          iconlink2={VisitCardItem.instagram}
        />
        </View>
    )
  }
}
