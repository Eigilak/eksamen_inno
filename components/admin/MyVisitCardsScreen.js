import firebase from "firebase";
import {StyleSheet, Text, View, FlatList, TouchableOpacity, PermissionsAndroid, Alert} from 'react-native';
import * as React from 'react';
import GlobalStyles from "../modules/GlobalStyle";
//Screens
import ListVisitCardItem from "./items/ListVisitCardItem";
import TitleModule from "../modules/TitleModule.js";

export default class MyVisitCardsScreen extends React.Component {
    state={
        visitCards:[],
        loading:false,
        premium_max:false,
        myVisitCard:'/visitCard/my/',
        hasMotionPermission: null,
        onceFired:false,
        address: 'Howitzvej 60',
        company: 'CBS',
        facebookUrl: 'https://www.facebook.com/CopenhagenBusinessSchool',
        id: firebase.auth().currentUser.uid,
        instagram: 'https://www.instagram.com/cbscph/',
        jobTitle:'President',
        linkedInUrl: 'https://www.linkedin.com/school/copenhagen-business-school/',
        name:'Karl Emil Jensen',
        email:'cbs@student.cbs.dk'
    }

    constructor() {
        super();
    }
    componentDidMount() {
        this.getYourVisitCards();
    }


    /*Hent mine opgivet informationer fra ProfilScreen*/
    getYourVisitCards = async () =>{

        this.setState({loading:true});
        const {id} = this.state;
        try {
            /*Kald denne metode for at tjek info på opgivet brugere*/
            var allVisitCards=[];
            await firebase
                .database()
                .ref('/visitCard/my/'+id)
                .on('value', snapshot =>{
                    if(snapshot.val()){
                        this.setState({visitCards:snapshot.val()})
                        var length = Object.keys(snapshot.val())
                        if(length.length > 10){
                            this.setState({premium_max: true})
                        }
                    }

                    this.setState({loading:false});

                });
        }catch (e) {
            console.log("Fejl!! \n",e)
        }

    }

    handleSelectVisitCard = id => {
        this.props.navigation.navigate('EditMyVisitCard', { id });
    };


    handleSelectVisitCardQr = id => {
        this.props.navigation.navigate('MinQRKode', { id });
    };

    /* Her oprettes et array der indeholder information om visitkort*/
    render() {
        const { visitCards,loading,premium_max,orientation,id } = this.state;
        // Vi viser ingenting hvis der ikke er data
        if (!visitCards) {
            return null;
        }
        // Flatlist forventer et array. Derfor tager vi alle values fra vores cars objekt, og bruger som array til listen
        const visitCardsArray = Object.values(visitCards);
        // Vi skal også bruge alle IDer, så vi tager alle keys også.
        const visitCardsKeys = Object.keys(visitCards);

        /*render*/
        const renderCardItem = ({item,index}) => {
            const {urlRecieved} = this.state
            return(
                <ListVisitCardItem
                    VisitCardItem={item}
                    userId={firebase.auth().currentUser.uid}
                    type_of={"my"}
                    id={visitCardsKeys[index]}
                    onSelect={
                        this.handleSelectVisitCard
                    }
                    qrSelect={
                        this.handleSelectVisitCardQr
                    }
                    deleteItem={
                        () => {
                            if (Platform.OS === 'ios' || Platform.OS === 'android') {
                                Alert.alert('Er du sikkert?', 'Vil du gerne slette visitkortet?', [
                                    {text: 'Cancel', style: 'cancel'},
                                    // Vi bruger this.handleDelete som eventHandler til onPress
                                    {text: 'Delete', style: 'destructive', onPress: async ()=>{
                                            try {
                                                await firebase
                                                    .database()
                                                    // Vi sætter bilens ID ind i stien
                                                    .ref("/visitCard/my/"+id+"/"+visitCardsKeys[index])
                                                    // Og fjerner data fra den sti
                                                    .remove();

                                                console.log("asdasd",visitCardsArray.length)

                                                if(visitCardsArray.length === 1){
                                                    this.setState({visitCards: []})
                                                }

                                                // Og går tilbage når det er udført
                                            } catch (error) {
                                                Alert.alert(error.message);
                                            }
                                        }},
                                ]);
                            }
                        }
                    }
                />
            )

        };

        if(loading){
            return (
                <View style={GlobalStyles.mainContainer}>
                    <TitleModule title = "Loading....."/>
                </View>

            )
        }else{
            return (
                <View style={GlobalStyles.mainContainer}>
                    {/* Title med styling*/ }
                    <TitleModule title = {"Mine visitkort: "+visitCardsArray.length}/>
                    {/* FlatList komponent med title propertien og en værdi HANS*/ }
                    {visitCardsArray.length > 0 ?
                        <FlatList
                            style={styles.inlineScroll}
                            data={visitCardsArray}
                            renderItem={renderCardItem}
                            keyExtractor={(item,index)=>visitCardsKeys[index] }
                        />

                        : <Text> Ingen oprettet VisitKort</Text>
                    }
                    <View style={{right:10,bottom:10, borderWidth:2, borderRadius:50, backgroundColor: "transparent", position:"absolute"}}>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={GlobalStyles.touchButton}
                            onPress={() => { premium_max ? this.props.navigation.navigate('Opret') :this.props.navigation.navigate('Opret')}}
                        >
                            <Text style={{color:"white"}}>
                                { premium_max ? "Maximum af 10 visitkort nået - køb premium" :"Opret visitkort"}
                            </Text>
                        </TouchableOpacity>
                    </View>

                </View>
            )
        }
    }

}

const styles = StyleSheet.create({
    inlineScroll:{
        height: "auto"
    },
    container: {
        flex: 1,
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
    }
});
