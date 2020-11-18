import React, {Component} from "react";
import {Dimensions, Image, Text, View} from "react-native";
import {scale, verticalScale} from "react-native-size-matters";
import Icon from "react-native-vector-icons/FontAwesome";

let screenWidth = Dimensions.get("window").width;
let screenHeight = Dimensions.get("window").height;

export default class CardTwo extends Component<Props> {
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
