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

export default class Card2 extends Component<Props> {
  static defaultProps={

  }
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View
        style={{
          backgroundColor: this.props.background
            ? this.props.background
            : "#fff",
          margin: scale(10),
          alignSelf: "center",
          borderRadius: 12,
          elevation: 2,
          flexDirection: "column",
          width: screenWidth - scale(20),
          shadowColor: "#000",
          shadowOpacity: 0.16,
          shadowRadius: 2,
          shadowOffset: {
            height: 1,
            width: 0
          }
        }}
      >
        <View
          style={{
            height: verticalScale(75),
            marginRight: scale(20)
          }}
        >
          <View
            style={{
              flexDirection: "row",
              flex: 1
            }}
          >
            {this.props.profile ? (
              <View
                style={{
                  backgroundColor: "transparent",
                  flex: 1,
                  borderBottomLeftRadius: 12,
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <Image
                  source={this.props.profile}
                  style={{
                    width: scale(this.props.width || 40),
                    height: scale(this.props.height || 40)
                  }}
                  borderRadius={5}
                />
              </View>
            ) : null}
            <View
              style={{
                backgroundColor: "transparent",
                flex: this.props.profile ? 3 : 5,
                justifyContent: "center",
                marginLeft: 3
              }}
            >
              <Text
                style={{
                  color: this.props.background ? "#fff" : "#535bfe",
                  fontSize: scale(13),
                  margin: 3
                }}
              >
                {this.props.title}
              </Text>
              {this.props.background ? null : (
                <Text
                  style={{ color: "#adb3bf", fontSize: scale(11), margin: 3 }}
                >
                  {this.props.subTitle}
                </Text>
              )}
            </View>
            <View
              style={{
                flex: 1,
                borderBottomRightRadius: 12,
                justifyContent: "center",
                alignItems: "flex-end"
              }}
            >
              {this.props.icon ? (
                <Icon
                  name={this.props.icon}
                  color={this.props.iconColor}
                  size={scale(20)}
                />
              ) : null}
            </View>
          </View>
        </View>
      </View>
    );
  }
}
