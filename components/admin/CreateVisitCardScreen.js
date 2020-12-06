import firebase from "firebase";
import {Button, StyleSheet, Text, View,ScrollView,SafeAreaView, Alert, TextInput,TouchableOpacity} from 'react-native';
import * as React from 'react';
import GlobalStyles from "../modules/GlobalStyle";
import TitleModule from "../modules/TitleModule";



export default class CreateVisitCardScreen extends React.Component {

    state ={
        address: '',
        company: '',
        facebookUrl: '',
        id: firebase.auth().currentUser.uid,
        instagram: '',
        jobTitle:'',
        linkedInUrl: '',
        name:'',
        email:firebase.auth().currentUser.email
    }

    componentDidMount() {
        this.getCurrentUserAttributes()
    }
/*Test git*/

    handleAdressField = text => this.setState({ address: text });
    handleCompanyField = text => this.setState({ company: text });
    handlefacebookUrlField = text => this.setState({ facebookUrl: text });
    handleInstagramField = text => this.setState({ instagram: text });
    handleJobTitleField = text => this.setState({ jobTitle: text });
    handleLinkedInUrlField = text => this.setState({ linkedInUrl: text });
    handlenameField = text => this.setState({  name: text });
    handleEmailField = text => this.setState({email:text})

    handleSave = async () => {
            const { address, company,facebookUrl,id,instagram,jobTitle,linkedInUrl,name,email } = this.state;
            const {navigation} = this.props;
            try {
               await firebase
                  .database()
                  .ref('/visitCard/'+id)
                  .push({ id, name, email, address, company,jobTitle, facebookUrl, instagram,linkedInUrl });

              Alert.alert(`Visitkort oprettet`);
              this.setState({
               address: '',
                company: '',
               facebookUrl: '',
                  instagram: '',
               jobTitle:'',
               linkedInUrl: '',
                  email: ''
              });
                navigation.goBack();

            } catch (error) {
             Alert.alert(`Error: ${error.message}`);
            }

      };

    /*Hent mine opgivet informationer fra ProfilScreen*/
    getCurrentUserAttributes = async () =>{
        try {
            /*Kald denne metode for at tjek info på opgivet brugere*/
            var allUsers=[];
            await firebase
                .database()
                .ref('/UserAttributes/')
                .on('value', snapshot => {

                    allUsers.push(snapshot.val());

                    var allUserAttributes = []
                    var your_userAttribute_id = ''
                    var push = true;
                    /*Sorter all bruger attributter og gem dem der matcher med nuværende brugers ID*/
                    allUsers.map((user_item, index) => {
                        var item_vals = Object.values(user_item)
                        /*Inner loop for at se om ID er samme som opgivet*/
                        item_vals.map((item_val, index) => {
                            if (item_val.id === firebase.auth().currentUser.uid) {
                                /*Kun en gang push Tabel ID*/
                                if(push){
                                    your_userAttribute_id = Object.keys(user_item)
                                    this.setState({unique_attribute_id:your_userAttribute_id})
                                    push = false;
                                }
                                allUserAttributes.push(item_val)
                            }
                        });
                    });

                    var objAllUserAttributes = {}
                    if(your_userAttribute_id){
                        Object.assign(objAllUserAttributes, allUserAttributes);
                        const {name, address, jobTitle, company, linkedInUrl, facebookUrl, instagram} = objAllUserAttributes[0]
                        this.setState({name, address, jobTitle, company, linkedInUrl, facebookUrl, instagram})
                    }
                });
        }catch (e) {
            console.log("Fejl!! \n",e)
        }

    }


    handleBack = () => {
        const {navigation} = this.props;
        navigation.goBack()
    }


    render() {
        const {address, email, company, facebookUrl, instagram, jobTitle, linkedInUrl,name} = this.state;
        return(

            <SafeAreaView style={GlobalStyles.mainContainer}>
                <TitleModule title = "Opret et nyt visitkort"/>
                <ScrollView style={GlobalStyles.createContainer}>
                    <View>
                        <View>
                            <Text >Navn:</Text>
                            <TextInput
                                value={name}
                                onChangeText={this.handlenameField}
                                style={GlobalStyles.inputField}
                            />
                        </View>

                        <View>
                            <Text >Email:</Text>
                            <TextInput
                                value={email}
                                onChangeText={this.handleEmailField}
                                style={GlobalStyles.inputField}
                            />
                        </View>
                        <View>
                            <Text >jobTitle</Text>
                            <TextInput
                                value={jobTitle}
                                onChangeText={this.handleJobTitleField}
                                style={GlobalStyles.inputField}

                            />
                        </View>

                        <View>
                            <Text >company</Text>
                            <TextInput
                                value={company}
                                onChangeText={this.handleCompanyField}
                                style={GlobalStyles.inputField}
                            />
                        </View>

                        <View>
                            <Text >address</Text>
                            <TextInput
                                value={address}
                                onChangeText={this.handleAdressField}
                                style={GlobalStyles.inputField}
                            />
                        </View>

                    </View>

                     <View>
                         <Text style={{fontSize:30,paddingTop:10}}> Sociale</Text>
                         <View>
                             <Text >facebookUrl</Text>
                             <TextInput
                                 value={facebookUrl}
                                 onChangeText={this.handlefacebookUrlField}
                                 style={GlobalStyles.inputField}
                             />
                         </View>
                         <View>
                             <Text >instagram</Text>
                             <TextInput
                                 value={instagram}
                                 onChangeText={this.handleInstagramField}
                                 style={GlobalStyles.inputField}

                             />
                         </View>

                         <View>
                             <Text >linkedInUrl</Text>
                             <TextInput
                                 value={linkedInUrl}
                                 onChangeText={this.handleLinkedInUrlField}
                                 style={GlobalStyles.inputField}

                             />
                         </View>
                     </View>


                    <View styles={GlobalStyles.createButtonContainer}>
                        <TouchableOpacity activeOpacity={0.8} style={GlobalStyles.touchButton}  onPress={this.handleSave}>
                            <Text style={{color:"white",textAlign:"center"}}>Gem visitkort</Text>
                        </TouchableOpacity>

                        <TouchableOpacity  activeOpacity={0.8} style={GlobalStyles.touchButton}  onPress={this.handleBack}>
                            <Text style={{color:"white",textAlign:"center"}}>Gå tilbage</Text>
                        </TouchableOpacity>

                    </View>
             </ScrollView>
            </SafeAreaView>
        );
    }
}
