import firebase from "firebase";
import {StyleSheet, Text, TextInput, View} from 'react-native';
import * as React from 'react';
import GlobalStyles from "../modules/GlobalStyle";
import TitleModule from "../modules/TitleModule";

export default class ProfilScreen extends React.Component {
    constructor() {
        super();
    }

    state={
        email:'',
        name:'',
        address:'',
        jobTitle:'',
        company:'',
        linkedInUrl:'',
        facebookUrl:'',
        instagram:''
    }

    handleChangeEmail = email => this.setState({ email });
    handleChangeName = name => this.setState({ name });
    handleChangeCompany = company => this.setState({ company });
    handleChangeAddress = address => this.setState({ address });
    handleChangeFacebookUrl = facebookUrl => this.setState({ facebookUrl });
    handleChangeLinkedInUrl = linkedInUrl => this.setState({ linkedInUrl });
    handleChangeInstragram = instagram => this.setState({ instagram });

    render() {
        const { email, name,company,address,facebookUrl,linkedInUrl,jobTitle,instagram } = this.state;
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
                </View>
            </View>
        )
    }
}
