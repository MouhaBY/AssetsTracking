import React from 'react'
import {View, Text, StyleSheet, Button, Image, Alert, TextInput, FlatList, TouchableOpacity} from 'react-native'
import {connect} from 'react-redux'
import Assets from '../Storage/AssetsModels'


const Asset = new Assets()


export default class AreaDetails extends React.Component 
{
    constructor(props){
        super(props)
        this.state = {
            assetsList : [],
            area_token: {},
            selected_asset : '0',
        }
    }

    getAssets = async (area_id) => {
        try{
            let assetsList = await Asset.searchAssets(area_id)
            this.setState({assetsList})
        }
        catch(err){ 
            console.log('catch') 
        }
    }

    componentDidMount(){
        const area_token = this.props.route.params.area_token
        this.setState({area_token})
        this.getAssets(area_token.id)
    }
    
    _renderItem = ({item}) => (
                <TouchableOpacity style={styles.table_row}>
                    <Text style={[styles.table_row_txt, {width: "30%"}, {backgroundColor: item.id == this.props.route.params.selected_asset ? '#3cb043': '#eff6fc'}]}>{item.code}</Text>
                    <Text style={[styles.table_row_txt, {width: "70%"}, {backgroundColor: item.id == this.props.route.params.selected_asset ? '#3cb043': '#eff6fc'}]}>{item.name}</Text>
                </TouchableOpacity>
    )

    render(){
        return(
            <View style={{flex:1}}>
                <TouchableOpacity style={styles.page_Header} onPress={() => this.props.navigation.goBack()}>
                    <Text style={{color:'white', fontSize:16, fontWeight:'bold'}}>Information local : {this.state.area_token.code}</Text>
                    <Text style={{color:'white', fontSize:16}}>{this.state.area_token.name}</Text>
                </TouchableOpacity>
                <View style={styles.page_Content}>
                    <View style={styles.table_header}>
                        <Text style={[styles.table_header_txt, {width: "30%"}]}>Code</Text>
                        <Text style={[styles.table_header_txt, {width: "70%"}]}>Description</Text>
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
        backgroundColor:'#004578',
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
    },
    table_row_txt:{
        padding:3,
        height:38,
        textAlign:"center",
        fontSize:14,
        backgroundColor:'#eff6fc',
    },   
})