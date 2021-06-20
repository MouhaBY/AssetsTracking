import React from 'react'
import {View, Text, StyleSheet, Button, Image, Alert, TextInput, FlatList, TouchableOpacity} from 'react-native'
import {connect} from 'react-redux'
import Inventories from '../Storage/InventoriesModels'


const Inventory = new Inventories()


class InventoriesMenu extends React.Component 
{
    constructor(props){
        super(props)
        this.state = {
            inventaires : [],
        }
    }

    getInventoriesList = async () => {
        const inventaires = await Inventory.getInventaires()
        this.setState({inventaires})
    }

    componentDidMount(){
        this.getInventoriesList()
    }

    accessInventory = (item) => {
        this.props.navigation.navigate("Locaux", {destination:"Détails", inventory_token:item})
    }

    _renderItem = ({item}) => (
        <TouchableOpacity
        onPress = {() => this.accessInventory(item)} 
        style={styles.mainInventory}>
            <View style={{flexDirection:'row', alignItems:'center'}}>
                <View style={styles.circle}>
                    <Text style={{fontWeight:'bold', color:'white'}}>{item.id}</Text>
                </View>
                <View style={{flex:1, marginLeft:10}}>
                    <Text style={{fontWeight:'bold', fontSize:14, color:'#004578'}}>{item.name.toUpperCase() + " "}</Text>
                    <Text style={{color:'#004578'}}>{"Date " + item.date}</Text>
                </View>
                <Image source={require('../Images/right-arrow.png')} style={styles.image}/>
            </View>
        </TouchableOpacity>
    )
    
    render(){
        return(
            <View style={styles.mainContainer}>
                <FlatList 
                    style= {styles.mainList}
                    data={this.state.inventaires}
                    keyExtractor={(item) => item.id}
                    renderItem={this._renderItem}>
                </FlatList>
            </View>
        )
    }
}

const styles = StyleSheet.create(
    {
        mainContainer:{
            flex:1,
            backgroundColor:'#71afe5'
            //alignItems:'center'
        },
        mainList:{
            flex:1,
            padding:10,
            //width:"95%"
        },
        mainInventory:{
            height: 65,
            //width: '95%',
            borderRadius: 9,
            margin: 3,
            backgroundColor: "white",
            alignItems:'center',
            justifyContent:'center',
        },
        circle: {
            width: 50,
            height: 50,
            borderRadius: 50 / 2,
            backgroundColor: "#2196F3",
            alignItems:'center',
            justifyContent:'center',
            margin:5,
        },
        image:{
            width: 20,
            height: 20,
            margin: 5,
            resizeMode: 'stretch',
        }
    }
)

const mapStateToProps = (state) => {
    return {
    }
  }

export default connect(mapStateToProps)(InventoriesMenu)