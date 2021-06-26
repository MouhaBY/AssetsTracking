import { openDatabase } from 'react-native-sqlite-storage'


export default class Users{

    async initDB(){
        const db = await openDatabase({name: 'data.db'})
        return(db)
    }
    
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
                tx.executeSql( 'SELECT id, username, password, contact, isAdmin FROM Users WHERE username = ?', [username],
                (tx, results) => {
                    var len = results.rows.length
                    if (len > 0) { resolve(results.rows.item(0)) }
                    else{ reject({}) }
                })
            })
        })
    }

    async searchUser_byId(id) {
        const  db = await this.initDB()
        return new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql( 'SELECT id, username, password, contact, isAdmin FROM Users WHERE id = ?', [id],
                (tx, results) => {
                    var len = results.rows.length
                    if (len > 0) { resolve(results.rows.item(0)) }
                    else{ reject({}) }
                })
            })
        })
    }

}
