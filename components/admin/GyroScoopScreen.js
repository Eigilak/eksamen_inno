import React, { Component } from 'react';
import { Text,Button, View, StyleSheet } from 'react-native';
import { Constants, DangerZone } from 'expo';
import { DeviceMotion } from 'expo-sensors';

export default class GyroScoopScreen extends Component {
    state = {
        motionData: []
    };

    componentDidMount() {
        this.toggleSubscription()
    }

    componentWillUnmount() {
        this.unsubscribe()
    }

    toggleSubscription = () => {
        if (this.subscription) {
            this.unsubscribe();
        } else {
            this.subscribe();
        }
    }

    subscribe = () => {
        this.subscription = DeviceMotion.addListener(motionData => {
            this.setState({ motionData });
        });
    }

    unsubscribe = () => {
        this.subscription && this.subscription.remove();
        this.subscription = null;
    }


    pressIt = () => {
        const{motionData} = this.state;
        const motionDataArray= [];
        console.log(motionData)
        motionDataArray.push(motionData)
        motionDataArray.map((motionDataItem,index) => {
            console.log("Orientation", motionDataItem.orientation)
            console.log("Y", motionDataItem.beta)
            const alpha = Math.abs(motionDataItem.alpha);
            const potraitOrLandscape = alpha > 3 || (alpha > 0 && alpha < 0.5) ? 'landscape' : 'protrait';
            this.setState({orientation: potraitOrLandscape})
        });
    }

    render() {
        return (
         <View style={styles.container}>
             <Button title={"Title"} onPress={this.pressIt}/>
         </View>
        );
    }
    }

const styles = StyleSheet.create({
container: {
flex: 1,
alignItems: 'center',
justifyContent: 'center',
backgroundColor: '#ecf0f1',
},
});
/*
* const motionData = this.state;
const motionDataArray = Object.values(motionData);
console.log(motionDataArray)
motionDataArray.map((motionDataItem,index) => {
/* console.log("acceleration",motionDataItem.acceleration.y)
 console.log("X",motionDataItem.rotationRate.alpha)
 console.log("Y",motionDataItem.rotationRate.beta)
 const alpha = Math.abs(motionDataItem.rotationRate.beta);
 const potraitOrLandscape = alpha > 3 || (alpha > 0 && alpha < 0.5) ? 'landscape' : 'protrait';
 this.setState({orientation:potraitOrLandscape})
* */
