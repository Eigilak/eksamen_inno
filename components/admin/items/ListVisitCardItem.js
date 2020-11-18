import {Button, Dimensions, Image, Linking, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import * as React from 'react';
import {scale, verticalScale} from "react-native-size-matters";
import Icon from "react-native-vector-icons/FontAwesome";
import { AntDesign } from '@expo/vector-icons';

let screenWidth = Dimensions.get("window").width;
let screenHeight = Dimensions.get("window").height;


export default class ListVisitCardItem extends React.Component{
    render() {
        const{VisitCardItem} = this.props

        return(
            <View style={styles.mainContainer}>
                <View style={styles.cardImgContainer}>
                    <Image
                        source={require('../../../assets/visitCard/VisitCard_placeholder.jpg')}
                        style={styles.cardImage}
                    />
                </View>
                <View style={styles.textContainer}>
                    <View style={styles.textInnerContainer}>
                        <View style={styles.profileImageContainer}>
                            <Image
                                source={require('../../../assets/visitCard/VisitCard_Profile.png')}
                                style={styles.profileImage}
                            />
                        </View>
                        <View styles={styles.visitCardTextContainer}>
                            <Text style={styles.visitcardText}>Navn: {VisitCardItem.name}</Text>
                            <Text style={styles.visitcardText}>Jobtitel: {VisitCardItem.jobTitle}</Text>
                            <Text style={styles.visitcardText}>Virksomhed: {VisitCardItem.company}</Text>
                        </View>
                        <View
                            style={ styles.icons}
                        >{/*
                            {VisitCardItem.linkedInUrl ? (
                            <TouchableOpacity onPress={() => Linking.openURL(VisitCardItem.linkedInUrl)}>
                                <AntDesign name="linkedin-square" size={24} color="black" />
                            </TouchableOpacity>
                        ) : null}*/}
                        </View>
                    </View>



                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    mainContainer:{
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
    },

    cardImgContainer:{
        borderTopLeftRadius: scale(12),
        borderTopRightRadius: scale(12),
        backgroundColor: "transparent",
        height: verticalScale(200)
    },
    cardImage:{
        width: screenWidth - 20,
        height: verticalScale(200),
        resizeMode: "cover",
        borderRadius: 12
    },
    textContainer:{
        backgroundColor: "#fff",
        padding:20,
        borderBottomLeftRadius: scale(12),
        borderBottomRightRadius: scale(12)
    },
    textInnerContainer:{
        flexDirection: "row",
        flex: 1
    },
    profileImageContainer:{
        width:"20%",
        backgroundColor: "transparent",
        flex: 1,
        borderBottomLeftRadius: scale(12),
        justifyContent: "flex-start",
        alignItems: "flex-start"
    },
    profileImage:{
        width: scale(50),
        height: scale(50),
        borderRadius:25
    },
    visitcardText:{
        color: "#000", fontSize: scale(11), margin: scale(3)
    },
    icons:{
        backgroundColor: "#fff",
        flex: 1,
        borderBottomRightRadius: scale(12),
        justifyContent: "center",
        alignItems: "center"
    },
    visitCardTextContainer:{
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "flex-start"
    }


})
