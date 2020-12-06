import firebase from "firebase";
import {
    Alert,
    Button,
    Linking,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import * as React from 'react';
import GlobalStyles from "../modules/GlobalStyle";
import ListVisitCardSpoofItem from "./items/ListVisitCardSpoofItem";
import {AntDesign} from "@expo/vector-icons";

export default class EditVisitCardScreen extends React.Component {

    //hente noget data der bliver preloadet. Når der skal ændres.
    state ={
        address: '',
        company: '',
        facebookUrl: '',
        userId: firebase.auth().currentUser.uid,
        instagram: '',
        jobTitle:'',
        linkedInUrl: '',
        name:'',
        email:''


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
            .ref('/visitCard/my/'+userId+'/'+id )
            .once( 'value', dataObject => {
                //her hentes opgaven fra databasen
                const visitCard = dataObject.val();
                this.setState({visitCard})
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
        const { address, company, facebookUrl, instagram, jobTitle, linkedInUrl, name,userId} = this.state;

        //henter id'et fra navigationen
        const id = this.props.navigation.getParam('id');

        try {
            //her opdateres KUN de felter, som vi har sagt må opdateres. (update > push)
            firebase
                .database()
                .ref('/visitCard/my/'+userId+'/'+id )
                .update({address, company, facebookUrl, instagram, jobTitle, linkedInUrl, name});
            Alert.alert("Dine informationer er nu opdateret :)");

            navigation.goBack();
        }catch (error) {
            console.log(error)
        }
    }



    render() {
        const {email,address, company, facebookUrl, instagram, jobTitle,name, linkedInUrl,visitCard} = this.state;

        let props ={
            email,address, company, facebookUrl, instagram, jobTitle,name, linkedInUrl
        }
        return(
            <View style={{paddingTop:30}}>
                <Text style={{textAlign:"right", paddingHorizontal:20}}>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                        <AntDesign name="closecircle" size={25} color="#0a66c2" />
                    </TouchableOpacity>
                </Text>

                <ListVisitCardSpoofItem
                    VisitCardItem={props}
                />
                <ScrollView style={{height:"50%",padding:20, marginBottom:90}}>
                    <View >
                        <Text >address</Text>
                        <TextInput
                            value={address}
                            onChangeText={this.handleAdressChange}
                            style={GlobalStyles.inputField}
                        />
                    </View>
                    <View>
                        <Text >company</Text>
                        <TextInput
                            value={company}
                            onChangeText={this.handleCompanyChange}
                            style={GlobalStyles.inputField}
                        />
                    </View>
                    <View>
                        <Text >facebookUrl</Text>
                        <TextInput
                            value={facebookUrl}
                            onChangeText={this.handlefacebookUrlChange}
                            style={GlobalStyles.inputField}
                        />
                    </View>
                    <View>
                        <Text >instagram</Text>
                        <TextInput
                            value={instagram}
                            onChangeText={this.handleInstagramChange}
                            style={GlobalStyles.inputField}
                        />
                    </View>
                    <View>
                        <Text >jobTitle</Text>
                        <TextInput
                            value={jobTitle}
                            onChangeText={this.handleJobTitleChange}
                            style={GlobalStyles.inputField}
                        />
                    </View>
                    <View>
                        <Text >linkedInUrl</Text>
                        <TextInput
                            value={linkedInUrl}
                            onChangeText={this.handleLinkedInUrlChange}
                            style={GlobalStyles.inputField}
                        />
                    </View>

                    <View >
                        <Text >Navn:</Text>
                        <TextInput
                            value={name}
                            onChangeText={this.handlenameChange}
                            style={GlobalStyles.inputField}
                        />
                    </View>



                    <Button title="Gem visitkort" onPress={this.updateTask} />
                    <View style={{ marginBottom:90}}></View>

                </ScrollView>
            </View>
        );
    }
}
