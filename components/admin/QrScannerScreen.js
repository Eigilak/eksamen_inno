import React, { useState, useEffect } from 'react';
import {Text, View, StyleSheet, Dimensions, TouchableOpacity, Alert} from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import TitleModule from "../modules/TitleModule";
import GlobalStyles from "../modules/GlobalStyle";
import {color} from "react-native-reanimated";
import firebase from "firebase";

export default function QrScannerScreen() {

    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);

    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);

        const ParsedJSON = JSON.parse(data)
       const userId = firebase.auth().currentUser.uid;
        const { address, company,facebookUrl,id,instagram,jobTitle,linkedInUrl,name,email } = ParsedJSON;
        console.log(company)
        try {
             firebase
                .database()
                .ref('/visitCard/recieved/'+userId)
                .push({ id, name, email, address, company,jobTitle, facebookUrl, instagram,linkedInUrl });
            Alert.alert("Du har modtaget dit visitkort fra "+name)

        } catch (error) {
            Alert.alert(`Error: ${error.message}`);
        }

    };

    if (hasPermission === null) {
        return <View style={GlobalStyles.mainContainer}>
            <TitleModule title = "Loading....."/>
        </View>

    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <View style={{ flex: 1 }}>
            <BarCodeScanner style={{ flex: 1, height:10 }}
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            >
                <View style={{
                    flex: 1,
                    backgroundColor: 'transparent',
                    flexDirection: 'row',
                    position:"absolute",
                    bottom:"20%",
                    left:"25%",
                    right:"25%",
                    }}>
                    {scanned &&
                    <TouchableOpacity
                        style={{
                            flex: 1,
                            alignSelf: 'flex-end',
                            alignItems: 'center',
                        }}
                        onPress={() => {
                            setScanned(false)
                        }}>
                        <Text style={[GlobalStyles.touchButton, {color: "white"}]}>
                            Scan igen
                        </Text>
                    </TouchableOpacity>
                    }

                </View>

            </BarCodeScanner>

        </View>
    );
}