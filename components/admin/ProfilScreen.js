import firebase from "firebase";
import {StyleSheet, Text, TextInput, View,Button,Alert} from 'react-native';
import * as React from 'react';
import GlobalStyles from "../modules/GlobalStyle";
import TitleModule from "../modules/TitleModule";
import GLOBAL from "../modules/GlobalUser"


export default class ProfilScreen extends React.Component {
    constructor() {
        super();
    }


    state={
        id:firebase.auth().currentUser.uid,
        user:firebase.auth().currentUser,
        email:firebase.auth().currentUser.email,
        password:'',
        name:'',
        address:'',
        jobTitle:'',
        company:'',
        linkedInUrl:'',
        facebookUrl:'',
        instagram:'',
        error:true,
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
    getOwnAttributes = (allUsers,MyFireBaseId) =>{

        var allUsers =[]
        firebase
            .database()
            .ref('/UserAttributes')
            .once('value', snapshot => {
                allUsers.push(snapshot.val());

                var allUserAttributes = []

                console.log(allUserAttributes)

                /*Sorter all bruger attributter og gem dem der matcher med nuværende brugers ID*/
                allUsers.map((user_item, index) => {
                    var item_vals = Object.values(user_item)
                    item_vals.map((item_val, index) => {
                        if (item_val.id === MyFireBaseId) {
                            allUserAttributes.push(item_val)
                        }
                    });
                });
                var objAllUserAttributes = {}
                Object.assign(objAllUserAttributes, allUserAttributes);

                return objAllUserAttributes
            });
    }


    getCurrentUserAttributes = () =>{
        try {

            /*Kald denne metode for at tjek info på opgivet brugere*/
            var myAttributes = this.getOwnAttributeID(allUsers,firebase.auth().currentUser.uid)

            const { name, address, jobTitle, company, linkedInUrl, facebookUrl, instagram} = myAttributes[0]
            this.setState({ name, address, jobTitle, company, linkedInUrl, facebookUrl, instagram})
            console.log(name, address, jobTitle, company, linkedInUrl, facebookUrl, instagram)


        }catch (e) {
            console.log("Fejl!! \n",e)
        }

    }

    /*Gem brugerprofil*/
    saveProfile = () =>{
        var {id,name,email,password,address, jobTitle, company, linkedInUrl, facebookUrl, instagram} = this.state
        var currentEmail = firebase.auth().currentUser.email;
        var newEmail = email
        var currentPassword = password

         if(currentEmail !== newEmail ){
             this.reauthenticate(currentPassword).then(() => {
                 var user = firebase.auth().currentUser;
                 user.updateEmail(newEmail).then(() => {
                     console.log("Email updated!");
                 }).catch((error) => { console.log("Fejl i password \n",error); });
             }).catch((error) => { console.log(error); });
         }
        try {
             var allUsers;

            firebase
                .database()
                .ref('/UserAttributes/')
                .on('value', snapshot => {
                    allUsers = snapshot.val()
                });

            if(!allUsers){




                const reference = firebase
                    .database()
                    .ref('/UserAttributes/'+myAttributeId)
                    .push({ id,name, address, jobTitle, company, linkedInUrl, facebookUrl, instagram });
                if(Platform.OS !== "web"){
                    Alert.alert(`Gemt`);
                }
                else {
                    alert('Gemt!')
                }
            }else {

            }
        } catch (error) {
            Alert.alert(`Error: ${error.message}`);
        }
    }

    render() {
        const { email, name,company,address,facebookUrl,linkedInUrl,jobTitle,instagram,error,password } = this.state;
        return(
            <View style={GlobalStyles.mainContainer}>
                <TitleModule title={"Din profil"}/>
                <View style={GlobalStyles.myInfoContainer}>
                    <Text> Oplysninger</Text>
                    <View style={GlobalStyles.myInfoRightContainer}>
                        <TextInput
                            placeholder="email"
                            value={email}
                            onChangeText={this.handleChangeEmail}
                            style={GlobalStyles.inputField}
                        />
                        <TextInput
                            placeholder="name"
                            value={name}
                            onChangeText={this.handleChangeName}
                            style={GlobalStyles.inputField}
                        />
                        <TextInput
                            placeholder="Addresse "
                            value={address}
                            onChangeText={this.handleChangeAddress}
                            style={GlobalStyles.inputField}
                        />
                        <TextInput
                            placeholder="company"
                            value={company}
                            onChangeText={this.handleChangeCompany}
                            style={GlobalStyles.inputField}
                        />
                        <TextInput
                            placeholder="Jobtitel"
                            value={jobTitle}
                            onChangeText={this.handleChangeJobTitle}
                            style={GlobalStyles.inputField}
                        />
                        <TextInput
                            placeholder="facebook link"
                            value={facebookUrl}
                            onChangeText={this.handleChangeFacebookUrl}
                            style={GlobalStyles.inputField}
                        />
                        <TextInput
                            placeholder="LinkedIn Url"
                            value={linkedInUrl}
                            onChangeText={this.handleChangeLinkedInUrl}
                            style={GlobalStyles.inputField}
                        />
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
            </View>
        )
    }
}
