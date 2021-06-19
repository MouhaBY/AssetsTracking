import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { connect } from 'react-redux'


class BottomBar extends React.Component
{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <View style={styles.main_container}>
                <View style={styles.background}>
                    <View style={styles.circle}>
                        <Image source={require('../Images/profile.png')} style={{resizeMode: 'stretch', height:styles.circle.height*0.9, width:styles.circle.width*0.9}}/>
                    </View>
                </View>
                <View style={{alignItems:'center', marginTop:'33%'}}>
                    <Text style={styles.text_container}>Utilisateur connecté :</Text>
                    <Text style={[styles.text_container,{fontWeight:'bold'}]}>{this.props.user_token.contact}</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
        main_container:{
            justifyContent:'center',
            alignItems:'center'
        },
        text_container:{
            color:'white',
            fontSize:18,
            justifyContent:'center',
        },
        circle: {
            width: 100,
            height: 100,
            borderRadius: 100 / 2,
            backgroundColor: "white",
            marginTop:'6%',
            //position:'absolute',
            //bottom:'32%',
            alignItems:'center',
            justifyContent:'center',
        },
        background: {
            width: '100%',
            height: "130%",
            backgroundColor: "#2196F3",
            position:'absolute',
            bottom:'-20%',
            alignItems:'center',
        },
    })

const mapStateToProps = state => {
    return {
      user_token: state.authReducer.user_token
    }
}

export default connect(mapStateToProps)(BottomBar)