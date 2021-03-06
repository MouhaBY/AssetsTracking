import React from 'react'
import { TouchableOpacity, Text, Alert, StyleSheet, Image } from 'react-native'
import RNBeep from 'react-native-a-beep'
import { getWhatToSync, getAssets, getAreas, getUsers, getInventories, getInventoriesDetails } from '../WS/API'
import Users from '../Storage/UsersModels'
import Areas from '../Storage/AreasModels'
import Assets from '../Storage/AssetsModels'
import Inventories from '../Storage/InventoriesModels'
import Details from '../Storage/InventoriesDetailsModels'


const User = new Users()
const Area = new Areas()
const Asset = new Assets()
const Inventory = new Inventories()
const Detail = new Details()


export default class SyncButton extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            isLoading:false
        }
    }

    SyncingAlgorithm = async () => {
        try {
            this.setState({isLoading:true})
            const data = await getWhatToSync()
            const isSynced = await this.SyncTables(data.results)
            if (isSynced) { Alert.alert('Synchronisation', 'Synchronisation terminée') }
            else { Alert.alert('Synchronisation', 'Terminal à jour') }
            RNBeep.beep()
            this.setState({isLoading:false})
        }
        catch (err) { 
            RNBeep.beep(false)
            this.setState({isLoading:false})
            Alert.alert('Erreur', 'Synchronisation échouée') 
        }
    }

    SyncTables = async (results) => {
        let len = results.length
        if (len > 0){
            for (let i = 0; i < len; i++) {
                let table_to_sync = results[i]
                let data_to_sync = await this.getDataToSync(table_to_sync)
                //if (data_to_sync.length > 0){ 
                    await this.synchroniser(table_to_sync, data_to_sync)
                //}
                //else { console.log(" data vierge ") }
            }
            return(true)
        }
        else { console.log(' Rien à synchroniser '); return(false) }
    }
    
    getDataToSync = (table_to_sync) => {
        console.log("table a synchroniser " + table_to_sync);
        return new Promise((resolve, reject) => {
            switch (table_to_sync){
                case 'Assets': getAssets().then(data =>{ resolve(data.results) }); break;
                case 'Areas': getAreas().then(data =>{ resolve(data.results) }); break;
                case 'Users': getUsers().then(data =>{ resolve(data.results) }); break;
                case 'Inventories': getInventories().then(data =>{ resolve(data.results) }); break;
                case 'Details': getInventoriesDetails().then(data =>{ resolve(data.results) }); break;
                default: resolve([]); break;
            }
        })
    }

    synchroniser = async (table_to_sync, data_to_sync) => {
        switch (table_to_sync){
            case 'Assets':
                try{
                    await Asset.DeleteTableAssets()
                    await Asset.insertIntoAssets(data_to_sync)
                    return(true)
                } catch(err) { return (false) }                    
            case 'Areas': 
                try{
                    await Area.DeleteTableAreas()
                    await Area.insertIntoAreas(data_to_sync)
                    return(true)
                } catch(err) { return (false) }
            case 'Users': 
                try{
                    await User.DeleteTableUsers()
                    await User.insertIntoUsers(data_to_sync)
                    return(true)
                } catch(err) { return (false) }
            case 'Inventories': 
                try{
                    await Inventory.DeleteTableInventories()
                    await Inventory.insertIntoInventories(data_to_sync)
                    return(true)
                } catch(err) { return (false) }
            case 'Details': 
                try{
                    await Detail.deleteTableDetails()
                    await Detail.insertIntoDetails(data_to_sync)
                    return(true)
                } catch(err) { return (false) }
            default: return(false);
        }
    }
    
    render(){
        return(
            <TouchableOpacity 
            style={styles.touchableButton}
            disabled={this.state.isLoading}
            onPress={()=>{ this.SyncingAlgorithm() }}>
                <Image style={styles.icon} source={require('../Images/index.png')}/>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    touchableButton:{
        justifyContent:'center', 
        height:"60%", 
        marginRight:10,
    },
    icon: {
        width: 45,
        height: 45,
    }
})
