import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  Dimensions,
  Platform,
  ProgressViewIOS,
  ProgressBarAndroid,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  Linking
} from "react-native";
import propTypes from 'prop-types'
import { scale, verticalScale, moderateScale } from "react-native-size-matters";

import Icon from "react-native-vector-icons/FontAwesome";

let screenWidth = Dimensions.get("window").width;
let screenHeight = Dimensions.get("window").height;

export default class Card1 extends Component<Props> {
  static defaultProps={
    title:"",
    subTitle:"",
    subTitle2:"",
    subTitle3:"",
    profile:require('../../../assets/profilePic.png'),
    icon:"",
    iconlink:"",
    icon2:"",
    iconlink2:"",
    icon3:"",
    iconColor:"",
    image:require("../../../assets/profilePic.png")
  }
  constructor(props) {
    super(props);
  }
  render() {
    const {
      title,
      subTitle,
      subTitle2,
      subTitle3,
      image,
      profile,
      icon,
      iconlink,
      icon2,
      iconlink2,
      icon3,
      iconColor,
      iconColor2
    } = this.props;

    return (
      <View
        style={{
          backgroundColor: "transparent",
          alignSelf: "center",
          margin: 10,
          flexDirection: "column",
          width: screenWidth - 20,
          borderWidth: 0,
          borderRadius: 12,
          elevation: 2,
          shadowColor: "#777",
          shadowOpacity: 0.16,
          shadowRadius: 3,
          shadowOffset: {
            height: 1,
            width: 0
          }
        }}
      >
        <View
          style={{
            borderTopLeftRadius: scale(12),
            borderTopRightRadius: scale(12),
            backgroundColor: "transparent",
            height: verticalScale(200)
          }}
        >
          <Image
            borderRadius={12}
            source={image}
            style={{
              width: screenWidth - 20,
              height: verticalScale(200),
              resizeMode: "cover"
            }}
          />
        </View>
        <View
          style={{
            backgroundColor: "#fff",
            height: verticalScale(75),
            marginTop: scale(-12),
            borderBottomLeftRadius: scale(12),
            borderBottomRightRadius: scale(12)
          }}
        >
          <View
            style={{
              flexDirection: "row",
              flex: 1
            }}
          >
            <View
              style={{
                backgroundColor: "transparent",
                flex: 1,
                borderBottomLeftRadius: scale(12),
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Image
                source={profile}
                style={{
                  width: scale(50),
                  height: scale(50)
                }}
                borderRadius={25}
              />
            </View>
            <View
              style={{
                backgroundColor: "transparent",
                flex: 3,
                justifyContent: "center"
              }}
            >
              <Text
                style={{ color: "#000", fontSize: scale(13), margin: scale(3) }}
              >
                {title}
              </Text>
              <Text
                style={{ color: "#000", fontSize: scale(11), margin: scale(3) }}
              >
                {subTitle}
              </Text>
            </View>
            <View
              style={{
                backgroundColor: "#fff",
                flex: 1,
                borderBottomRightRadius: scale(12),
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              {icon ? (
                <TouchableOpacity onPress={() => Linking.openURL(iconlink)}>
                <Icon
                  name={icon}
                  color={iconColor}
                  size={scale(30)}
                /></TouchableOpacity>
              ) : null}
              {icon ? (
                <TouchableOpacity onPress={() => Linking.openURL(iconlink2)}>
                  <Icon
                    name={icon2}
                    color={iconColor2}
                    size={scale(30)}
                  /></TouchableOpacity>
              ) : null}
            </View>
          </View>
        </View>
      </View>
    );
  }
}
