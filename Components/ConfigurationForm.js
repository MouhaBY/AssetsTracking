import React from 'react'
import { View, Text, StyleSheet, Button, TextInput } from 'react-native'
import Database from '../Storage/Database'


const db = new Database()


export default class ConfigurationForm extends React.Component 
{
    constructor(props){
        super(props)
        this.state = {
            serverAddress: '',
        }
    }

    readConfiguration = async () => {
        const serverAddress = await db.getConfiguration("serverAddress")
        this.setState({serverAddress})
    }

    componentDidMount(){
        this.readConfiguration()
    }

    submitConfig = async () => {
        await db.updateConfiguration([this.state.serverAddress, "serverAddress"])
        this.props.navigation.goBack()
    }
    
    handleserverAddressUpdate = serverAddress => { this.setState({serverAddress}) }

    render(){
        return(
            <View style={styles.mainContainer}>
                <Text style={styles.textContainer}>Configuration de base</Text>
                <Text>Adresse du serveur</Text>
                <TextInput
                value={this.state.serverAddress} 
                onChangeText={this.handleserverAddressUpdate} 
                style={styles.inputContainer} 
                placeholder='Adresse du serveur' 
                autoCapitalize='none'
                />
                <Button title='Valider la configuration' onPress={()=>{ this.submitConfig() }}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    mainContainer:{
        flex:1,
    },
    textContainer:{
        justifyContent:'center',
        alignItems:'center',
        textAlign:'center',
        fontWeight:'bold',
        fontSize:20,
        margin:20,
    },
    inputContainer:{
        borderColor: 'grey',
        backgroundColor:'white',
        borderRadius: 5,
        borderWidth: 1,
        padding: 8,
    },
})