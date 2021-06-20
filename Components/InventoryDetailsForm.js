import React from 'react'
import {View, Text, StyleSheet, Button, Image, Alert, TextInput, FlatList, TouchableOpacity} from 'react-native'
import {connect} from 'react-redux'
import Assets from '../Storage/AssetsModels'
import Users from '../Storage/UsersModels'


const Asset = new Assets()
const User = new Users()

const inventoryDetailsList = [ 
    {id: 1, inventory_id:"1", area_id:"1", asset_id:"99", user_id:"99", date:"20/06/2021 10:10:10"},
    {id: 2, inventory_id:"1", area_id:"1", asset_id:"2", user_id:"4", date:"20/06/2021 10:10:10"},
    {id: 3, inventory_id:"1", area_id:"1", asset_id:"3", user_id:"5", date:"20/06/2021 10:10:10"},
    {id: 4, inventory_id:"2", area_id:"2", asset_id:"4", user_id:"7", date:"20/06/2021 10:10:10"}, 
    {id: 5, inventory_id:"1", area_id:"1", asset_id:"1", user_id:"7", date:"20/06/2021 10:10:10"},
]


export default class InventoryDetails extends React.Component 
{
    constructor(props){
        super(props)
        this.state = {
            assetsList : [],
            area_token: {},
            inventory_token:{},
        }
    }

    getAssets = async (area_id, inventory_token_id) => {
        let assetsList = inventoryDetailsList.filter(item => (item.area_id == area_id && item.inventory_id == inventory_token_id))
        assetsList.forEach(async (e) => {
            try{
                let element_asset = await Asset.searchAsset(e.asset_id)
                if (element_asset.area_id == area_id) {e.state = '#3cb043'}
                else {e.state = 'orange'}
                e.name =  element_asset.name
            }
            catch(err){
                e.name = e.asset_id
                e.state = '#b0bec5'
            }
            try{
                let element_user = await User.searchUser_byId(e.user_id)
                e.username = element_user.username
            }
            catch(err){
                e.username = e.user_id
            }
        })
        this.setState({assetsList})
    }

    componentDidMount(){
        const area_token = this.props.route.params.area_token
        this.setState({area_token})
        const inventory_token = this.props.route.params.inventory_token
        this.setState({inventory_token})
        this.getAssets(area_token.id, inventory_token.id)
    }
    
    _renderItem = ({item}) => (
        <TouchableOpacity style={[styles.table_row, {backgroundColor: item.state}]}>
            <Text style={[styles.table_row_txt, {width: "40%"}]}>{item.name}</Text>
            <Text style={[styles.table_row_txt, {width: "30%"}]}>{item.username}</Text>
            <Text style={[styles.table_row_txt, {width: "30%"}]}>{item.date}</Text>
        </TouchableOpacity>
    )

    render(){
        return(
            <View style={{flex:1}}>
                <TouchableOpacity style={styles.page_Header} onPress={() => this.props.navigation.goBack()}>
                    <Text style={{color:'white', fontSize:16, fontWeight:'bold'}}>{this.state.inventory_token.name}</Text>
                    <Text style={{color:'white', fontSize:16, fontWeight:'bold'}}>Local : {this.state.area_token.code}</Text>
                    <Text style={{color:'white', fontSize:16}}>{this.state.area_token.name}</Text>
                </TouchableOpacity>
                <View style={styles.page_Content}>
                    <View style={styles.table_header}>
                        <Text style={[styles.table_header_txt, {width: "40%"}]}>Assets</Text>
                        <Text style={[styles.table_header_txt, {width: "30%"}]}>Users</Text>
                        <Text style={[styles.table_header_txt, {width: "30%"}]}>Date</Text>
                    </View>
                    <FlatList
                        data={this.state.assetsList}
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
        backgroundColor:'#607d8b',
        alignItems:'center', 
        padding:1, 
        height:70
    },
    page_Content:{
        backgroundColor:'white',
        margin:5, 
        flex:1, 
        padding:1
    },
    table_header:{
        flexDirection:'row', 
        backgroundColor:'#78909c'
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