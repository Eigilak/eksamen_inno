import firebase from "firebase";
import {StyleSheet, Text, TextInput, View,Button,Alert, ScrollView,Platform } from 'react-native';
import RadioButtonRN from 'radio-buttons-react-native';
import * as React from 'react';
import GlobalStyles from "../modules/GlobalStyle";
import TitleModule from "../modules/TitleModule";
import GLOBAL from "../modules/GlobalUser"
import { Checkbox } from 'react-native-paper';


export default class ProfilScreen extends React.Component {
    constructor() {
        super();
    }


    state={
        id:firebase.auth().currentUser.uid,
        user:firebase.auth().currentUser,
        email:firebase.auth().currentUser.email,
        unique_attribute_id:'',
        password:'',
        name:'',
        address:'',
        jobTitle:'',
        company:'',
        linkedInUrl:'',
        facebookUrl:'',
        instagram:'',
        type:'',
        radio_initial:'',
        error:true
    }

    /*Håndter alle ændringer af felter*/
    handleChangeEmail = email => this.setState({ email });
    handleChangePassword = password => this.setState({ password });
    handleChangeName = name => this.setState({ name });
    handleChangeCompany = company => this.setState({ company });
    handleChangeJobTitle = jobTitle => this.setState({ jobTitle });
    handleChangeAddress = address => this.setState({ address });
    handleChangeFacebookUrl = facebookUrl => this.setState({ facebookUrl });
    handleChangeLinkedInUrl = linkedInUrl => this.setState({ linkedInUrl });
    handleChangeInstagram = instagram => this.setState({ instagram });
    handleChangeType = type => {
        const type_val = type.label;
        this.setState({ type:type_val });
    };

    /*For ikke at logge ud efter email update køres denne funktion*/
    reauthenticate = (currentPassword) => {
        var user = firebase.auth().currentUser;
        var cred = firebase.auth.EmailAuthProvider.credential(
            user.email, currentPassword);
        return user.reauthenticateWithCredential(cred);
    }

    componentDidMount() {
        this.getCurrentUserAttributes()
    }

    getCurrentUserAttributes = async () =>{
        const {id,type} = this.state;
        try {
            /*Kald denne metode for at tjek info på opgivet brugere*/
            /*lolo*/
            var allUsers=[];
             await firebase
                 .database()
                 .ref('/UserAttributes/'+id)
                 .on('value', snapshot => {
                     if(snapshot.val()){
                         const currentAttributes = Object.values(snapshot.val());
                         const currentIdKeys = Object.keys(snapshot.val())
                         const unique_attribute_id = currentIdKeys[0]
                             const {name, address, jobTitle, company, linkedInUrl, facebookUrl, instagram,type} = currentAttributes[0]
                             this.setState({name, address, jobTitle, company, type, linkedInUrl,unique_attribute_id, facebookUrl, instagram})
                     }
                  });
        }catch (e) {
            console.log("Fejl!! \n",e)
        }

        if(this.state.type ==='company '){
            this.setState({radio_initial:1})
        }else{
            this.setState({radio_initial:2})
        }

    }

    /*Gem brugerprofil*/
    saveProfile = async () =>{
        var {id,name,email,password,address, type , jobTitle, company, linkedInUrl, facebookUrl, instagram,unique_attribute_id} = this.state
        var currentEmail = firebase.auth().currentUser.email;
        var newEmail = email
        var currentPassword = password

        /*Hvis nuværende email ikke er ligmed din fra state, så opdater mailen*/
         if(currentEmail !== newEmail ){
             this.reauthenticate(currentPassword).then(() => {
                 var user = firebase.auth().currentUser;
                 user.updateEmail(newEmail).then(() => {
                 }).catch((error) => { console.log("Fejl i password \n",error); });
             }).catch((error) => { console.log(error); });

             this.setState({})
         }

        try {
            if(!unique_attribute_id){
                console.log("hvis der ikke er data")
                const reference = firebase
                    .database()
                    .ref('/UserAttributes/'+id)
                    .push({ id,name,type, address, jobTitle, company, linkedInUrl, facebookUrl, instagram });
                if(Platform.OS != "web"){
                    Alert.alert("Din info er nu opdateret");
                }else {
                    alert("Dine info er nu opdateret")
                }
            }else {
                try {
                    console.log("hvis der er data")

                    await firebase
                        .database()
                        .ref('/UserAttributes/'+id+"/"+unique_attribute_id)
                        // Vi bruger update, så kun de felter vi angiver, bliver ændret
                        .update({ id,name,type ,address, jobTitle, company,email, linkedInUrl, facebookUrl, instagram });

                    // Når bilen er ændret, går vi tilbage.
                    if(Platform.OS != "web"){
                        Alert.alert("Din info er nu opdateret");
                    }else {
                        alert("Dine info er nu opdateret")
                    }
                } catch (error) {
                   console.log("Mine fejl",error)
                }
            }
        } catch (error) {
            console.log(error)
        }
    }



    render() {
        const radioBtns = [
            {label: 'company'},
            {label: 'personal'}
        ];

        const { email, name,type,company,address,facebookUrl,linkedInUrl,jobTitle,instagram,password } = this.state;
        return(
            <View style={GlobalStyles.mainContainer}>
                <ScrollView style={GlobalStyles.createContainer}>
                    <TitleModule title={"Din profil"}/>
                    <View style={GlobalStyles.myInfoContainer}>
                        <View>
                            <Text> Email</Text>
                            <TextInput
                                placeholder="email@email.dk"
                                value={email}
                                onChangeText={this.handleChangeEmail}
                                style={GlobalStyles.inputField}
                            />
                        </View>
                        <View>
                            <Text> Type</Text>

                            <RadioButtonRN
                                data={radioBtns}
                                value={type}
                                initial={1}
                                activeColor={"black"}
                                selectedBtn={this.handleChangeType}
                            />
                        </View>
                        <View>
                            <Text>Navn</Text>
                            <TextInput
                                placeholder="name"
                                value={name}
                                onChangeText={this.handleChangeName}
                                style={GlobalStyles.inputField}
                            />
                        </View>

                        <View>
                            <Text>Addresse</Text>
                            <TextInput
                                placeholder="Addresse "
                                value={address}
                                onChangeText={this.handleChangeAddress}
                                style={GlobalStyles.inputField}
                            />
                        </View>

                        <View>
                            <Text>Virksomhed</Text>
                            <TextInput
                                placeholder="company"
                                value={company}
                                onChangeText={this.handleChangeCompany}
                                style={GlobalStyles.inputField}
                            />
                        </View>

                        <View>
                            <Text>Jobtitel</Text>
                            <TextInput
                                placeholder="Jobtitel"
                                value={jobTitle}
                                onChangeText={this.handleChangeJobTitle}
                                style={GlobalStyles.inputField}
                            />
                        </View>

                        <View>
                            <Text>
                                Facebook link
                            </Text>
                            <TextInput
                                placeholder="facebook link"
                                value={facebookUrl}
                                onChangeText={this.handleChangeFacebookUrl}
                                style={GlobalStyles.inputField}
                            />
                        </View>

                        <View>
                            <Text>
                                LinkedIn Url
                            </Text>
                            <TextInput
                                placeholder="LinkedIn Url"
                                value={linkedInUrl}
                                onChangeText={this.handleChangeLinkedInUrl}
                                style={GlobalStyles.inputField}
                            />
                        </View>

                        <View>
                            <Text>Instagram url</Text>
                            <TextInput
                                placeholder="instagram"
                                value={instagram}
                                onChangeText={this.handleChangeInstagram}
                                style={GlobalStyles.inputField}
                            />
                        </View>

                        <View>
                            <TextInput
                                placeholder="Verify your password"
                                value={password}
                                onChangeText={this.handleChangePassword}
                                style={GlobalStyles.inputField}
                            />
                            <Button title={"Gem"} onPress={this.saveProfile}/>
                        </View>

                    </View>
                </ScrollView>
            </View>
        )
    }
}
