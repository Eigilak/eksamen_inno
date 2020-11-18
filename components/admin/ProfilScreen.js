import firebase from "firebase";
import {StyleSheet, Text, TextInput, View,Button,Alert,ScrollView} from 'react-native';
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
        unique_attribute_id:'',
        password:'',
        name:'',
        address:'',
        jobTitle:'',
        company:'',
        linkedInUrl:'',
        facebookUrl:'',
        instagram:'',
        error:true,
        response:{}
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
    async getOwnAttributes (MyFireBaseId){
        this.setState({response:''})

        var allUsers =[]
       await firebase
            .database()
            .ref('/UserAttributes')
            .once('value', snapshot => {
                allUsers.push(snapshot.val());

                var allUserAttributes = []

                console.log(allUsers)
                let push = true;
                /*Sorter all bruger attributter og gem dem der matcher med nuværende brugers ID*/
                allUsers.map((user_item, index) => {
                    var item_vals = Object.values(user_item)
                    item_vals.map((item_val, index) => {
                        if (item_val.id === MyFireBaseId) {
                            if(push){
                                let myAttributeKey = Object.keys(user_item);
                                this.setState({unique_attribute_id:myAttributeKey})

                                push = false
                            }
                            allUserAttributes.push(item_val)
                        }
                    });
                });

                var objAllUserAttributes = {}

                Object.assign(objAllUserAttributes, allUserAttributes);
                console.log("Mine attributter2",objAllUserAttributes)

                this.setState({response: objAllUserAttributes})

            });
    }


    getCurrentUserAttributes = async () =>{
        try {
            let myAttributes = [];
            /*Kald denne metode for at tjek info på opgivet brugere*/
             await this.getOwnAttributes(firebase.auth().currentUser.uid)


          await console.log("test",this.state.response)

            const { name, address, jobTitle, company, linkedInUrl, facebookUrl, instagram} = this.state.response[0]
            this.setState({ name, address, jobTitle, company, linkedInUrl, facebookUrl, instagram})
            console.log(name, address, jobTitle, company, linkedInUrl, facebookUrl, instagram)
        }catch (e) {
            console.log("Fejl!! \n",e)
        }

    }

    /*Gem brugerprofil*/
    saveProfile = async () =>{
        var {id,name,email,password,address, jobTitle, company, linkedInUrl, facebookUrl, instagram} = this.state
        var currentEmail = firebase.auth().currentUser.email;
        var newEmail = email
        var currentPassword = password

        /*Hvis nuværende email ikke er ligmed din fra state, så opdater mailen*/
         if(currentEmail !== newEmail ){
             this.reauthenticate(currentPassword).then(() => {
                 var user = firebase.auth().currentUser;
                 user.updateEmail(newEmail).then(() => {
                     console.log("Email updated!");
                 }).catch((error) => { console.log("Fejl i password \n",error); });
             }).catch((error) => { console.log(error); });
         }
        try {
             var myAttributes=[]
            myAttributes.push(this.state.response[0])

            if(!myAttributes){
                console.log("hvis der ikke er data")
                const reference = firebase
                    .database()
                    .ref('/UserAttributes/')
                    .push({ id,name, address, jobTitle, company, linkedInUrl, facebookUrl, instagram });

            }else {
                console.log("hvis der er data",myAttributes)
                try {

                    const {unique_attribute_id }= this.state

                    await firebase
                        .database()
                        .ref('/UserAttributes/' + unique_attribute_id)
                        // Vi bruger update, så kun de felter vi angiver, bliver ændret
                        .update({ id,name, address, jobTitle, company, linkedInUrl, facebookUrl, instagram });
                    // Når bilen er ændret, går vi tilbage.
                    Alert.alert("Din info er nu opdateret");
                } catch (error) {
                   console.log("Mine fejl",error)
                }
            }
        } catch (error) {
            Alert.alert(`Error: ${error.message}`);
        }
    }

    render() {
        const { email, name,company,address,facebookUrl,linkedInUrl,jobTitle,instagram,error,password } = this.state;
        return(
            <View style={GlobalStyles.mainContainer}>
                <ScrollView>
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
                </ScrollView>
            </View>
        )
    }
}
