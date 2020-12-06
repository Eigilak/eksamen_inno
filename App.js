/*Frameworks*/
import * as React from 'react';
import { Alert,Platform,LogBox} from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { AntDesign,MaterialIcons,Ionicons } from '@expo/vector-icons';
import firebase from "firebase";
import {createStackNavigator} from "react-navigation-stack";
import * as Permissions from 'expo-permissions';
import { DeviceMotion } from 'expo-sensors';
/*Screens*/
import LoginScreen from "./components/login/LoginScreen";
import SignupScreen from "./components/login/SignupScreen";
import logout_spoofScreen from "./components/login/Logout_spoofScreen";
import CreateVisitCardScreen from "./components/admin/CreateVisitCardScreen";
import MyVisitCardsScreen from "./components/admin/MyVisitCardsScreen";
import RecievedVisitCardsScreen from "./components/admin/RecievedVisitCardsScreen";
import ProfilScreen from "./components/admin/ProfilScreen";
import EditVisitCardScreen from "./components/admin/EditVisitCardScreen";
import SeeRecievedVisitCardItem from "./components/admin/items/SeeRecievedVisitCardItem";
import QrScannerScreen from "./components/admin/QrScannerScreen";
import GyroScoopScreen from "./components/admin/GyroScoopScreen";
/*Hvis det ikke er web fjern logbox*/
if(Platform.OS !== "web"){
  LogBox.ignoreAllLogs(true)
}
/*Dette er min navigator til når man er logget ind*/
const AdminBottomNavigator = createBottomTabNavigator({
  Mine:{
    screen:MyVisitCardsScreen,
    navigationOptions:{
      tabBarIcon:({tintColor}) =>(
          <MaterialIcons name="account-box" size={24} color={tintColor} />
      )
    }
  },
  Modtaget:{
    screen:RecievedVisitCardsScreen,
    navigationOptions:{
      tabBarIcon:({tintColor}) =>(
          <AntDesign name="inbox" size={24} color={tintColor}  />

      )
    }
  },
  QR:{
    screen:QrScannerScreen,
    navigationOptions:{
      tabBarIcon:({tintColor}) =>(
          <AntDesign name="qrcode" size={24} color={tintColor} />
      )
    }
  },
  Profil:{
    screen:ProfilScreen,
    navigationOptions:{
      tabBarIcon:({tintColor}) =>(
          <AntDesign name="profile" size={24} color={tintColor} />
      )
    }
  },
  /*Sætter en spoof screen til at håndtere onpress som gør jeg logger ud med firebase*/
  Logud: {
    screen: logout_spoofScreen,
    navigationOptions: ({navigation}) => ({
      tabBarOnPress: (scene, jumpToIndex) => {
        if(Platform.OS === 'web')
        {
          if(confirm('Vil du logge ud? ')){

            try {
              const response =  firebase.auth().signOut();
            } catch (e) {
              console.log(e);
            }
          }
        }else {
          return Alert.alert(   // Shows up the alert without redirecting anywhere
              'Godkendt følgende'
              , 'Vil du gerne logge ud?'
              , [
                {
                  text: 'Ja', onPress:async () => {
                    try {
                      const response = await firebase.auth().signOut();

                    } catch (e) {
                      console.log(e);
                    }
                  }
                },
                {text: 'Nej'}
              ]
          );

        }


      }
      ,
      tabBarIcon:({tintColor}) =>(
          <AntDesign name="logout" size={24} color={tintColor} />
      )

    }),

  }
});

const AdminStackNavigation = createStackNavigator({
  BottomNavigation:{
    screen:AdminBottomNavigator,
    navigationOptions:{
      tabBarIcon:({tintColor}) =>(
          <AntDesign name="dashboard" size={24} color={tintColor} />
      ),
      headerShown:false
    }
  },
  CreateVisitCard:{
    screen:CreateVisitCardScreen,
    navigationOptions:{
      tabBarIcon:({tintColor}) =>(
          <AntDesign name="dashboard" size={24} color={tintColor} />
      ),
      headerShown:false
    }
  },
  EditMyVisitCard:{
    screen:EditVisitCardScreen,
    navigationOptions:{
      tabBarIcon:({tintColor}) =>(
          <AntDesign name="dashboard" size={24} color={tintColor} />
      ),
      headerShown:false
    }
  },
  SeeRecievedVisitCard:{
    screen:SeeRecievedVisitCardItem,
    navigationOptions:{
      tabBarIcon:({tintColor}) =>(
          <AntDesign name="dashboard" size={24} color={tintColor} />
      ),
      headerShown:true
    }
  }


})


/*Min navigator hvis man ikke er logget ind*/
const PublicBottomNavigator = createBottomTabNavigator({
  Login:{
    screen: LoginScreen,
    navigationOptions:{
      tabBarIcon:({tintColor}) =>(
          <AntDesign name="login" size={24} color={tintColor} />
      )
    }
  },
  Signup:{
    screen:SignupScreen,
    navigationOptions:{
      tabBarIcon:({tintColor}) =>(
          <MaterialIcons name="account-circle" size={24} color={tintColor} />             )
    }
  }
});


const LoginContainer = createAppContainer(PublicBottomNavigator);
const AdminContainer = createAppContainer(AdminStackNavigation);




export default class App extends React.Component{
  /*Constructor til at init og observe auth*/
  constructor() {
    super();
    this.init();
    this.observeAuth();
  }
  state={
    user:null
  }

  componentDidMount() {
    this.updateMotionPermission();
  }

  /*Sørg for at states bliver nulsat efter de er blevet bvrugt*/

  /*Init*/
  init = () =>{
    const fireBaseConfig ={
      apiKey: "AIzaSyAlOUjJY2erM9bvxtre9RYVCVF_dLXOkmY",
      authDomain: "eksamen-innovation.firebaseapp.com",
      databaseURL: "https://eksamen-innovation.firebaseio.com",
      projectId: "eksamen-innovation",
      storageBucket: "eksamen-innovation.appspot.com",
      messagingSenderId: "1004695638499",
      appId: "1:1004695638499:web:bc9d8a5a25f8385bda90d6"
    }
// vigtigt at tilføje nedestående if statement, da ellers init firebase flere gange
    if (!firebase.apps.length) {
      firebase.initializeApp(fireBaseConfig);
    }

    firebase.auth().signOut()

  }

  updateMotionPermission = async() => {
    const { status } = await Permissions.askAsync(Permissions.MOTION);
    this.setState({ hasMotionPermission: status === 'granted' });
  }
  /*Set Auth state*/
  observeAuth = async () => {
    await firebase.auth().onAuthStateChanged(user => {
      this.setState({ user });
    });
  }

  /*Render afhængig om jeg er logget ind*/
  render() {
    const {user} = this.state;
    if(!user){
      return <LoginContainer/>
    }else {
      return <AdminContainer/>
    }
  }
}
