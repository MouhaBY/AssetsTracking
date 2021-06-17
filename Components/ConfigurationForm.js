import React from 'react'
import { View, Text, StyleSheet, Button, TextInput, Alert, TouchableOpacity, ScrollView } from 'react-native'
import Database from '../Storage/Database'
import RNBeep from 'react-native-a-beep'


const db = new Database()


export default class ConfigurationForm extends React.Component 
{
    constructor(props){
        super(props)
        this.state = {
            serverAddress: '',
            administrator:'',
        }
    }

    readConfiguration = async () => {
        const serverAddress = await db.getConfiguration("serverAddress")
        this.setState({serverAddress})
    }

    componentDidMount(){
        this.readConfiguration()
    }

    resetConfig = () => {
        this.setState({administrator:''})
        this.readConfiguration()
    }

    submitConfig = async () => {
        if (this.state.administrator == '12345'){
            await db.updateConfiguration([this.state.serverAddress, "serverAddress"])
            this.setState({administrator:''})
            RNBeep.beep()
            this.props.navigation.goBack()
        }
        else {
            RNBeep.beep(false)
            Alert.alert('Accès interdit', 'Mot de passe de configuration erroné')
        }
    }
    
    handleserverAddressUpdate = serverAddress => { this.setState({serverAddress}) }
    handleAdministratorUpdate = administrator => { this.setState({administrator}) }

    render(){
        return(
            <View style={{flex:1}}>
                <View style={styles.mainContainer}>
                    <Text style={styles.titleContainer}>Configuration de base</Text>
                    <Text style={styles.textContainer}>Accès de configuration</Text>
                    <TextInput
                    value={this.state.administrator} 
                    onChangeText={this.handleAdministratorUpdate} 
                    style={styles.inputContainer} 
                    placeholder='Accès administrateur' 
                    autoCapitalize='none'
                    secureTextEntry={true}
                    autoFocus={true}
                    />
                    <Text style={styles.textContainer}>Adresse du serveur</Text>
                    <TextInput
                    value={this.state.serverAddress} 
                    onChangeText={this.handleserverAddressUpdate} 
                    style={styles.inputContainer} 
                    placeholder='Adresse du serveur' 
                    autoCapitalize='none'
                    />
                    <TouchableOpacity style={styles.resetContainer} onPress={()=>{ this.resetConfig() }}>
                        <Text style={styles.resetButton}>Reset</Text>
                    </TouchableOpacity>
                </View>
                <View style = {styles.buttonContainer}>
                    <Button title='   Submit   ' onPress={()=>{ this.submitConfig() }}/>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    mainContainer:{
        flex:1,
    },
    titleContainer:{
        justifyContent:'center',
        alignItems:'center',
        textAlign:'center',
        fontWeight:'bold',
        fontSize:20,
        marginTop:25,
        marginBottom:10,
    },
    textContainer:{
        marginLeft:'8%', 
        marginTop:15
    },
    inputContainer:{
        borderColor: 'grey',
        backgroundColor:'white',
        borderRadius: 5,
        borderWidth: 1,
        padding: 8,
        marginTop: 5,
        marginLeft:'5%',
        marginRight:'5%',
    },
    buttonContainer:{
        marginBottom:15, 
        alignItems:'center', 
        justifyContent:'center'
    },
    resetContainer:{
        width:50,
        height:20,
        marginLeft:'5%', 
        marginTop:5
    },
    resetButton:{
        marginLeft:5,
        color:'#2196F3',
    }
})