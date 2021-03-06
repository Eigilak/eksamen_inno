import {Button, Dimensions, Image, Linking, StyleSheet, Text, TouchableOpacity, View,Alert,Platform} from 'react-native';
import * as React from 'react';
import {scale, verticalScale} from "react-native-size-matters";
import firebase from "firebase";
import Icon from "react-native-vector-icons/FontAwesome";
import {AntDesign, MaterialIcons,Entypo} from '@expo/vector-icons';
import GlobalStyles from "../../modules/GlobalStyle";
import {color} from "react-native-reanimated";

let screenWidth = Dimensions.get("window").width;
let screenHeight = Dimensions.get("window").height;


export default class ListVisitCardItem extends React.Component{


    handlePress = () => {
        // Her pakker vi ting ud fra props
        const {id, onSelect,url,userId,qrSelect} = this.props
        // Kalder den onSelect prop vi får, med det ID vi har fået som argument.
        onSelect(id);
    };

    handlePressQr = () => {
        // Her pakker vi ting ud fra props
        const {id, qrSelect} = this.props

        qrSelect(id)
    };

    handleDelete = ()=> {
        const {deleteItem} = this.props
        deleteItem()
    }



    render() {
        const{VisitCardItem,type_of} = this.props

        return(
                <View style={styles.mainListVisitCardContainer}>

                    <View style={styles.cardImgContainer}>

                        <Image
                            source={require('../../../assets/visitCard/VisitCard_placeholder.jpg')}
                            style={styles.cardImage}
                        />
                        <Text style={{textAlign:"right", position:"absolute",right:0, paddingHorizontal:10,marginTop:10,marginRight:-10}}>
                            <TouchableOpacity onPress={this.handleDelete}>
                                <AntDesign name="closecircle" size={25} color="white" />
                            </TouchableOpacity>
                        </Text>

                        <TouchableOpacity style={[GlobalStyles.touchButton, type_of!=="my" ? styles.recived: "",{position:"absolute",left:5,top:5}]}  onPress={this.handlePress} >
                            <Text style={{color: "white"}}>
                                {type_of === 'my' ?
                                    <Entypo name="edit" size={15} color="white" />
                                    :
                                    <Entypo name="magnifying-glass" size={24} color="white" />
                                }
                            </Text>
                        </TouchableOpacity>

                    </View>
                    <View style={styles.textContainer}>
                        <View style={styles.textInnerContainer}>
                            <View style={styles.profileImageContainer}>
                                { true ?
                                    <Image
                                        source={require('../../../assets/visitCard/Personal.jpg')}
                                        style={styles.profileImage}
                                    />
                                    :
                                    <Image
                                        source={require('../../../assets/visitCard/Personal.jpg')}
                                        style={styles.profileImage}
                                    />
                                }
                                <Text style={styles.visitcardText}> {VisitCardItem.name}</Text>
                                <Text style={styles.visitcardText}> {VisitCardItem.jobTitle} hos {VisitCardItem.company} </Text>
                                <Text style={styles.visitcardText}> {VisitCardItem.email} </Text>
                                <Text style={styles.visitcardText}> {VisitCardItem.address} </Text>
                            </View>
                            <View styles={styles.visitCardTextContainer}>

                                {type_of === 'my' &&
                                <TouchableOpacity
                                    activeOpacity={0.8}
                                    style={[GlobalStyles.touchButton, {maxWidth: 45}]}
                                    onPress={this.handlePressQr}
                                >
                                    <Text style={{color: "white"}}>
                                        <AntDesign name="qrcode" size={24} color={"white"}/>
                                    </Text>
                                </TouchableOpacity>
                                }
                                <View
                                    style={ styles.icons}
                                >
                                    { VisitCardItem.linkedInUrl
                                        ? (
                                            <TouchableOpacity onPress={() => Linking.openURL(VisitCardItem.linkedInUrl)}>
                                                <AntDesign name="linkedin-square" size={25} color="black" />
                                            </TouchableOpacity>
                                        )
                                        : null}
                                        { VisitCardItem.facebookUrl
                                        ? (
                                            <TouchableOpacity onPress={() => Linking.openURL(VisitCardItem.facebookUrl)}>
                                                <AntDesign name="facebook-square" size={25} color="black" />
                                            </TouchableOpacity>
                                        )
                                        : null}
                                </View>
                            </View>

                        </View>



                    </View>
                </View>
        )
    }
}
const styles = StyleSheet.create({
    mainListVisitCardContainer:{
        alignSelf: "center",
        margin: 10,
        backgroundColor:"white",
        marginBottom:30,
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
    recived:{
        backgroundColor: "#004083",
    },

    cardImgContainer:{
        borderTopLeftRadius: scale(12),
        borderTopRightRadius: scale(12),
        backgroundColor: "transparent",
        height: verticalScale(100)
    },
    cardImage:{
        width: screenWidth - 20,
        height: verticalScale(100),
        resizeMode: "cover",
        borderRadius: 12,
        position:'absolute'
    },
    textContainer:{
        zIndex:1,
        backgroundColor: "white",
        marginTop: -10,
        padding:20,
        borderBottomLeftRadius: scale(12),
        borderBottomRightRadius: scale(12)
    },
    textInnerContainer:{
        flexDirection: "row",
        flex: 1
    },
    profileImageContainer:{
        width:"50%",
        marginTop:0,
        backgroundColor: "transparent",
        flex: 1,
        borderBottomLeftRadius: scale(12),
        justifyContent: "flex-start",
        alignItems: "flex-start"
    },
    profileImage:{
        width: 100,
        height: 100,
        borderRadius:55,
        marginTop:-70
    },
    visitcardText:{
        color: "#000",
        fontSize: 15,
        margin: scale(3)
    },
    icons:{
        backgroundColor: "#fff",
        flex: 1,
        borderBottomRightRadius: scale(20),
        justifyContent: "space-around",
        flexDirection:"row",
        alignItems: "flex-end"
    },
    visitCardTextContainer:{
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "flex-start"
    }


})
