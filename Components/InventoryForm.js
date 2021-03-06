import React from 'react'
import { View, Text, StyleSheet, Button, Alert, TextInput, FlatList, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import Assets from '../Storage/AssetsModels'
import Details from '../Storage/InventoriesDetailsModels'
import RNBeep from 'react-native-a-beep'


const Detail = new Details()
const Asset = new Assets()

const ColorStates = {CORRECT_POSITION : '#3cb043', CHANGED_POSITION : 'orange', NOT_SCANNED:'#EA3C53', OUTER_POSITION: 'yellow'}

class Inventory extends React.Component 
{
    constructor(props){
        super(props)
        this.state = {
            finalList : [],
            area_token: {},
            inventory_token: {},
            assetToSubmit : '',
            message : '',
            isFormValid:false,
        }
    }

    delete_Row = (item_to_delete) => {
        Alert.alert('Supprimer', 'Êtes vous sur de supprimer cette ligne ?', 
        [   { text: 'Annuler' },
            { text: 'Confirmer', 
            onPress: () => {
                Detail.deleteDetailInventaire(item_to_delete)
                this.componentDidMount()
            }
            },
        ])
    }

    getAssets = async (area_id, inventory_token_id) => {
        const assetsList = await Asset.searchAssets(area_id)        
        const inventoryList = await Detail.getDetailsInventaires(inventory_token_id)
        const restList = []
        assetsList.forEach((e) => { 
            let found = inventoryList.find(element => element.asset_id == e.id)
            if (found){
                e.inv_id = found.id
                if (found.inv_area_id == area_id){ e.state = ColorStates.CORRECT_POSITION  }
                else{ e.state = ColorStates.CHANGED_POSITION }
            }
            else{ e.state = ColorStates.NOT_SCANNED }
        })
        inventoryList.forEach((e) => {
            if (e.inv_area_id == area_id && e.area_id != area_id) {
                restList.push({inv_id:e.id, id:e.asset_id, code:e.code, name:e.name, state:ColorStates.OUTER_POSITION})
            }
        })
        this.setState({finalList : [...assetsList, ...restList]})
    }

    verify_to_submit = async (asset_code) => {
        try{
            const asset_found = await Asset.searchAsset(asset_code)
            let ifExists = await Detail.getDetailsInventaireAsset(this.state.inventory_token.id, asset_found.id)
            if (ifExists == "code exists"){ throw("code exists") }
            else{
                await this.submit(asset_found.id)
                this.componentDidMount()
            }
        }
        catch(err){
            RNBeep.beep(false)
            console.log(err)
            if (err == 'Assets unknown' ){
                this.setState({message: 'Code non reconnu'})
            }
            if (err == "code exists"){
                this.setState({message: 'Code inventorié'})
            }
        }
    }

    submit = async (assetId) => {
        let now = new Date()
        let dateNow = now.getDate()+"/"+parseInt(now.getMonth()+1)+"/"+now.getFullYear()+" "+now.getHours()+":"+now.getMinutes()+":"+now.getSeconds()+":"+now.getUTCMilliseconds()
        let userId = this.props.user_token.id
        let inventoryId = this.state.inventory_token.id
        let areaId = this.state.area_token.id
        let inventory_row = {inventory_id: inventoryId, area_id:areaId, asset_id:assetId, user_id:userId, date:dateNow }
        await Detail.addDetailInventaire(inventory_row)
    }

    componentDidMount(){
        this.setState({finalList : []})
        const area_token = this.props.route.params.area_token
        const inventory_token = this.props.route.params.inventory_token
        this.getAssets(area_token.id, inventory_token.id)
        this.setState({area_token})
        this.setState({inventory_token})
    }
    
    _renderItem = ({item}) => (
        <TouchableOpacity 
        style={[styles.table_row, {backgroundColor: item.state}]} 
        onPress={()=>{ this.handleAssetUpdate(item.code) }}
        onLongPress={() => { if (item.state != ColorStates.NOT_SCANNED) {this.delete_Row(item.inv_id)} }}>
            <Text style={[styles.table_row_txt, {width: "50%"}]}>{item.code}</Text>
            <Text style={[styles.table_row_txt, {width: "50%"}]}>{item.name}</Text>
        </TouchableOpacity>
    )

    handleAssetUpdate = assetToSubmit => { this.setState({assetToSubmit}) }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.assetToSubmit !== prevState.assetToSubmit) {
            this.setState({message: ''})
            this.validateForm()
      }
    }

    validateForm = () => {
        if (this.state.assetToSubmit !== "") {
            this.setState({isFormValid: true})
        }
        else{
            this.setState({isFormValid: false})
        }
    }

    render(){
        return(
            <View style={{flex:1}}>
                <View style={styles.page_Header}>
                    <Text style={{color:'white', fontSize:16, fontWeight:'bold'}}>{this.state.inventory_token.name + " / Local :" +this.state.area_token.code}</Text>
                    <Text style={{color:'white', fontSize:16}}>{this.state.area_token.name}</Text>
                </View>
                <View style={{alignItems:'center', flexDirection:'row'}}>
                <TextInput 
                    value={this.state.assetToSubmit} 
                    ref={(input) => { this.firstTextInput = input }}
                    onChangeText={this.handleAssetUpdate}
                    style={styles.inputContainer} 
                    placeholder="Code bien"
                    autoFocus={true}
                    onSubmitEditing={() => { this.verify_to_submit(this.state.assetToSubmit) }}
                />
                <Button 
                        title= 'Submit'
                        disabled={!this.state.isFormValid}
                        onPress={() => { this.verify_to_submit(this.state.assetToSubmit) }}
                />
                </View>
                <Text style={{color:'red', marginLeft:10}}>{this.state.message}</Text>
                <View style={styles.page_Content}>
                    <View style={styles.table_header}>
                        <Text style={[styles.table_header_txt, {width: "50%"}]}>Code</Text>
                        <Text style={[styles.table_header_txt, {width: "50%"}]}>Asset</Text>
                    </View>
                    <FlatList
                        data={this.state.finalList}
                        keyExtractor={(item) => item.id}
                        renderItem={this._renderItem}>
                    </FlatList>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    page_Header:{
        justifyContent:'center',
        backgroundColor:'#2196F3',
        alignItems:'center', 
        padding:1, 
        height:50
    },
    page_Content:{
        backgroundColor:'white',
        margin:5, 
        flex:1, 
        padding:1
    },
    inputContainer: {
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: 'grey',
        backgroundColor:'white',
        borderRadius: 5,
        borderWidth: 1,
        padding: 8,
        margin: 5,
        height: 38,
    },
    table_header:{
        flexDirection:'row', 
        backgroundColor:'#2196F3'
    },
    table_header_txt:{
        fontWeight:'bold', 
        textAlign:"center", 
        padding:5, 
        color:'white', 
        fontSize:14, 
        height:30
    },
    table_row:{
        flexDirection: "row", 
        height: 40, 
        alignItems:"center",
        justifyContent:'center',
        margin:2,
    },
    table_row_txt:{
        padding:3,
        height:38,
        textAlign:"center",
        fontSize:14,
    },   
})

const mapStateToProps = state => {
    return {
      user_token: state.authReducer.user_token
    }
}

export default connect(mapStateToProps)(Inventory)