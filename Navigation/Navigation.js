import React from 'react'
import { StyleSheet, Image } from 'react-native'
import { createStackNavigator } from "@react-navigation/stack"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from "@react-navigation/native"
import { connect} from 'react-redux'

import LoginForm from '../Components/LoginForm'
import ConfigurationForm from '../Components/ConfigurationForm'
import Home from '../Components/Home'
import InventoriesMenu from '../Components/InventoriesMenu'
import InventoryForm from '../Components/InventoryForm'
import InventoryDetails from '../Components/InventoryDetails'
import store from '../Redux/configureStore'
import SyncButton from '../Components/SyncButton'


const Stack = createStackNavigator()

const AppNavigation = () => {
    const state = store.getState()
    const authenticated = state.authReducer.authenticated
    
    if (authenticated) {
        return(
            <NavigationContainer>             
                <Stack.Navigator>
                    <Stack.Screen name="Home" component={Home} options={{headerRight:()=>(<SyncButton/>)}}/>
                    <Stack.Screen name="Inventaires" component={InventoriesMenu}/>
                    <Stack.Screen name="Inventorier" component={InventoryForm}/>
                    <Stack.Screen name="Détails" component={InventoryDetails}/>
                </Stack.Navigator>
            </NavigationContainer>
        )
    }
    else {
        return(
            <NavigationContainer>             
                <Stack.Navigator>
                    <Stack.Screen name="Acceuil" component={AppTabs} options={{headerRight:()=>(<SyncButton/>)}}/>
                </Stack.Navigator>
            </NavigationContainer>
        )
    }
}

const Tabs = createBottomTabNavigator()

export const AppTabs = () => {
    return (
        <Tabs.Navigator tabBarOptions= {{showLabel: false, showIcon: true, activeBackgroundColor:'#DDDDDD', inactiveBackgroundColor:'#FFFFFF'}}>
            <Tabs.Screen 
                name='Connexion' 
                component={LoginForm}
                options={{ tabBarIcon: ()=> {return <Image style={styles.icon} source={require('../Images/login.png')}/> } }}
            />
            <Tabs.Screen 
                name='Configuration' 
                component={ConfigurationForm}
                options={{ tabBarIcon: ()=> {return <Image style={styles.icon} source={require('../Images/settings.png')}/> } }}
            />
        </Tabs.Navigator>
    )
}

const styles = StyleSheet.create({
    icon: {
        width:30,
        height:30,
        resizeMode: 'stretch',
    }
})

const mapStateToProps = state => {
    return {
        authenticated: state.authReducer.authenticated
    }
}
  
export default connect(mapStateToProps)(AppNavigation)