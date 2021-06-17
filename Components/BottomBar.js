import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import { connect } from 'react-redux'


class BottomBar extends React.Component
{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <View style={styles.main_container}>
                <Text style={styles.text_container}>{"Utilisateur connecté : "+ this.props.user_token.contact}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
        main_container:{
            backgroundColor:'#0078d4',
            height:30,
            justifyContent:'center'
        },
        text_container:{
            color:'white',
            fontSize:14,
            justifyContent:'center',
            marginLeft:5
        }
    })

const mapStateToProps = state => {
    return {
      user_token: state.authReducer.user_token
    }
}

export default connect(mapStateToProps)(BottomBar)