import React from 'react'
import { StyleSheet, Image } from 'react-native'
import { createStackNavigator } from "@react-navigation/stack"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from "@react-navigation/native"
import { connect} from 'react-redux'

import LoginForm from '../Components/LoginForm'
import ConfigurationForm from '../Components/ConfigurationForm'
import Home from '../Components/Home'
import store from '../Redux/configureStore'
import SyncButton from '../Components/SyncButton'
import SearchArea from '../Components/SearchArea'
import AreaDetails from '../Components/AreaDetails'
import InventoriesMenu from '../Components/InventoriesMenu'
import InventoryDetails from '../Components/InventoryDetailsForm'
import Inventory from '../Components/InventoryForm'


const Stack = createStackNavigator()

const AppNavigation = () => {
    const state = store.getState()
    const authenticated = state.authReducer.authenticated
    
    if (authenticated) {
        return(
            <NavigationContainer>             
                <Stack.Navigator>
                    <Stack.Screen name="Menu" component={Home} options={{headerRight:()=>(<SyncButton/>)}}/>
                    <Stack.Screen name="Locaux" component={SearchArea}/>
                    <Stack.Screen name="Inventorier" component={InventoriesMenu}/>
                    <Stack.Screen name="Choix d'inventaire" component={InventoriesMenu} options={{headerStyle: { backgroundColor: '#005a9e'}, headerTintColor:'white'}}/>
                    <Stack.Screen name="Consulter" component={AreaDetails}/>
                    <Stack.Screen name="Détails" component={InventoryDetails}/>
                    <Stack.Screen name="Inventaire" component={Inventory}/>
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