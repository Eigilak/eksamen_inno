import firebase from "firebase";
import {Button, StyleSheet, Text, View,ScrollView,SafeAreaView, Alert, TextInput} from 'react-native';
import * as React from 'react';
import GlobalStyles from "../modules/GlobalStyle";

//import firebase from 'firebase';

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

    }
      handleAdressField = text => this.setState({ address: text });
      handleCompanyField = text => this.setState({ company: text });
      handlefacebookUrlField = text => this.setState({ facebookUrl: text });
      handleInstagramField = text => this.setState({ instagram: text });
      handleJobTitleField = text => this.setState({ jobTitle: text });
      handleLinkedInUrlField = text => this.setState({ linkedInUrl: text });
      handlenameField = text => this.setState({  name: text });

            handleSave = () => {
                const { adress, company,facebookUrl,id,instagram,jobTitle,linkedInUrl,name } = this.state;
                try {
                  const reference = firebase
                      .database()
                      .ref('/visitkort/')
                      .push({ adress, company,facebookUrl,id, instagram,jobTitle,linkedInUrl,name });
                  Alert.alert(`Saved`);
                  this.setState({
                   address: '',
                    company: '',
                   facebookUrl: '',
                   id: firebase.auth().currentUser.uid,
                     instagram: '',
                   jobTitle:'',
                   linkedInUrl: '',
                  });
                } catch (error) {
                 Alert.alert(`Error: ${error.message}`);
                }
              };


    render() {
        const {address, company, facebookUrl, instagram, jobTitle, linkedInUrl} = this.state;
        return(
            <SafeAreaView style={GlobalStyles.mainContainer}>
                <ScrollView>
                    <View>
                    <Text >address</Text>
                    <TextInput
                        value={address}
                          onChangeText={this.handleAdressField}
                          />
                           </View>
                    <View>
                    <Text >company</Text>
                    <TextInput
                        value={company}
                          onChangeText={this.handleCompanyField}
                          />
                           </View>
                     <View>
                     <Text >facebookUrl</Text>
                     <TextInput
                         value={facebookUrl}
                           onChangeText={this.handlefacebookUrlField}
                           />
                            </View>
                      <View>
                      <Text >instagram</Text>
                      <TextInput
                          value={instagram}
                            onChangeText={this.handleInstagramField}
                            />
                             </View>
                      <View>
                      <Text >jobTitle</Text>
                      <TextInput
                          value={jobTitle}
                            onChangeText={this.handleJobTitleField}
                            />
                             </View>
                      <View>
                      <Text >linkedInUrl</Text>
                      <TextInput
                          value={linkedInUrl}
                            onChangeText={this.handleLinkedInUrlField}
                            />
                             </View>



                <Button title="Gem visitkort" onPress={this.handleSave} />

             </ScrollView>
            </SafeAreaView>
        );
    }
}
