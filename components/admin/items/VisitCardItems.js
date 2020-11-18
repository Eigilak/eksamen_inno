import {Button, StyleSheet, Text, View} from 'react-native';
import * as React from 'react';
//import GlobalStyles from ".../modules/GlobalStyle";

export default class VisitCardItems extends React.Component{
  render() {
    const{VisitCardName} = this.props
    return(
      <View>
        <Text> "{VisitCardName.name}"</Text>
        <Text> "{VisitCardName.linkedInUrl}"</Text>
      </View>

      /*<CardTwo
        title={VisitCardName.name}
        subTitle={"Devlopper"}
        profile={{
          uri:
            "http://www.annonce-musicien.fr/assets/user_xl-e4e8b0bbfd2332dce41ff66644dd16f2.png"
        }}
        image={{
          uri:
            "https://www.gettyimages.com/gi-resources/images/frontdoor/creative/PanoramicImagesRM/FD_image.jpg"
        }}
        icon={"apple"}
        iconColor={"red"}
      />*/
    )
  }
}
