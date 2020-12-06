import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import TitleModule from "../modules/TitleModule";
import GlobalStyles from "../modules/GlobalStyle";
import {color} from "react-native-reanimated";

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
        alert(`Bar code with type ${type} and data ${data} has been scanned!`);
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