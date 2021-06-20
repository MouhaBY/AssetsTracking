import { openDatabase } from 'react-native-sqlite-storage'


export default class Inventories{

    async initDB(){
        const db = await openDatabase({name: 'data.db'})
        return(db)
    }
    
    async createTableInventaires(){
        const  db = await this.initDB()
        return new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(
                'CREATE TABLE IF NOT EXISTS Inventories (id INTEGER UNIQUE PRIMARY KEY, name TEXT NOT NULL, date TEXT NOT NULL)', [], 
                (tx, results) => {
                    resolve(results) 
                    console.log('table inventaires created')
                })
            })
        })
    }

    async DeleteTableInventories(){
        const  db = await this.initDB()
        return new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(
                'DELETE FROM Inventories', [], 
                (tx, results) => {
                    resolve(results)
                    console.log('table Inventaires deleted')
                })
            })
        })
    }

    async insertInventaire(inventaire){
        const db = await this.initDB()
        return new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql( 'INSERT INTO Inventories (id, name, date) VALUES (?, ?, ?)', [inventaire.name, inventaire.date],
                (tx, results) => { resolve(results) })
            })
        })
    }

    async insertIntoInventories(data_to_insert){
        console.log('insert inventaires')
        const  db = await this.initDB()
        return new Promise((resolve, reject) => {
            var len = data_to_insert.length;
            for (let i = 0; i < len; i++) {
                db.transaction((tx) => {
                    tx.executeSql('INSERT INTO Inventories (id, name, date) VALUES (?, ?, ?)', 
                    [data_to_insert[i].id, data_to_insert[i].name, data_to_insert[i].date],)
                })
            }
            resolve(console.log('inventaires inserted'))
        })
    }

    async getInventaires() {
        const  db = await this.initDB()
        return new Promise((resolve) => {
            const inventaires = []
            db.transaction((tx) => {
                tx.executeSql('SELECT id, name, date FROM Inventories', [],
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

}
