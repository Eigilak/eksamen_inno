import * as React from 'react';
import {Button,Text,
    View,
    TextInput,
    ActivityIndicator,
    StyleSheet,
    Alert,
} from 'react-native';
import firebase from 'firebase';


/*Samme præncip som Login form, bare med oprettelse af bruger i handle submit*/
export default class SignupScreen extends React.Component {
    state = {
        email: '',
        password: '',
        isLoading: false,
        isCompleted: false,
        errorMessage: null,
    };

    startLoading = () => this.setState({ isLoading: true });
    endLoading = () => this.setState({ isLoading: false });
    setError = errorMessage => this.setState({ errorMessage });
    clearError = () => this.setState({ errorMessage: null });
    handleChangeEmail = email => this.setState({ email });
    handleChangePassword = password => this.setState({ password });

    handleSubmit = async () => {
        const { email, password } = this.state;
        try {
            this.startLoading();
            this.clearError();
            const result = await firebase
                .auth()
                .createUserWithEmailAndPassword(email, password);
            console.log(result);
            this.endLoading();
            this.setState({ isCompleted: true });
        } catch (error) {
            // Vi sender `message` feltet fra den error der modtages, videre.
            this.setError(error.message);
            this.endLoading();
        }
    };

    render = () => {
        const { errorMessage, email, password } = this.state;
        return (
            <View style={styles.mainContainer}>
                <View style={styles.innerContainer}>
                    <Text style={styles.header}>Sign up</Text>
                    <TextInput
                        placeholder="email"
                        value={email}
                        onChangeText={this.handleChangeEmail}
                        style={styles.inputField}
                    />
                    <TextInput
                        placeholder="password"
                        value={password}
                        onChangeText={this.handleChangePassword}
                        secureTextEntry
                        style={styles.inputField}
                    />
                    {errorMessage && (
                        <Text style={styles.error}>Error: {errorMessage}</Text>
                    )}
                    {this.renderButton()}
                </View>
            </View>
        );
    };

    renderButton = () => {
        const { isLoading } = this.state;
        if (isLoading) {
            return <ActivityIndicator />;
        }
        return <Button onPress={this.handleSubmit} title="Create user" />;
    };
}


const styles = StyleSheet.create({
    mainContainer:{
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    innerContainer:{
        minWidth:'80%'
    },
    error: {
        color: 'red',
    },
    inputField: {
        borderWidth: 1,
        margin: 10,
        padding: 10,
    },
    header: {
        fontSize: 40,
    },
});
