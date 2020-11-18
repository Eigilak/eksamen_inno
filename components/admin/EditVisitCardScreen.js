import firebase from "firebase";
import {Button, StyleSheet, Text, View,ScrollView,SafeAreaView, Alert, TextInput} from 'react-native';
import * as React from 'react';
import GlobalStyles from "../modules/GlobalStyle";



export default class EditVisitCardScreen extends React.Component {

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


    }
    componentDidMount() {
        const id = this.props.navigation.getParam('id');
        this.getVisitCard(id)
    }

    getVisitCard = id =>  {
        //igen her loeades opgavens data (duration, titel, priority) ud fra det id, vi har fået med fra navigationen
        firebase
            .database()
            .ref('/visitkort/'+id )
            .once( 'value', dataObject => {
                //her hentes opgaven fra databasen
                const visitCard = dataObject.val();
                //her deles de forskellige værdier op
                const { address, company, facebookUrl, id, instagram, jobTitle, linkedInUrl, name} = visitCard;
                //her sættes staten så f.eks. opgavens titel er loadet når man går ind på siden
                this.setState({ address, company, facebookUrl, id, instagram, jobTitle, linkedInUrl, name});

            });

    }

    handleAdressChange = text => this.setState({ address: text });
    handleCompanyChange = text => this.setState({ company: text });
    handlefacebookUrlChange = text => this.setState({ facebookUrl: text });
    handleInstagramChange = text => this.setState({ instagram: text });
    handleJobTitleChange = text => this.setState({ jobTitle: text });
    handleLinkedInUrlChange = text => this.setState({ linkedInUrl: text });
    handlenameChange = text => this.setState({  name: text });

    updateTask = () =>  {

        const {navigation} = this.props;
        //henter staten på opgavens values
        const { address, company, facebookUrl, instagram, jobTitle, linkedInUrl, name} = this.state;

        //henter id'et fra navigationen
        const id = navigation.getParam('MMQ3rqvQdBWlbZiZZ8R');

        console.log('prøve '+address)
        try {
            //her opdateres KUN de felter, som vi har sagt må opdateres. (update > push)
            firebase.database().ref('/visitkort/'+id).update({address, company, facebookUrl, id, instagram, jobTitle, linkedInUrl, name});
            Alert.alert("Dine informationer er nu opdateret :)");
            navigation.goBack();
        }catch (error) {
            Alert.alert('Error: ${error.message}');
        }
    }



    render() {
        const {address, company, facebookUrl, instagram, jobTitle, linkedInUrl} = this.state;
        return(
            <SafeAreaView style={GlobalStyles.mainContainer}>
                <ScrollView>
                    <View>
                        <Text >address</Text>
                        <TextInput
                            value={address}
                            onChangeText={this.handleAdressChange}
                        />
                    </View>
                    <View>
                        <Text >company</Text>
                        <TextInput
                            value={company}
                            onChangeText={this.handleCompanyChange}
                        />
                    </View>
                    <View>
                        <Text >facebookUrl</Text>
                        <TextInput
                            value={facebookUrl}
                            onChangeText={this.handlefacebookUrlChange}
                        />
                    </View>
                    <View>
                        <Text >instagram</Text>
                        <TextInput
                            value={instagram}
                            onChangeText={this.handleInstagramChange}
                        />
                    </View>
                    <View>
                        <Text >jobTitle</Text>
                        <TextInput
                            value={jobTitle}
                            onChangeText={this.handleJobTitleChange}
                        />
                    </View>
                    <View>
                        <Text >linkedInUrl</Text>
                        <TextInput
                            value={linkedInUrl}
                            onChangeText={this.handleLinkedInUrlChange}
                        />
                    </View>

                    <View>
                        <Text >Navn:</Text>
                        <TextInput
                            value={name}
                            onChangeText={this.handlenameChange()}
                        />
                    </View>



                    <Button title="Gem visitkort" onPress={this.updateTask} />

                </ScrollView>
            </SafeAreaView>
        );
    }
}
