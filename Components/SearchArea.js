import React from 'react'
import {View, Text, StyleSheet, Button, Image, Alert, TextInput, FlatList, TouchableOpacity} from 'react-native'
import {connect} from 'react-redux'
import Areas from '../Storage/AreasModels'


const Area = new Areas()


class SearchArea extends React.Component 
{
    constructor(props){
        super(props)
        this.state = {
            areasList : [],
            searchedArea : '',
            isFormValid:false,
        }
    }

    getAreas = async () => {
        let areasList = await Area.getAreas()
        try{
            this.setState({areasList})
        }
        catch(err){ 
            console.log('catch') 
        }
    }

    componentDidMount(){
        this.getAreas()
    }
    
    componentDidUpdate(prevProps, prevState) {
        if (this.state.searchedArea !== prevState.searchedArea) {
          this.validateForm()
      }
    }

    validateForm = () => {
        if (this.state.searchedArea !== "") {
            this.setState({isFormValid: true})
        }
        else
            this.setState({isFormValid: false})
    }

    accessArea = async () => {
        try{
        const area_token_obj = await Area.searchArea(this.state.searchedArea)
        this.props.navigation.navigate("Etat", {area_token:area_token_obj})
        }
        catch(err){
            Alert.alert('Erreur', 'Emplacement introuvable')
        }
    }

    handleSearchedAreaUpdate = searchedArea => { this.setState({searchedArea}) }

    _renderItem = ({item}) => (
        <TouchableOpacity 
        style={styles.table_row}
        onPress={() => { this.setState({searchedArea:item.code}) }}
        onLongPress={()=>{this.setState({searchedArea:item.code}), this.accessArea()}}>
            <Text style={[styles.table_row_txt, {width: "30%"}]}>{item.code}</Text>
            <Text style={[styles.table_row_txt, {width: "70%"}]}>{item.name}</Text>
        </TouchableOpacity>
    )

    render(){
        return(
            <View style={{flex:1}}>
                <View style={styles.page_Header}>
                    <Text style={{padding:5}}>Choix local : </Text>
                    <TextInput 
                        value={this.state.searchedArea} 
                        onChangeText={this.handleSearchedAreaUpdate} 
                        placeholder="Local"
                        autoFocus={true}
                        style={{flex:1, height:40}}
                        onSubmitEditing={() => {this.accessArea()}}
                    />
                    <Button 
                        title='Détails'
                        disabled={!this.state.isFormValid}
                        onPress={() => {this.accessArea()}}
                    />
                </View>
                <View style={styles.page_Content}>
                    <View style={styles.table_header}>
                        <Text style={[styles.table_header_txt, {width: "30%"}]}>Code</Text>
                        <Text style={[styles.table_header_txt, {width: "70%"}]}>Désignation</Text>
                    </View>
                    <FlatList
                        data={this.state.areasList}
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
        backgroundColor:'white',
        flexDirection:'row', 
        borderColor:'#2196F3', 
        alignItems:'center', 
        borderWidth:2, 
        margin:5, 
        padding:1, 
        height:40
    },
    page_Content:{
        //borderColor:'black', 
        //borderWidth:1, 
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
        padding:5, 
        height:38,
        textAlign:"center",
        fontSize:14, 
        backgroundColor:'#eff6fc',
    },   
})

const mapStateToProps = state => {
    return {
        authenticated: state.authReducer.authenticated
    }
}
  
export default connect(mapStateToProps)(SearchArea)