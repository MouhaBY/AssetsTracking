import { openDatabase } from 'react-native-sqlite-storage'


export default class Details{

    async initDB(){
        const db = await openDatabase({name: 'data.db'})
        return(db)
    }

    async createTableDetails(){
        const db = await this.initDB()
        return new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(
                    'CREATE TABLE IF NOT EXISTS Details (id INTEGER UNIQUE PRIMARY KEY AUTOINCREMENT, inventory_id INTEGER NOT NULL, area_id INTEGER NOT NULL, asset_id INTEGER NOT NULL, user_id INTEGER NOT NULL, date TEXT)', [], 
                (tx, results) => { 
                    resolve(results) 
                    console.log('table details created')
                })
            })
        })
    }

    async getDetailsInventaires(id_inventaire) {
        const  db = await this.initDB()
        return new Promise((resolve) => {
            const details = []
            db.transaction((tx) => {
                tx.executeSql('SELECT id, inventory_id, area_id, asset_id, user_id, date FROM Details WHERE inventory_id = ?', [id_inventaire],
                (tx, results) => {
                    var len = results.rows.length
                    if (len > 0) {
                        for (let i = 0; i < len; i++) {
                            let row = results.rows.item(i)
                            const { id, inventory_id, area_id, asset_id, user_id, date } = row
                            details.push({
                                id, 
                                inventory_id, 
                                area_id, 
                                asset_id,
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
                tx.executeSql('INSERT INTO Details (inventory_id, area_id, asset_id, user_id, date) VALUES (?, ?, ?, ?, ?)', 
                [item.inventory_id, item.area_id, item.asset_id, item.user_id, item.date],
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
