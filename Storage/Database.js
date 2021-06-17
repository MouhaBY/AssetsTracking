import { openDatabase, SQLite } from 'react-native-sqlite-storage'


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
            const db = await this.initDB()
            const isCreated = await this.checkDatabase()
            if (!isCreated){
                console.log('Creating Database')
                await this.createTableUsers()
                await this.createTableConfiguration()
                await this.createTableInventaires()
                await this.createTableDetails()
                await this.createTableProducts()
                await this.createTableAreas()
                console.log('Database created')
            }
            return(true)
        }
        catch(err){ console.log('Problem creating Database') }
    }

    /****************************************** Products Handling ******************************************/

    async createTableProducts(){
        const  db = await this.initDB()
        return new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(
                'CREATE TABLE IF NOT EXISTS Products (id INTEGER UNIQUE PRIMARY KEY, code TEXT NOT NULL UNIQUE, name TEXT NOT NULL)', [], 
                (tx, results) => {
                    resolve(results)
                    console.log('Table Products created')
                })
            })
        })
    }

    async DeleteTableProducts(){
        const  db = await this.initDB()
        return new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(
                'DELETE FROM Products', [], 
                (tx, results) => {
                    resolve(results)
                    console.log('table products deleted')
                })
            })
        })
    }

    async insertIntoProducts(data_to_insert){
        console.log('insert products')
        const  db = await this.initDB()
        return new Promise((resolve, reject) => {
            var len = data_to_insert.length;
            for (let i = 0; i < len; i++) {
                db.transaction((tx) => {
                    tx.executeSql('INSERT INTO Products (id, code, name) VALUES (?, ?, ?)', 
                    [data_to_insert[i].id, data_to_insert[i].code, data_to_insert[i].name],)
                })
            }
            resolve(console.log('products inserted'))
        })
    }

    async getProducts() {
        const  db = await this.initDB()
        return new Promise((resolve) => {
            const products = []
            db.transaction((tx) => {
                tx.executeSql(
                'SELECT id, code, name FROM Products', [],
                (tx, results) => {
                    var len = results.rows.length
                    for (let i = 0; i < len; i++) {
                        let row = results.rows.item(i)
                        const { id, code, name } = row
                        products.push({
                            id,
                            code,
                            name
                          })
                    }
                    resolve(products)              
                })
            })
        })
    }
    
    async searchProduct(barcode) {
        const  db = await this.initDB()
        return new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql( 'SELECT * FROM Products WHERE code = ?', [barcode],
                (tx, results) => {
                    var len = results.rows.length
                    if (len > 0) { resolve(results.rows.item(0)) }
                    else{ reject('Product unknown') }
                })
            })
        })
    }

    /****************************************** Areas Handling ******************************************/

    async createTableAreas(){
        const  db = await this.initDB()
        return new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(
                'CREATE TABLE IF NOT EXISTS Areas (id INTEGER UNIQUE PRIMARY KEY, code TEXT NOT NULL UNIQUE, name TEXT NOT NULL)', [], 
                (tx, results) => { 
                    resolve(results)
                    console.log('table areas created')
                })
            })
        })
    }

    async DeleteTableAreas(){
        const  db = await this.initDB()
        return new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(
                'DELETE FROM Areas', [], 
                (tx, results) => {
                    resolve(results)
                    console.log('table areas deleted')
                })
            })
        })
    }

    async insertIntoAreas(data_to_insert){
        console.log('insert areas')
        const  db = await this.initDB()
        return new Promise((resolve, reject) => {
            var len = data_to_insert.length;
            for (let i = 0; i < len; i++) {
                db.transaction((tx) => {
                    tx.executeSql('INSERT INTO Areas (id, code, name) VALUES (?, ?, ?)', 
                    [data_to_insert[i].id, data_to_insert[i].code, data_to_insert[i].name],)
                })
            }
            resolve(console.log('Areas inserted'))
        })
    }

    async getAreas() {
        const  db = await this.initDB()
        return new Promise((resolve) => {
            const areas = []
            db.transaction((tx) => {
                tx.executeSql(
                'SELECT id, code, name FROM Areas', [],
                (tx, results) => {
                    var len = results.rows.length
                    for (let i = 0; i < len; i++) {
                        let row = results.rows.item(i)
                        const { id, code, name } = row
                        areas.push({
                            id,
                            code,
                            name
                          })
                    }   
                    resolve(areas)              
                })
            })
        })
    }

    async searchArea(location) {
        const  db = await this.initDB()
        return new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(
                'SELECT * FROM Areas WHERE code = ?', [location],
                (tx, results) => {
                    var len = results.rows.length
                    if (len > 0) { resolve(results.rows.item(0)) }
                    else{ reject('Location unknown') }
                })
            })
        })
    }

    /****************************************** Users Handling ******************************************/

    async createTableUsers(){
        const  db = await this.initDB()
        return new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(
                'CREATE TABLE IF NOT EXISTS Users (id INTEGER UNIQUE PRIMARY KEY, username TEXT NOT NULL UNIQUE, password TEXT NOT NULL UNIQUE, contact TEXT NOT NULL, isAdmin INTEGER NOT NULL DEFAULT 0)', [], 
                (tx, results) => { 
                    resolve(results)
                    console.log('table users created')
                })
            })
        })
    }

    async DeleteTableUsers(){
        const  db = await this.initDB()
        return new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(
                'DELETE FROM Users', [], 
                (tx, results) => {
                    resolve(results)
                    console.log('table Users deleted')
                })
            })
        })
    }

    async insertIntoUsers(data_to_insert){
        console.log('insert users')
        const  db = await this.initDB()
        return new Promise((resolve, reject) => {
            var len = data_to_insert.length;
            for (let i = 0; i < len; i++) {
                db.transaction((tx) => {
                    tx.executeSql('INSERT INTO Users (id, username, password, contact, isAdmin) VALUES (?, ?, ?, ?, ?)', 
                    [data_to_insert[i].id, data_to_insert[i].username, data_to_insert[i].password, data_to_insert[i].contact, data_to_insert[i].isAdmin],)
                })
            }
            resolve(console.log('users inserted'))
        })
    }

    async searchUser(username) {
        const  db = await this.initDB()
        return new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql( 'SELECT * FROM Users WHERE username = ?', [username],
                (tx, results) => {
                    var len = results.rows.length
                    if (len > 0) { resolve(results.rows.item(0)) }
                    else{ reject({}) }
                })
            })
        })
    }

    /****************************************** Configuration Handling ******************************************/

    async createTableConfiguration(){
        const db = await this.initDB()
        return new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(
                'CREATE TABLE IF NOT EXISTS Configuration (key TEXT UNIQUE PRIMARY KEY, state TEXT NOT NULL DEFAULT 0)', [], 
                (tx, results) => {
                    resolve(results) 
                    console.log('table configuration created')
                })
            })
        })
    }

    async DeleteTableConfigurations(){
        const db = await this.initDB()
        return new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(
                'DELETE FROM Configuration', [], 
                (tx, results) => {
                    resolve(results)
                    console.log('table Configuration deleted')
                })
            })
        })
    }

    async insertIntoConfigurations(data_to_insert){
        console.log('insert Configuration')
        const  db = await this.initDB()
        return new Promise((resolve, reject) => {
            var len = data_to_insert.length;
            for (let i = 0; i < len; i++) {
                db.transaction((tx) => {
                    tx.executeSql('INSERT INTO Configuration (key, state) VALUES (?, ?)', 
                    [data_to_insert[i].key, data_to_insert[i].state],)
                })
            }
            resolve(console.log('configuration inserted'))
        })
    }

    async getConfiguration(configuration_key) {
        const  db = await this.initDB()
        return new Promise((resolve) => {
            db.transaction((tx) => {
                tx.executeSql( 'SELECT state FROM Configuration WHERE key = ?', [configuration_key],
                (tx, results) => {
                    var len = results.rows.length
                    if (len > 0) { 
                        resolve(results.rows.item(0).state)
                        console.log('get configuration ' + configuration_key)
                    }
                    else{ reject('configuration introuvable') } 
                })
            })
        })
    }

    async updateConfiguration(configuration_item){
        const db = await this.initDB()
        return new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql( 'UPDATE Configuration SET state = ? WHERE key = ? ', configuration_item,
                (tx, results) => {
                    resolve(results) 
                    console.log('configuration updated')
                })
            })
        })
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