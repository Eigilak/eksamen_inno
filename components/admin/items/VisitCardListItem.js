import {Button, StyleSheet, Text, View} from 'react-native';
import * as React from 'react';
import CardTwo from "./CardTwo";
import {TouchableOpacity} from "react-native-web";
//import GlobalStyles from ".../modules/GlobalStyle";

export default class VisitCardListItem extends React.Component{
  render() {
    const{VisitCardName} = this.props
    return(
      <View>
        <TouchableOpacity>
          <CardTwo
          title={VisitCardName.name}
          subTitle={VisitCardName.jobTitle}
          profile={(
              '../../../assets/profilePic.png'
            )}
          icon={"forward"}
          iconColor={"grey"}
        />
        </TouchableOpacity>
      </View>
    )
  }
}
