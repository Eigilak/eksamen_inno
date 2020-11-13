import React,{Component} from 'react'
import {Text,View, StyleSheet,Image} from 'react-native'

export default class TitleModule extends Component {
    render() {
        /*Sæt min title som en props, så den kan bruges */
        const{title}=this.props

        return(
            <View style={{paddingTop: 25}}>
                <Text style={styles.title}>
                    {title}
                </Text>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    title:{
        fontSize:25,
        paddingBottom:20,
        textAlign:'center',
        fontWeight:"bold"
    }
})
