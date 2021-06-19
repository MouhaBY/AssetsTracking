import { openDatabase, SQLite } from 'react-native-sqlite-storage'
import Users from './UsersModels'
import Configurations from './ConfigurationsModels'
import Areas from './AreasModels'
import Assets from './AssetsModels'


const User = new Users()
const Configuration = new Configurations()
const Area = new Areas()
const Asset = new Assets()


export default class Database {

    /****************************** Data base creation, manipulation and config ******************************/

    async initDB(){
        const db = await openDatabase({name: 'data.db'})
        return(db)
    }

    checkDatabase = async () =>{
        const db = await this.initDB()
        return new Promise((resolve, reject) => {
            db.executeSql('SELECT 1 FROM Users LIMIT 1', [], 
            () => { console.log('Database exists'); resolve(true) }, 
            () => { console.log('Database not exists'); resolve(false) })
        })
    }

    createDatabase = async () => {
        try{
            const isCreated = await this.checkDatabase()
            if (!isCreated){
                console.log('Creating Database')
                await User.createTableUsers()
                await Configuration.createTableConfiguration()
                await Configuration.insertIntoConfiguration([{key:"serverAddress", state:"127.0.0.1:9898"}])
                await Area.createTableAreas()
                await Asset.createTableAssets()
                await this.createTableInventaires()
                await this.createTableDetails()
                console.log('Database created')
            }
            return(true)
        }
        catch(err){ console.log('Problem creating Database') }
    }  

    /****************************************** Inventories Handling ******************************************/

    async createTableInventaires(){
        const  db = await this.initDB()
        return new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(
                'CREATE TABLE IF NOT EXISTS Inventaires (id INTEGER UNIQUE PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, date TEXT NOT NULL)', [], 
                (tx, results) => {
                    resolve(results) 
                    console.log('table inventaires created')
                })
            })
        })
    }

    async insertInventaire(inventaire){
        const db = await this.initDB()
        return new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql( 'INSERT INTO Inventaires (name, date) VALUES (?, ?)', [inventaire.name, inventaire.date],
                (tx, results) => { resolve(results) })
            })
        })
    }

    async createTableDetails(){
        const db = await this.initDB()
        return new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(
                    'CREATE TABLE IF NOT EXISTS Details (id INTEGER UNIQUE PRIMARY KEY AUTOINCREMENT, inventory_id INTEGER NOT NULL, location TEXT NOT NULL, barcode TEXT NOT NULL, quantity REAL NOT NULL, user_id INTEGER, date TEXT)', [], 
                (tx, results) => { 
                    resolve(results) 
                    console.log('table details created')
                })
            })
        })
    }

    async getInventaires() {
        const  db = await this.initDB()
        return new Promise((resolve) => {
            const inventaires = []
            db.transaction((tx) => {
                tx.executeSql('SELECT id, name, date FROM Inventaires', [],
                (tx, results) => {
                    var len = results.rows.length
                    for (let i = 0; i < len; i++) {
                        let row = results.rows.item(i)
                        const { id, name, date } = row
                        inventaires.push({
                            id,
                            name,
                            date
                          })
                    }   
                    resolve(inventaires)              
                })
            })
        })
    }

    async getDetailsInventaires(id_inventaire) {
        const  db = await this.initDB()
        return new Promise((resolve) => {
            const details = []
            db.transaction((tx) => {
                tx.executeSql('SELECT id, location, barcode, quantity, user_id, date FROM Details WHERE inventory_id = ?', [id_inventaire],
                (tx, results) => {
                    var len = results.rows.length
                    if (len > 0) {
                        for (let i = 0; i < len; i++) {
                            let row = results.rows.item(i)
                            const { id, location, barcode, quantity, user_id, date } = row
                            details.push({
                                id, 
                                location, 
                                barcode, 
                                quantity,
                                user_id,
                                date
                              })
                        } 
                        resolve(details)  
                    }
                    else{ reject('inventaire introuvable') }
                })
            })
        })
    }

    async addDetailInventaire(item) {
        const db = await this.initDB()
        return new Promise((resolve) => {
            db.transaction((tx) => {
                tx.executeSql('INSERT INTO Details (inventory_id, location, barcode, quantity, user_id, date) VALUES (?, ?, ?, ?, ?, ?)', 
                [item.inventory_id, item.location, item.barcode, item.quantity, item.user_id, item.date],
                (tx, results) => { resolve(results) })
            })
        })
    }

    async deleteDetailInventaire(item_id){
        const db = await this.initDB()
        return new Promise((resolve) => { db.transaction((tx) => { tx.executeSql('DELETE FROM Details WHERE id = ?', [item_id], 
            ([tx, results]) => { resolve(results) }) })
        })
    }

}