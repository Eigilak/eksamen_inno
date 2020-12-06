import React, { Component } from 'react';
import {Text, Button, View, StyleSheet, Alert} from 'react-native';
import { Constants, DangerZone } from 'expo';
import * as ScreenOrientation from 'expo-screen-orientation';
import { DeviceMotion } from 'expo-sensors';
import firebase from "firebase";
export default class DeviceOrientationExample extends React.Component {
    state = {
        deviceMotionData: {},
        orientation:0,
        onceFired:false,
        address: 'Howitzvej 60',
        company: 'CBS',
        facebookUrl: 'https://www.facebook.com/CopenhagenBusinessSchool',
        id: firebase.auth().currentUser.uid,
        instagram: 'https://www.instagram.com/cbscph/',
        jobTitle:'President',
        linkedInUrl: 'https://www.linkedin.com/school/copenhagen-business-school/',
        name:'Karl Emil Jensen',
        email:'cbs@student.cbs.dk'
    }

    componentDidMount() {
        ScreenOrientation.getOrientationAsync();
        ScreenOrientation.unlockAsync();

        this._toggle();
    }

    componentWillUnmount() {
        this._unsubscribe();
    }

    _toggle = () => {
        if (this._subscription) {
            this._unsubscribe();
        } else {
            this._subscribe();
        }
    }

    _subscribe = () => {
        var onceFired = false;
        var count = 0
        this._subscription = DeviceMotion.addListener((deviceMotionData) => {
            if(deviceMotionData.orientation === 90){
                if(!onceFired){
                this.handleSave();
                    onceFired = true;
                }
            }else {
                onceFired = false;
            }
            this.setState({ orientation:deviceMotionData.orientation })
        });

    }

    _unsubscribe = () => {
        this._subscription && this._subscription.remove();
        this._subscription = null;
    }

    handleSave = async () => {
        const { address, company,facebookUrl,id,instagram,jobTitle,linkedInUrl,name,email } = this.state;
        const {navigation} = this.props;
        try {
            await firebase
                .database()
                .ref('/visitCard/recieved/'+id)
                .push({ id, name, email, address, company,jobTitle, facebookUrl, instagram,linkedInUrl });

            Alert.alert(`Visitkort oprettet`);
            navigation.goBack();

        } catch (error) {
            Alert.alert(`Error: ${error.message}`);
        }

    };

    render() {
        const {orientation,onceFired} = this.state

        if(orientation !== 0 && orientation === 90 || orientation === -90){

        }

        return (
            <View style={{flex: 1, justifyContent: 'center',alignItems: 'center'}}>
                <Text>DeviceMotion orientation: {orientation}</Text>
            </View>
        );
    }
}
