import React from 'react'
import {View, TouchableOpacity, Text, StyleSheet, Image, Button, Alert, ScrollView} from 'react-native'
import { connect } from 'react-redux'
import UserBar from './UserBar'
import {LOGIN, LOGOUT} from '../Redux/Reducers/authenticationReducer'


class Home extends React.Component 
{
    constructor(props){
        super(props)
    }

    logout(){
        const action = { type: LOGOUT, value: {} }
        this.props.dispatch(action)
    }

    accessMenu(key){
        this.props.navigation.navigate(key)
    }

    render(){
        return(
            <View style={{flex:1}}>
                <View style={{justifyContent:'center', height:'40%'}}>
                    <UserBar/>
                </View>
                <View>
                    <View style={{flexDirection:'row', justifyContent:'center'}}>
                        <TouchableOpacity 
                            style={styles.buttonContainer}
                            onPress={() => {this.accessMenu("Inventaires")}}>
                                <Image source={require('../Images/inventory.png')} style={styles.image}/>
                                <Text style={styles.textButtonContainer}>Inventaire</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={styles.buttonContainer}
                            onPress={() => {this.accessMenu("Détails")}}>
                                <Image source={require('../Images/stock.png')} style={styles.image}/>
                                <Text style={styles.textButtonContainer}>Détails</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{flexDirection:'row', justifyContent:'center'}}>
                        <TouchableOpacity 
                            style={styles.buttonContainer}
                            onPress={() => {this.accessMenu("Détails")}}>
                                <Image source={require('../Images/stockscreen.png')} style={styles.image}/>
                                <Text style={styles.textButtonContainer}>Consultation</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={styles.logoutButtonContainer}
                            onPress={() => {this.logout()}}>
                                <Image source={require('../Images/logout.png')} style={styles.image}/>
                                <Text style={styles.textButtonContainer}>Déconnexion</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    buttonContainer:{
        justifyContent:'center', 
        alignItems:'center',
        margin:10, 
        height: 100,
        width: 120,
        borderRadius: 5,
        backgroundColor:'white'
    },
    logoutButtonContainer:{
        justifyContent:'center', 
        alignItems:'center',
        margin:10, 
        height: 100,
        width: 120,
        borderRadius: 5,
    },
    textButtonContainer:{
        textAlign: 'center',
        color:'black', 
        fontSize: 16,
    },
    image:{
        resizeMode: 'stretch',
        height:50,
        width:50,
    }
})

const mapDispatchToProps = (dispatch) => {
    return {
      dispatch: (action) => { dispatch(action) }
    }
  }
  
  const mapStateToProps = (state) => {
    return {
        authenticated: state.authReducer.authenticated,
        user_token: state.authReducer.user_token,
    }
  }

  export default connect(mapStateToProps, mapDispatchToProps)(Home)