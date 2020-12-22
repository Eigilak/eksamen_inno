import firebase from "firebase";
import {StyleSheet, Text, View, Button, FlatList, SafeAreaView, Alert, TouchableOpacity} from 'react-native';
import * as React from 'react';
import GlobalStyles from "../modules/GlobalStyle";
import ListVisitCardItem from "./items/ListVisitCardItem";
import TitleModule from "../modules/TitleModule.js";
import {AntDesign,MaterialIcons} from "@expo/vector-icons";

export default class RecievedVisitCardsScreen extends React.Component {
    state={
        RecievedvisitCards:[],
        loading:false,
        premium_max:false,
        urlRecieved:'/visitCard/recieved/',
        id: firebase.auth().currentUser.uid,
        myVisitCard:'/visitCard/my/',
        address: 'Howitzvej 60',
        company: 'CBS',
        facebookUrl: 'https://www.facebook.com/CopenhagenBusinessSchool',
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
        this.getRecievedCards();
    }


    /*Test af Master*/
    /*Hent mine opgivet informationer fra ProfilScreen*/
    getRecievedCards = async () =>{

        this.setState({loading:true});
        const {id} = this.state;
        try {
            /*Kald denne metode for at tjek info på opgivet brugere*/
            var allVisitCards=[];
            await firebase
                .database()
                .ref('/visitCard/recieved/'+id)
                .on('value', snapshot =>{
                    if(snapshot.val()){
                        console.log(snapshot.val())
                        this.setState({RecievedvisitCards:snapshot.val()})
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
        this.props.navigation.navigate('SeeRecievedVisitCard', { id });
    };


    handleSave = async () => {
        const { address, company,facebookUrl,id,instagram,jobTitle,linkedInUrl,name,email } = this.state;
        const {navigation} = this.props;
        try {
            await firebase
                .database()
                .ref('/visitCard/recieved/'+id)
                .push({ id, name, email, address, company,jobTitle, facebookUrl, instagram,linkedInUrl });

            Alert.alert(`Du har modtaget et visitkort! `);

        } catch (error) {
            Alert.alert(`Error: ${error.message}`);
        }

    };

    confirmDelete = () => {
        if(Platform.OS ==='ios' || Platform.OS ==='android'){
            Alert.alert('Er du sikkert?', 'Vil du gerne slette visitkortet?', [
                { text: 'Cancel', style: 'cancel' },
                // Vi bruger this.handleDelete som eventHandler til onPress
                { text: 'Delete', style: 'destructive', onPress: this.handleDelete },
            ]);
        }
    };

    // Vi spørger brugeren om han er sikker

    // Vi sletter den aktuelle bil
    handleDelete =  async () => {
        try {
            const response = await firebase
                .database()
                // Vi sætter bilens ID ind i stien
                .ref("/visitCard/recieved/"+userId+"/"+id)
                // Og fjerner data fra den sti
                .remove();

            console.log("response delte",response)

            // Og går tilbage når det er udført
        } catch (error) {
            Alert.alert(error.message);
        }
    };


    /* Her oprettes et array der indeholder information om visitkort*/
    render() {
        const { RecievedvisitCards,loading,premium_max,id } = this.state;
        // Vi viser ingenting hvis der ikke er data
        if (!RecievedvisitCards) {
            return <Text> Ingen modtaget VisitKort</Text>;
        }

        // Flatlist forventer et array. Derfor tager vi alle values fra vores cars objekt, og bruger som array til listen
        let RecievedvisitCardsArray = Object.values(RecievedvisitCards);
        // Vi skal også bruge alle IDer, så vi tager alle keys også.
        const RecievedvisitCardsKeys = Object.keys(RecievedvisitCards);

        /*render*/
        const renderCardItem = ({item,index}) => {
            const {urlRecieved} = this.state
                return(
                    <ListVisitCardItem
                        VisitCardItem={item}
                        userId={firebase.auth().currentUser.uid}
                        type_of={"recieved"}
                        id={RecievedvisitCardsKeys[index]}
                        onSelect={
                            this.handleSelectVisitCard
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
                                                        .ref("/visitCard/recieved/"+id+"/"+RecievedvisitCardsKeys[index])
                                                        // Og fjerner data fra den sti
                                                        .remove();

                                                     console.log("asdasd",RecievedvisitCardsArray.length)

                                                    if(RecievedvisitCardsArray.length === 1){
                                                        this.setState({RecievedvisitCards: []})
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
                    <TitleModule title = {"Mine modtaget visitkort: "+RecievedvisitCardsArray.length}/>
                    {/* FlatList komponent med title propertien og en værdi HANS*/ }
                    {RecievedvisitCardsArray.length > 0 ?
                        <FlatList
                            style={styles.inlineScroll}
                            data={RecievedvisitCardsArray}
                            renderItem={renderCardItem}
                            keyExtractor={(item,index)=>RecievedvisitCardsKeys[index] }
                        />

                        : <Text> Ingen modtaget VisitKort</Text>
                    }

                    <View style={{right:10,bottom:10, borderWidth:2, borderRadius:50, backgroundColor: "transparent", position:"absolute"}}>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={GlobalStyles.touchButton}
                            onPress={() => { premium_max ? this.props.navigation.navigate('QR') :this.props.navigation.navigate('QR')}}
                        >
                            <Text style={{color:"white"}}>
                                <AntDesign name="qrcode" size={24} color={"white"} />
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{left:10,bottom:10, borderWidth:2, borderRadius:50, backgroundColor: "transparent", position:"absolute"}}>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={GlobalStyles.touchButton}
                            onPress={this.handleSave}
                        >
                            <Text style={{color:"white"}}>
                                <MaterialIcons name="nfc" size={24} color="white" />
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
        height: 100,

    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',

    }
});
