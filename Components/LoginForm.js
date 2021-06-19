import React from 'react'
import { View, Text, StyleSheet, Image, Alert, TextInput, Keyboard, TouchableWithoutFeedback, TouchableOpacity, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import RNBeep from 'react-native-a-beep'

import Database from '../Storage/Database'
import { LOGIN, LOGOUT } from '../Redux/Reducers/authenticationReducer'


const db = new Database()


class LoginForm extends React.Component 
{
    constructor(props){
        super(props)
        this.state = {
            username: '',
            password: '',
            isFormValid: false,
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.username !== prevState.username || this.state.password !== prevState.password) {
          this.validateForm()
      }
    }

    validateForm = () => {
        if (this.state.username !== "" && this.state.password !== "") {
            this.setState({isFormValid: true})
        }
        else
            this.setState({isFormValid: false})
    }

    login = async () => {
        if (this.state.username !== "" && this.state.password !== "") {
            try{
                let user_found = await db.searchUser(this.state.username)
                if (this.state.password === user_found.password) {
                    RNBeep.beep()
                    const action = { type: LOGIN, value: user_found }
                    this.props.dispatch(action)
                }
                else {
                    RNBeep.beep(false)
                    Alert.alert('Accès interdit', 'Mot de passe erroné')
                    const action = { type: LOGOUT, value: {} }
                    this.props.dispatch(action)
                }
            }
            catch(err) {
                RNBeep.beep(false)
                Alert.alert('Accès interdit', 'Utilisateur introuvable')
                const action = { type: LOGOUT, value: {} }
                this.props.dispatch(action)
            }
        }
    }

    handleUsernameUpdate = username => { this.setState({username}) }

    handlePasswordUpdate = password => { this.setState({password}) }

    render(){
        return(
            <View style={{flex:1}}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
                    <View
                    style={styles.container}>
                        <Image source={require('../Images/logo.png')} style={styles.image}/>
                        <Text style={styles.titleContainer}>Assets Tracking</Text>
                        <TextInput 
                            value={this.state.username} 
                            onChangeText={this.handleUsernameUpdate} 
                            style={styles.inputContainer} 
                            placeholder="Nom d'utilisateur"
                            autoFocus={true}
                            ref={(input) => { this.firstTextInput = input }}
                            onSubmitEditing={() => { this.secondTextInput.focus() }}
                            />
                        <TextInput 
                            value={this.state.password} 
                            onChangeText={this.handlePasswordUpdate} 
                            style={styles.inputContainer} 
                            placeholder='Mot de passe' 
                            secureTextEntry={true}
                            autoCapitalize='none'
                            ref={(input) => { this.secondTextInput = input }}
                            onSubmitEditing={() => { this.login() }}
                        />
                        <TouchableOpacity 
                            style={[styles.buttonContainer, {backgroundColor: !this.state.isFormValid ? '#bdbdbd': '#2196F3'}]} 
                            onPress={ () => this.login() } 
                            disabled={!this.state.isFormValid}>
                            <Text style={styles.textButtonContainer}>Se connecter</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    titleContainer:{
        fontSize: 24, 
        marginBottom:"7%", 
        color:"black",
    },
    buttonContainer:{
        justifyContent:'center',
        marginHorizontal: 20,
        marginTop: 5,
        width: "40%",
        height: "9%",
        borderRadius: 50,
    },
    textButtonContainer:{
        textAlign: 'center',
        color:'white', 
        fontSize: 18,
    },
    inputContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: 'grey',
        backgroundColor:'white',
        borderRadius: 5,
        borderWidth: 1,
        padding: 8,
        marginBottom: 15,
        width: "75%",
        height: "13%",
    },
    image:{
        width: 70,
        height: 80,
        margin: 5,
        resizeMode: 'stretch',
    }
  })

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch: (action) => { dispatch(action) }
    }
}

export default connect(null, mapDispatchToProps)(LoginForm)