import firebase from "firebase";
import {
    Alert,
    Button, Dimensions,
    Image, Linking,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import * as React from 'react';
import GlobalStyles from "../../modules/GlobalStyle";
import {AntDesign} from "@expo/vector-icons";
import {scale, verticalScale} from "react-native-size-matters";
let screenWidth = Dimensions.get("window").width;
let screenHeight = Dimensions.get("window").height;
export default class SeeRecievedVisitCardItem extends React.Component {

    //hente noget data der bliver preloadet. Når der skal ændres.
    state ={
        address: '',
        company: '',
        facebookUrl: '',
        id: firebase.auth().currentUser.uid,
        instagram: '',
        jobTitle:'',
        linkedInUrl: '',
        name:'',
        email:'',
        userId:firebase.auth().currentUser.uid
    }
    componentDidMount() {
        const id = this.props.navigation.getParam('id');
        this.getVisitCard(id)
    }

    getVisitCard = id =>  {
        const {userId} = this.state
        //igen her loeades opgavens data (duration, titel, priority) ud fra det id, vi har fået med fra navigationen
        firebase
            .database()
            .ref('/visitCard/recieved/'+"/"+userId+"/"+id )
            .once( 'value', dataObject => {
                //her hentes opgaven fra databasen
                const visitCard = dataObject.val();
                //her deles de forskellige værdier op
                const { address, company, facebookUrl, id, instagram, jobTitle, linkedInUrl,email, name} = visitCard;
                //her sættes staten så f.eks. opgavens titel er loadet når man går ind på siden
                this.setState({ address, company, facebookUrl, id, instagram, jobTitle,email, linkedInUrl, name});

            });

    }

    render() {
        const{VisitCardItem} = this.props
        const {address, company, facebookUrl, instagram, jobTitle,name,email, linkedInUrl} = this.state;

        return(
            <View style={styles.mainListVisitCardContainer}>
                <View style={styles.cardImgContainer}>
                    <Image
                        source={require('../../../assets/visitCard/VisitCard_placeholder.jpg')}
                        style={styles.cardImage}
                    />
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
                            <Text style={styles.visitcardText}> {name}</Text>
                            <Text style={styles.visitcardText}> {jobTitle} hos {company} </Text>
                            <Text style={styles.visitcardText}> {email} </Text>
                            <Text style={styles.visitcardText}> {address} </Text>

                            <View styles={styles.visitCardTextContainer}>
                                <View
                                    style={ styles.icons}
                                >
                                    { linkedInUrl
                                        ? (
                                            <TouchableOpacity onPress={() => Linking.openURL(linkedInUrl)}>
                                                <AntDesign name="linkedin-square" size={50} color="black" />
                                            </TouchableOpacity>
                                        )
                                        : null}
                                    { facebookUrl
                                        ? (
                                            <TouchableOpacity onPress={() => Linking.openURL(facebookUrl)}>
                                                <AntDesign name="facebook-square" size={50} color="black" />
                                            </TouchableOpacity>
                                        )
                                        : null}
                                </View>
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
        height:"100%",
        minHeight:100,
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

    cardImgContainer:{
        borderTopLeftRadius: scale(12),
        borderTopRightRadius: scale(12),
        backgroundColor: "transparent",
        height: verticalScale(200)
    },
    cardImage:{
        width: screenWidth - 20,
        height: verticalScale(150),
        resizeMode: "cover",
        borderRadius: 12,
    },
    textContainer:{
        zIndex:1,
        backgroundColor: "white",
        marginTop: -10,
        padding:20,minHeight:100,
        borderBottomLeftRadius: scale(12),
        borderBottomRightRadius: scale(12)
    },
    textInnerContainer:{
        flexDirection: "row",
        flex: 1
    },
    profileImageContainer:{
        width:"100%",
        marginTop:0,
        backgroundColor: "transparent",
        flex: 1,
        borderBottomLeftRadius: scale(12),
        justifyContent: "center",
        alignItems: "center"
    },
    profileImage:{
        width: 150,
        height: 150,
        borderRadius:105,
        marginTop:-70
    },
    visitcardText:{
        color: "#000",
        fontSize: 20,
        margin: scale(3)
    },
    icons:{
        backgroundColor: "#fff",
        flex: 1,
        borderBottomRightRadius: scale(20),
        justifyContent: "space-between",
        flexDirection:"column"

    },
    visitCardTextContainer:{
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "flex-start"
    }


})
