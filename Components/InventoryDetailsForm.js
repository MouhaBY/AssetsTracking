import React from 'react'
import { View, Text, StyleSheet, Button, Image, Alert, TextInput, FlatList, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import Assets from '../Storage/AssetsModels'
import Users from '../Storage/UsersModels'
import Details from '../Storage/InventoriesDetailsModels'


const Detail = new Details()

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
        const assetsList = await Detail.getDetailsInventaireArea(inventory_token_id, area_id)
        assetsList.forEach(async (e) => {
            try{
                console.log(e)
                if (e.area_id == area_id) {e.state = '#3cb043'}
                else {e.state = 'orange'}
            }
            catch(err){
                e.state = '#b0bec5'
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
            <Text style={[styles.table_row_txt, {width: "25%"}]}>{item.code}</Text>
            <Text style={[styles.table_row_txt, {width: "35%"}]}>{item.name}</Text>
            <Text style={[styles.table_row_txt, {width: "15%"}]}>{item.username}</Text>
            <Text style={[styles.table_row_txt, {width: "25%"}]}>{item.date}</Text>
        </TouchableOpacity>
    )

    render(){
        return(
            <View style={{flex:1}}>
                <TouchableOpacity style={styles.page_Header} onPress={() => this.props.navigation.goBack()}>
                    <Text style={{color:'white', fontSize:16, fontWeight:'bold'}}>{this.state.inventory_token.name + " / Local :" +this.state.area_token.code}</Text>
                    <Text style={{color:'white', fontSize:16}}>{this.state.area_token.name}</Text>
                </TouchableOpacity>
                <View style={styles.page_Content}>
                    <View style={styles.table_header}>
                        <Text style={[styles.table_header_txt, {width: "25%"}]}>Code</Text>
                        <Text style={[styles.table_header_txt, {width: "35%"}]}>Asset</Text>
                        <Text style={[styles.table_header_txt, {width: "15%"}]}>User</Text>
                        <Text style={[styles.table_header_txt, {width: "25%"}]}>Date</Text>
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
        height:50
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